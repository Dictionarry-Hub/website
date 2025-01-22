// utils/markdown.ts
import { marked } from "marked";
import type { Tokens, Renderer } from "marked";
import Prism from "prismjs";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markdown";

import { createUrlId } from "./parseMarkdownHeaders";

export function parseMarkdown(content: string, entryId: string) {
  if (!content) return "";

  const renderer: Partial<Renderer> = {
    heading({ text, depth }: Tokens.Heading) {
      const id = `${entryId}-${createUrlId(text)}`;

      if (depth === 1) {
        return `<h1 id="${id}" class="text-3xl font-bold tracking-tight">${text}</h1>`;
      }
      if (depth === 2) {
        return `<h2 id="${id}" class="text-2xl font-semibold tracking-tight mt-8 mb-4">${text}</h2>`;
      }
      if (depth === 3) {
        return `<h3 id="${id}" class="text-xl font-medium tracking-tight mt-6 mb-3">${text}</h3>`;
      }
      return `<h${depth} id="${id}">${text}</h${depth}>`;
    },

    codespan({ text }: Tokens.Codespan) {
      return `<code class="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm font-mono text-gray-900 dark:text-gray-100">${text}</code>`;
    },

    code({ text, lang }: Tokens.Code) {
      if (lang && Prism.languages[lang]) {
        const highlighted = Prism.highlight(text, Prism.languages[lang], lang);
        return `<pre class="!mt-4 !mb-4 rounded-lg !bg-[#eceff4] dark:!bg-[#2e3440] !border !border-gray-200 dark:!border-gray-700 overflow-x-auto"><code class="language-${lang} font-mono">${highlighted}</code></pre>`;
      }

      return `<pre class="!mt-4 !mb-4 rounded-lg !bg-[#eceff4] dark:!bg-[#2e3440] !border !border-gray-200 dark:!border-gray-700 overflow-x-auto"><code class="font-mono">${text}</code></pre>`;
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
