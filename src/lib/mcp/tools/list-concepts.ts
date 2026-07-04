import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { CONCEPTS } from "@/lib/mock-data";

export default defineTool({
  name: "list_concepts",
  title: "List concepts",
  description:
    "List all concepts (mental models / cognitive biases) available in 事出有喻, optionally filtered by domain.",
  inputSchema: {
    domain: z
      .string()
      .optional()
      .describe("Optional domain filter, e.g. '行为经济学', '社会心理学', '思维模型'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ domain }) => {
    const items = Object.values(CONCEPTS)
      .filter((c) => !domain || c.domain === domain)
      .map((c) => ({
        id: c.id,
        name: c.name,
        domain: c.domain,
        one_liner: c.oneLiner,
        readers: c.readers,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { concepts: items },
    };
  },
});
