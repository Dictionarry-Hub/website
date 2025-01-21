// src/app/hooks/useMarkdown.ts
"use client";
import { marked } from "marked";

export function useMarkdown() {
  const parseMarkdown = (content: string) => {
    return marked(content);
  };

  return { parseMarkdown };
}
