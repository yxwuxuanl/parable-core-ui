import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { STORIES } from "@/lib/mock-data";

export default defineTool({
  name: "list_stories",
  title: "List stories",
  description: "List all parable-style stories, optionally filtered by domain.",
  inputSchema: {
    domain: z.string().optional().describe("Optional domain filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ domain }) => {
    const items = STORIES.filter((s) => !domain || s.domain === domain).map((s) => ({
      id: s.id,
      title: s.title,
      lede: s.lede,
      domain: s.domain,
      minutes: s.minutes,
      concept_id: s.conceptId,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { stories: items },
    };
  },
});
