// src/app/wiki/page.tsx
import { getContent } from "@api/getData";
import Link from "next/link";
import { Clock, User } from "lucide-react";
import { format } from "date-fns";

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
    return format(new Date(dateStr), "MMM dd, yyyy");
  } catch {
    return dateStr;
  }
};

export default async function WikiPage() {
  const wikiEntries = (await getContent("wiki")) as WikiEntry[] | null;
  const filteredEntries =
    wikiEntries?.filter((entry) => entry._id !== "home") || [];

  return (
    <div className="container mx-auto px-4 ">
      <header className="mb-4">
        <h1 className="text-2xl font-bold mb-4">Dictionarry Wiki</h1>

        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Comprehensive documentation for media automation concepts and
          configurations
        </p>
      </header>

      <div className="grid gap-4">
        {filteredEntries.map((entry) => (
          <Link
            key={entry._id}
            href={`/wiki/${entry.slug || entry._id}`}
            className="block group"
          >
            <article
              className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/90 dark:to-gray-900/80  rounded-lg border border-gray-200 dark:border-gray-700 p-6 
transition-all duration-200 ease-in-out
group-hover:border-blue-500 dark:group-hover:border-blue-400 
group-hover:shadow-md"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
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

                  <div className="ml-auto flex items-center gap-3">
                    {entry.created && (
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 
                  rounded-full border border-gray-200 dark:border-gray-700"
                      >
                        <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Created {formatDate(entry.created)}
                        </span>
                      </div>
                    )}

                    {entry.author && (
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 
                  rounded-full border border-blue-100 dark:border-blue-800/50"
                      >
                        <User className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                        <span className="text-sm text-blue-600 dark:text-blue-300">
                          {entry.author}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300">
                  {entry.blurb || "No description provided"}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
