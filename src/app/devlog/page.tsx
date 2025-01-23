// src/app/devlog/page.tsx

import { getContent } from "@api/getData";
import { parseMarkdownHeaders, createUrlId } from "@utils/parseMarkdownHeaders";
import { TableOfContents } from "@components/TableOfContents";
import { ContentMetadata } from "@components/ContentMetadata";
import CreatedDateBadge from "@components/CreatedDateBadge";
import MarkdownRenderer from "@components/MarkdownRenderer";
import PinnedExplanation, {
  getPinnedHeader,
} from "./components/PinnedExplanation";

interface DevLogEntry {
  _id: string;
  title: string;
  content: string;
  author: string;
  last_modified: string;
  created: string;
}

function formatCreatedDate(dateStr: string) {
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) {
    return dateStr;
  }
  return parsed.toLocaleString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function DevLogPage() {
  const devlogs = (await getContent("dev_logs")) as DevLogEntry[] | null;

  if (!devlogs) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Unable to load development logs
          </h2>
          <p className="text-red-600 dark:text-red-300">
            Please try refreshing the page. If the problem persists, the content
            may be temporarily unavailable.
          </p>
        </div>
      </div>
    );
  }

  // Sort dev logs by newest first
  devlogs.sort((a, b) => {
    const dateA = new Date(a.created).getTime();
    const dateB = new Date(b.created).getTime();
    return dateB - dateA;
  });

  // Build combined table of contents, starting with pinned explanation
  const allHeaders = [
    getPinnedHeader(),
    ...devlogs.flatMap((entry) => {
      const entryId = createUrlId(entry.title);

      // Main "heading" for each devlog:
      const mainHeader = {
        id: `entry-${entryId}`,
        text: entry.title,
        level: 1,
        date: formatCreatedDate(entry.created),
      };

      // Sub-headers from the content
      const contentHeaders = parseMarkdownHeaders(entry.content).map(
        (header) => ({
          ...header,
          id: `${entryId}-${header.id}`,
          level: header.level + 1,
        })
      );

      return [mainHeader, ...contentHeaders];
    }),
  ];

  return (
    <div className="container mx-auto">
      <div className="pb-6">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-9">
            <div className="space-y-12">
              {/* Pinned Explanation Component */}
              <PinnedExplanation />

              {/* Regular DevLog Articles */}
              {devlogs.map((entry) => {
                const entryId = createUrlId(entry.title);
                return (
                  <article
                    key={entry._id}
                    id={`entry-${entryId}`}
                    className="relative prose prose-lg dark:prose-invert max-w-none rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <header className="bg-gray-100 dark:bg-gray-800/80 px-10 py-6">
                      <div className="flex items-baseline justify-between">
                        <h1 className="text-3xl font-bold tracking-tight m-0">
                          {entry.title}
                        </h1>
                        <CreatedDateBadge date={entry.created} />
                      </div>
                    </header>

                    <div className="p-10 pt-0 bg-white dark:bg-gray-900">
                      <MarkdownRenderer
                        content={entry.content}
                        entryId={entryId}
                      />
                      <ContentMetadata
                        author={entry.author}
                        last_modified={entry.last_modified}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="hidden lg:block col-span-12 lg:col-span-3">
            <div className="fixed top-24 w-[350px]">
              <TableOfContents headers={allHeaders} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
