// utils/markdown.ts
import { marked } from "marked";
import type { Tokens } from "marked";

interface HeadingToken extends Tokens.Heading {
  text: string;
  depth: number;
}

export function parseMarkdown(content: string) {
  const renderer = {
    heading(tokens: HeadingToken) {
      const text = tokens.text;
      const level = tokens.depth;
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      return `<h${level} id="${id}">${text}</h${level}>`;
    },
  };

  marked.use({ renderer });
  return marked(content);
}
