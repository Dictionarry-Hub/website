// components/ContentMetadata.tsx
'use client';

import { Clock, User } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface ContentMetadataProps {
  author: string;
  last_modified: string | null;
}

export function ContentMetadata({ author, last_modified }: ContentMetadataProps) {
  const isMobile = useMediaQuery('(max-width: 1200px)');

  const formattedDate = last_modified
    ? new Date(last_modified).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown';

  const mobileDate = last_modified
    ? new Date(last_modified).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
    : 'Unknown';

  return (
    <div className="mt-16 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
          <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {isMobile ? mobileDate : `Last updated ${formattedDate}`}
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full">
          <User className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          <span className="text-sm text-blue-600 dark:text-blue-300">{isMobile ? author.split(' ')[0] : author}</span>
        </div>
      </div>
    </div>
  );
}
