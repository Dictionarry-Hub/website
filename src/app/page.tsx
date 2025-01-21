// src/app/page.tsx
import { getHomeContent } from "@api/getData";
import { parseMarkdown } from "@utils/markdown";
import { parseMarkdownHeaders } from "@utils/parseMarkdownHeaders";
import { TableOfContents } from "@components/TableOfContents";
import { ContentMetadata } from "@components/ContentMetadata";

export default async function Home() {
  const homeContent = await getHomeContent();
  const headers = homeContent ? parseMarkdownHeaders(homeContent.content) : [];

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-12 gap-8 py-8">
        <div className="col-span-12 lg:col-span-9">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {homeContent ? (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdown(homeContent.content),
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
          <div className="lg:sticky lg:top-20">
            <TableOfContents headers={headers} />
          </div>
        </div>
      </div>
    </div>
  );
}
