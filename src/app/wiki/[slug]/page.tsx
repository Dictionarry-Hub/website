// src/app/wiki/[slug]/page.tsx
import { getContent } from "@api/getData";
import { parseMarkdownHeaders, createUrlId } from "@utils/parseMarkdownHeaders";
import { TableOfContents } from "@components/TableOfContents";
import { ContentMetadata } from "@components/ContentMetadata";
import MarkdownRenderer from "@components/MarkdownRenderer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface WikiEntry {
  _id: string;
  title: string;
  content: string;
  author: string;
  last_modified: string;
  slug?: string;
}

export default async function WikiArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const wikiEntries = (await getContent("wiki")) as WikiEntry[] | null;
  const article = wikiEntries?.find(
    (entry) => entry.slug === params.slug || entry._id === params.slug
  );
  if (!article) {
    notFound();
  }

  const contentId = createUrlId(article.title);
  const headers = [
    // Main article header
    {
      id: `entry-${contentId}`,
      text: article.title,
      level: 1,
    },
    // Content headers - match MarkdownRenderer.tsx ID pattern
    ...parseMarkdownHeaders(article.content).map((header) => ({
      ...header,
      id: `${contentId}-${createUrlId(header.text)}`, // Match how MarkdownRenderer creates IDs
      level: header.level + 1,
    })),
  ];

  return (
    <div className="container mx-auto">
      <div className="pb-6">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-9">
            <article
              id={`entry-${contentId}`}
              className="relative prose prose-lg dark:prose-invert max-w-none rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <header className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/90 dark:to-gray-900/80 px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-semibold tracking-tight m-0 text-gray-800 dark:text-gray-100">
                    {article.title}
                  </h1>
                  <Link
                    href="/wiki"
                    className="group inline-flex items-center gap-2 px-3 py-1.5
                             text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                             transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Back to Wiki</span>
                  </Link>
                </div>
              </header>

              <div className="p-6 pt-0 bg-white dark:bg-gray-900">
                <MarkdownRenderer
                  content={article.content}
                  entryId={contentId}
                />
                <ContentMetadata
                  author={article.author}
                  last_modified={article.last_modified}
                />
              </div>
            </article>
          </div>

          <aside className="hidden lg:block col-span-12 lg:col-span-3">
            <div className="fixed top-24 w-[350px]">
              <TableOfContents headers={headers} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const wikiEntries = (await getContent("wiki")) as WikiEntry[] | null;
  return (
    wikiEntries
      ?.filter((entry) => entry._id !== "home")
      .map((entry) => ({
        slug: entry.slug || entry._id,
      })) || []
  );
}
