// utils/markdown.ts
import { marked } from "marked";
import type { Tokens } from "marked";

interface HeadingToken extends Tokens.Heading {
  text: string;
  depth: number;
}

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

  hr() {
    return "<hr>";
  },
};

marked.use({ renderer });

export function parseMarkdown(content: string) {
  if (!content) return "";
  try {
    return marked(content);
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return "";
  }
}
