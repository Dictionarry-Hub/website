// components/MobileProfileNavigation.tsx
'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Profile {
  _id: string;
  name: string;
  tags?: string[];
}

interface MobileProfileNavigationProps {
  profiles: Profile[];
  selectedId?: string;
}

function createUrlSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function MobileProfileNavigation({ profiles, selectedId }: MobileProfileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Group profiles by resolution
  const categorizedProfiles = profiles.reduce(
    (acc, profile) => {
      const match = profile.name.match(/(1080p|2160p|SD)/i);
      const category = match ? match[1] : 'Other';

      if (!acc[category]) {
        acc[category] = {
          label: `${category} Profiles`,
          profiles: [],
        };
      }
      acc[category].profiles.push(profile);
      return acc;
    },
    {} as Record<string, { label: string; profiles: Profile[] }>
  );

  // Sort categories
  const sortOrder = ['2160p', '1080p', 'SD', 'Other'];
  const sortedCategories = Object.entries(categorizedProfiles).sort(
    ([a], [b]) => sortOrder.indexOf(a) - sortOrder.indexOf(b)
  );

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
          <SheetTitle className="text-gray-900 dark:text-gray-100">Profiles</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto h-full">
          <div className="py-2">
            {sortedCategories.map(([category, { label, profiles }]) => (
              <div key={category} className="px-2 mb-4">
                <div className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
                </div>
                <div className="space-y-1 mt-1">
                  {profiles.map((profile) => {
                    const urlSlug = createUrlSlug(profile.name);
                    const isActive = pathname === `/profiles/${urlSlug}`;

                    return (
                      <Link
                        key={profile._id}
                        href={`/profiles/${urlSlug}`}
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
                        <ChevronRight
                          className={`w-4 h-4 mr-2 transition-opacity duration-200 
                          ${isActive ? 'opacity-100' : 'opacity-0'}`}
                        />
                        {profile.name}
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
