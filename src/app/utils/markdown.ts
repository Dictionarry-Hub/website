// utils/markdown.ts
import { marked } from "marked";
import type { Tokens } from "marked";
import { createUrlId } from "./parseMarkdownHeaders";

interface HeadingToken extends Tokens.Heading {
  text: string;
  depth: number;
}

export function parseMarkdown(content: string, entryId: string) {
  if (!content) return "";

  const renderer = {
    heading(tokens: HeadingToken) {
      const text = tokens.text;
      const level = tokens.depth;
      const id = `${entryId}-${createUrlId(text)}`;

      if (level === 1) {
        return `<h1 id="${id}" class="text-3xl font-bold tracking-tight">${text}</h1>`;
      }
      if (level === 2) {
        return `<h2 id="${id}" class="text-2xl font-semibold tracking-tight mt-8 mb-4">${text}</h2>`;
      }
      if (level === 3) {
        return `<h3 id="${id}" class="text-xl font-medium tracking-tight mt-6 mb-3">${text}</h3>`;
      }

      return `<h${level} id="${id}">${text}</h${level}>`;
    },
    hr() {
      return "<hr>";
    },
  };

  marked.use({ renderer });

  try {
    return marked(content);
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return "";
  }
}
