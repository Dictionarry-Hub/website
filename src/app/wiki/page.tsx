// src/app/wiki/page.tsx
import { getContent } from '@api/getData';
import Link from 'next/link';
import { Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wiki',
};

interface WikiEntry {
  _id: string;
  title: string;
  slug?: string;
  content: string;
  blurb?: string;
  author: string;
  created: string;
  last_modified: string;
  tags?: string[];
}

const formatDate = (dateStr: string) => {
  try {
    return format(new Date(dateStr), 'MMM dd, yyyy');
  } catch {
    return dateStr;
  }
};

export default async function WikiPage() {
  const wikiEntries = (await getContent('wiki')) as WikiEntry[] | null;
  const filteredEntries = wikiEntries?.filter((entry) => entry._id !== 'home') || [];

  // Sort entries alphabetically by title
  const sortedEntries = [...filteredEntries].sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));

  return (
    <div className="container mx-auto px-0">
      <article
        id="pinned-explanation"
        className="relative prose prose-lg dark:prose-invert max-w-none rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <header className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/90 dark:to-gray-900/80 px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight m-0 text-gray-800 dark:text-gray-100">Wiki</h1>
          </div>
        </header>

        <div className="p-6 bg-white dark:bg-gray-900">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">
            Welcome to the Dictionarry Wiki - your comprehensive resource for media automation. Here you'll find various
            articles on our release group metrics, general audiovideo information, best radarr/sonarr practices and
            more.
          </p>
        </div>
      </article>

      <div className="grid gap-4 mt-5">
        {sortedEntries.map((entry) => (
          <Link key={entry._id} href={`/wiki/${entry.slug || entry._id}`} className="block group">
            <article className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-col gap-4">
                {/* Row 1: Header and Date */}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {entry.title}
                  </h2>

                  {entry.created && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 rounded-full border border-gray-200 dark:border-gray-700 whitespace-nowrap">
                      <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Created {formatDate(entry.created)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Row 2: Tags */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {entry.tags &&
                      entry.tags.length > 0 &&
                      entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900/30 
                              text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Row 3: Blurb and Author */}
                <div className="flex justify-between items-start">
                  {entry.blurb && (
                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">{entry.blurb}</p>
                  )}

                  {entry.author && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-100 dark:border-blue-800/50 whitespace-nowrap ml-4">
                      <User className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                      <span className="text-sm text-blue-600 dark:text-blue-300">{entry.author}</span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
