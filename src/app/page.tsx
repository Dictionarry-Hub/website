// src/app/page.tsx (Home page)
import { getHomeContent } from "@api/getData";
import { parseMarkdownHeaders } from "@utils/parseMarkdownHeaders";
import { TableOfContents } from "@components/TableOfContents";
import { GettingStarted } from "@components/GettingStarted";
import { ContentMetadata } from "@components/ContentMetadata";
import MarkdownRenderer from "@components/MarkdownRenderer";

export default async function Home() {
  const homeContent = await getHomeContent();
  const contentId = "home-content";

  const headers = homeContent ? parseMarkdownHeaders(homeContent.content) : [];
  const updatedHeaders = headers.map((header) => ({
    ...header,
    id: `${contentId}-${header.id}`,
  }));

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <main className="flex-1">
          <article className="prose prose-lg dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-800/80 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            {homeContent ? (
              <>
                {/* Render the Markdown as React components */}
                <MarkdownRenderer
                  content={homeContent.content}
                  entryId={contentId}
                />
                <ContentMetadata
                  author={homeContent.author}
                  last_modified={homeContent.last_modified}
                />
              </>
            ) : (
              <p>Welcome to Dictionarry. Home page content coming soon.</p>
            )}
          </article>
        </main>

        <aside className="hidden lg:block w-[300px]">
          <div className="fixed top-24 w-[300px]">
            <TableOfContents headers={updatedHeaders} />
            <div className="mt-6">
              <GettingStarted />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
