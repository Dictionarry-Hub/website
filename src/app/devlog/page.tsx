// src/app/devlog/page.tsx
import { getContent } from '@api/getData';
import Link from 'next/link';
import { Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { Metadata } from 'next';
import PinnedExplanation from './components/PinnedExplanation';

export const metadata: Metadata = {
  title: 'DevLog',
};

interface DevLogEntry {
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

export default async function DevLogPage() {
  const devLogEntries = (await getContent('dev_logs')) as DevLogEntry[] | null;

  if (!devLogEntries) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Unable to load development logs</h2>
          <p className="text-red-600 dark:text-red-300">
            Please try refreshing the page. If the problem persists, the content may be temporarily unavailable.
          </p>
        </div>
      </div>
    );
  }

  const sortedDevLogs = devLogEntries.sort((a, b) => {
    const dateA = new Date(a.created).getTime();
    const dateB = new Date(b.created).getTime();
    return dateB - dateA;
  });

  return (
    <div className="container mx-auto px-0">
      <PinnedExplanation />

      <div className="grid gap-4 mt-5">
        {sortedDevLogs.map((entry) => (
          <Link key={entry._id} href={`/devlog/${entry.slug || entry._id}`} className="block group">
            <article className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/90 dark:to-gray-900/80 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {entry.title}
                    </h2>

                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900/30 
                                text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap sm:flex-col gap-3 sm:items-end">
                    {entry.created && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 rounded-full border border-gray-200 dark:border-gray-700 whitespace-nowrap">
                        <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Created {formatDate(entry.created)}
                        </span>
                      </div>
                    )}
                    {entry.author && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-100 dark:border-blue-800/50 whitespace-nowrap">
                        <User className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                        <span className="text-sm text-blue-600 dark:text-blue-300">{entry.author}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
