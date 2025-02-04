// src/app/page.tsx
import { getHomeContent } from '@api/getData';
import { parseMarkdownHeaders } from '@utils/parseMarkdownHeaders';
import { ContentMetadata } from '@components/ContentMetadata';
import MarkdownRenderer from '@components/MarkdownRenderer';
import { HomeLayout } from '@components/HomeLayout';

export default async function Home() {
  const homeContent = await getHomeContent();
  const contentId = 'home-content';
  const headers = homeContent ? parseMarkdownHeaders(homeContent.content) : [];
  const updatedHeaders = headers.map((header) => ({
    ...header,
    id: `${contentId}-${header.id}`,
  }));

  return (
    <HomeLayout headers={updatedHeaders}>
      <article className="prose prose-lg dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8">
        {homeContent ? (
          <>
            <MarkdownRenderer content={homeContent.content} entryId={contentId} />
            <ContentMetadata author={homeContent.author} last_modified={homeContent.last_modified} />
          </>
        ) : (
          <p>Welcome to Dictionarry. Home page content coming soon.</p>
        )}
      </article>
    </HomeLayout>
  );
}
