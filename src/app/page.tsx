// src/app/page.tsx
import { getHomeContent } from "@api/getData";
import { parseMarkdown } from "@utils/markdown";
import { parseMarkdownHeaders } from "@utils/parseMarkdownHeaders";
import { TableOfContents } from "@components/TableOfContents";

export default async function Home() {
  const homeContent = await getHomeContent();
  const headers = homeContent ? parseMarkdownHeaders(homeContent.content) : [];

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-12 gap-8 py-8">
        {/* Sidebar */}
        <div className="col-span-3">
          <TableOfContents headers={headers} />
        </div>

        {/* Main content */}
        <div className="col-span-9">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {homeContent ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: parseMarkdown(homeContent.content),
                }}
              />
            ) : (
              <p>Welcome to Dictionarry. Home page content coming soon.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
