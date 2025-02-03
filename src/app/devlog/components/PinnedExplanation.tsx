// src/app/devlog/components/PinnedExplanation.tsx

import { Pin } from 'lucide-react';
import MarkdownRenderer from '@components/MarkdownRenderer';

const PINNED_CONTENT = {
  _id: 'pinned-explanation',
  title: 'Development Log',
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
  id: 'pinned-explanation',
  text: PINNED_CONTENT.title,
  level: 1,
  date: 'Pinned',
});

export default function PinnedExplanation() {
  return (
    <article
      id="pinned-explanation"
      className="relative prose prose-lg dark:prose-invert max-w-none rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <header className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/90 dark:to-gray-900/80 px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight m-0 text-gray-800 dark:text-gray-100">
            {PINNED_CONTENT.title}
          </h1>
        </div>
      </header>

      <div className="p-6 py-0 bg-white dark:bg-gray-900">
        <MarkdownRenderer content={PINNED_CONTENT.content} entryId="pinned-explanation" />
      </div>
    </article>
  );
}
