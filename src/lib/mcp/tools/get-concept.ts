import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { CONCEPTS } from "@/lib/mock-data";

export default defineTool({
  name: "get_concept",
  title: "Get concept",
  description:
    "Get the full explanation of a concept by id, including definition, story-to-concept mapping, and example scenes.",
  inputSchema: {
    id: z.string().describe("Concept id, e.g. 'path-dependence', 'bandwagon', 'compound'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const concept = CONCEPTS[id];
    if (!concept) {
      return {
        content: [{ type: "text", text: `Unknown concept id: ${id}` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(concept, null, 2) }],
      structuredContent: { concept },
    };
  },
});
