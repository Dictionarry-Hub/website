// src/app/devlog/page.tsx
import { getContent } from "@api/getData";
import { parseMarkdownHeaders, createUrlId } from "@utils/parseMarkdownHeaders";
import { TableOfContents } from "@components/TableOfContents";
import { ContentMetadata } from "@components/ContentMetadata";
import CreatedDateBadge from "@components/CreatedDateBadge";
import { Coffee, Construction, Sparkles } from "lucide-react";
import MarkdownRenderer from "@components/MarkdownRenderer";

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

  if (devlogs.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center max-w-2xl mx-auto">
          <div className="flex justify-center gap-4 mb-6">
            <Coffee className="w-8 h-8 text-amber-600 dark:text-amber-400 animate-bounce" />
            <Construction
              className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <Sparkles
              className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🚧 Under Construction 🚧
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Our developers are frantically typing away, fueled by coffee and
            dreams of bug-free code. The development logs will appear here once
            they remember to document what they're doing!
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

  // Build combined table of contents
  const allHeaders = devlogs.flatMap((entry) => {
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
  });

  return (
    <div className="container mx-auto">
      <div className="pb-6">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-9">
            <div className="space-y-12">
              {devlogs.map((entry) => {
                const entryId = createUrlId(entry.title);

                return (
                  <article
                    key={entry._id}
                    id={`entry-${entryId}`}
                    className="relative prose prose-lg dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-800/80 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8"
                  >
                    <div className="flex items-baseline justify-between mb-4">
                      <h1 className="text-3xl font-bold tracking-tight m-0">
                        {entry.title}
                      </h1>
                      <CreatedDateBadge date={entry.created} />
                    </div>

                    {/* Use our new MarkdownRenderer instead of parseMarkdown */}
                    <MarkdownRenderer
                      content={entry.content}
                      entryId={entryId}
                    />

                    <ContentMetadata
                      author={entry.author}
                      last_modified={entry.last_modified}
                    />
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
