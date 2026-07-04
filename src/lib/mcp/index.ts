import { defineMcp } from "@lovable.dev/mcp-js";
import listConcepts from "./tools/list-concepts";
import getConcept from "./tools/get-concept";
import listStories from "./tools/list-stories";
import getStory from "./tools/get-story";

export default defineMcp({
  name: "shiyou-youyu-mcp",
  title: "事出有喻 MCP",
  version: "0.1.0",
  instructions:
    "Tools for 事出有喻 — a library of short parable-style stories that each illustrate a mental model or cognitive bias. Use `list_concepts` / `get_concept` to browse concepts, and `list_stories` / `get_story` to read the parables that illustrate them.",
  tools: [listConcepts, getConcept, listStories, getStory],
});
