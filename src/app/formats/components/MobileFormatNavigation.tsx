// src/app/formats/components/MobileFormatNavigation.tsx
'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { FORMAT_CATEGORIES } from '../constants/format_constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CustomFormat {
  _id: string;
  name: string;
  tags?: string[];
}

interface MobileFormatNavigationProps {
  formats: CustomFormat[];
  selectedId?: string;
}

function createUrlSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').trim();
}

export function MobileFormatNavigation({ formats, selectedId }: MobileFormatNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const categorizedFormats = FORMAT_CATEGORIES.map((category) => {
    const matchingFormats = formats.filter((format) => format.tags?.some((tag) => category.tags.includes(tag)));
    return {
      ...category,
      formats: matchingFormats,
    };
  }).filter((category) => category.formats.length > 0);

  const uncategorizedFormats = formats.filter(
    (format) => !format.tags?.some((tag) => FORMAT_CATEGORIES.some((category) => category.tags.includes(tag)))
  );

  if (uncategorizedFormats.length > 0) {
    categorizedFormats.push({
      id: 'other',
      label: 'Other Formats',
      tags: [],
      icon: null,
      formats: uncategorizedFormats,
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700">
          <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[350px] p-0 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
      >
        <SheetHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
          <SheetTitle className="text-gray-900 dark:text-gray-100">Formats</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto h-full">
          <div className="py-2">
            {categorizedFormats.map((category) => (
              <div key={category.id} className="px-2 mb-4">
                <div className="px-4 py-2 flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  {category.icon && category.accentColor && (
                    <div className={`p-1.5 rounded ${category.accentColor.bg} ${category.accentColor.darkBg}`}>
                      <category.icon className={`w-4 h-4 ${category.accentColor.light} ${category.accentColor.dark}`} />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{category.label}</span>
                </div>
                <div className="space-y-1 mt-1">
                  {category.formats.map((format) => {
                    const urlSlug = createUrlSlug(format.name);
                    const isActive = pathname === `/formats/${urlSlug}`;

                    return (
                      <Link
                        key={format._id}
                        href={`/formats/${urlSlug}`}
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex items-center px-4 py-2 text-sm rounded-lg
                          ${
                            isActive
                              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }
                        `}
                      >
                        {format.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
