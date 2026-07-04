import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getStory } from "@/lib/mock-data";

export default defineTool({
  name: "get_story",
  title: "Get story",
  description:
    "Get the full text of a parable story by id, together with the concept it illustrates.",
  inputSchema: {
    id: z.string().describe("Story id, e.g. 'two-paths', 'riverside', 'small-seed'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const story = getStory(id);
    if (!story) {
      return {
        content: [{ type: "text", text: `Unknown story id: ${id}` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(story, null, 2) }],
      structuredContent: { story },
    };
  },
});
