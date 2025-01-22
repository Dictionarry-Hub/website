// src/app/devlog/components/PinnedExplanation.tsx

import { Pin } from "lucide-react";
import MarkdownRenderer from "@components/MarkdownRenderer";

const PINNED_CONTENT = {
  _id: "pinned-explanation",
  title: "Development Log",
  content: `
Welcome to the development log. Here you'll find **informal updates from the Dictionary team** (mostly from santiagosayshey). Notes on what we're building, features in progress, and where we're heading next. Sometimes we'll put up polls to get your thoughts too.
`,
  created: new Date().toISOString(),
};

export interface PinnedExplanationHeader {
  id: string;
  text: string;
  level: number;
  date: string;
}

export const getPinnedHeader = (): PinnedExplanationHeader => ({
  id: "pinned-explanation",
  text: PINNED_CONTENT.title,
  level: 1,
  date: "Pinned",
});

export default function PinnedExplanation() {
  return (
    <article
      id="pinned-explanation"
      className="relative prose prose-lg dark:prose-invert max-w-none rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <header className="bg-gray-100 dark:bg-gray-800/80 px-10 py-6">
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-2">
            <Pin className="w-7 h-7 text-blue-600 dark:text-blue-400 mt-1" />
            <h1 className="text-3xl font-bold tracking-tight m-0">
              {PINNED_CONTENT.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="p-10 py-0 bg-white dark:bg-gray-900">
        <MarkdownRenderer
          content={PINNED_CONTENT.content}
          entryId="pinned-explanation"
        />
      </div>
    </article>
  );
}
