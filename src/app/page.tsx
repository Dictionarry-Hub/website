// src/app/page.tsx
import { getHomeContent } from "@api/getData";
import { parseMarkdown } from "@utils/markdown";
import { parseMarkdownHeaders, createUrlId } from "@utils/parseMarkdownHeaders";
import { TableOfContents } from "@components/TableOfContents";
import { GettingStarted } from "@components/GettingStarted";
import { ContentMetadata } from "@components/ContentMetadata";

export default async function Home() {
  const homeContent = await getHomeContent();
  const headers = homeContent ? parseMarkdownHeaders(homeContent.content) : [];

  // Create a unique ID for the home page content
  const contentId = "home-content";

  // Update headers with the contentId
  const updatedHeaders = headers.map((header) => ({
    ...header,
    id: `${contentId}-${header.id}`,
  }));

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-12 gap-8 py-8">
        <div className="col-span-12 lg:col-span-9">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {homeContent ? (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdown(homeContent.content, contentId),
                  }}
                />
                <ContentMetadata
                  author={homeContent.author}
                  last_modified={homeContent.last_modified}
                />
              </>
            ) : (
              <p>Welcome to Dictionarry. Home page content coming soon.</p>
            )}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <div className="lg:sticky lg:top-20 space-y-6">
            <TableOfContents headers={updatedHeaders} />
            <GettingStarted />
          </div>
        </div>
      </div>
    </div>
  );
}
