'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Settings2 } from 'lucide-react';
import { FORMAT_CATEGORIES } from '@/app/formats/constants/format_constants';
import { getContent } from '@api/getData';

interface CustomFormat {
  name: string;
  score: number;
}

interface FormatInfo {
  _id: string;
  name: string;
  description?: string;
  tags?: string[];
  conditions: Array<{
    name: string;
    type: string;
  }>;
}

interface ProfileFormatsDisplayProps {
  customFormats: CustomFormat[];
}

const createUrlSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-').trim();
};

export function ProfileFormatsDisplay({ customFormats }: ProfileFormatsDisplayProps) {
  const [formats, setFormats] = useState<FormatInfo[] | null>(null);
  const activeCustomFormats = customFormats.filter((format) => format.score !== 0).length;

  // Fetch format information
  useEffect(() => {
    const fetchFormats = async () => {
      const formatData = (await getContent('custom_formats')) as FormatInfo[] | null;
      setFormats(formatData);
    };
    fetchFormats();
  }, []);

  // Organize formats by category
  const categorizedFormats = React.useMemo(() => {
    if (!formats) return [];

    // Create a map of format name to score for quick lookup
    const scoreMap = new Map(customFormats.map((f) => [f.name, f.score]));

    // Create a map of format name to full format info
    const formatMap = new Map(formats.map((f) => [f.name, f]));

    return FORMAT_CATEGORIES.map((category) => {
      const categoryFormats = customFormats
        .filter((cf) => {
          const format = formatMap.get(cf.name);
          return format?.tags?.some((tag) => category.tags.includes(tag));
        })
        .map((cf) => ({
          ...formatMap.get(cf.name),
          score: scoreMap.get(cf.name) || 0,
        }))
        .filter((f) => f && f.score !== 0)
        .sort((a, b) => b.score - a.score);

      return {
        ...category,
        formats: categoryFormats,
      };
    }).filter((category) => category.formats.length > 0);
  }, [formats, customFormats]);

  if (!formats) {
    return <div>Loading format information...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Settings2 className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Custom Formats ({activeCustomFormats} active)</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        {categorizedFormats.map((category) => (
          <div key={category.id} className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              {category.icon && (
                <div className={`p-2 ${category.accentColor?.bg} ${category.accentColor?.darkBg} rounded-lg`}>
                  <category.icon className={`w-4 h-4 ${category.accentColor?.light} ${category.accentColor?.dark}`} />
                </div>
              )}
              <h3 className="font-medium">{category.label}</h3>
            </div>

            <div className="space-y-2">
              {category.formats.map((format: any) => (
                <Link
                  key={format.name}
                  href={`/formats/${createUrlSlug(format.name)}`}
                  className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-900/50 rounded hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors"
                >
                  <span className="text-sm font-medium">{format.name}</span>
                  <span
                    className={`text-sm font-medium ${
                      format.score > 0 ? 'text-green-500' : format.score < 0 ? 'text-red-500' : 'text-gray-500'
                    }`}
                  >
                    {format.score > 0 ? `+${format.score}` : format.score}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
