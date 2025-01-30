'use client';

import { useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, ChevronUp, X } from 'lucide-react';

interface Profile {
  _id: string;
  name: string;
  tags?: string[];
}

interface ProfileNavigationProps {
  profiles: Profile[];
  selectedId?: string;
}

interface ProfileCategory {
  id: string;
  label: string;
  profiles: Profile[];
}

const createUrlSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-').trim();
};

export function ProfileNavigation({ profiles, selectedId }: ProfileNavigationProps) {
  // Initialize state with all groups collapsed
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>(() => {
    const categories = ['1080p', '2160p', 'SD', 'Other'];
    const initialState = categories.reduce(
      (acc, category) => {
        acc[category] = true;
        return acc;
      },
      {} as Record<string, boolean>
    );

    // In client-side, try to get saved state
    if (typeof window !== 'undefined') {
      try {
        const savedStates = localStorage.getItem('collapsedProfileGroups');
        if (savedStates) {
          return JSON.parse(savedStates);
        }
      } catch (error) {
        console.error('Error reading from localStorage:', error);
      }
    }

    return initialState;
  });

  // Save collapsed states to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('collapsedProfileGroups', JSON.stringify(collapsedGroups));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [collapsedGroups]);

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const categorizeProfiles = useCallback(() => {
    const categorized: ProfileCategory[] = [];
    const resolutionRegex = /(1080p|2160p|SD)/i;

    // Group profiles by resolution
    profiles.forEach((profile) => {
      const match = profile.name.match(resolutionRegex);
      const category = match ? match[1] : 'Other';

      const existingCategory = categorized.find((cat) => cat.id === category);

      if (existingCategory) {
        existingCategory.profiles.push(profile);
      } else {
        categorized.push({
          id: category,
          label: `${category} Profiles`,
          profiles: [profile],
        });
      }
    });

    // Sort profiles within each category
    categorized.forEach((category) => {
      category.profiles.sort((a, b) => a.name.localeCompare(b.name));
    });

    // Sort categories to ensure consistent order
    const categoryOrder = ['2160p', '1080p', 'SD', 'Other'];
    return categorized.sort((a, b) => categoryOrder.indexOf(a.id) - categoryOrder.indexOf(b.id));
  }, [profiles]);

  const categorizedProfiles = categorizeProfiles();

  return (
    <div className="mb-8">
      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto scrollable pr-3">
        <nav className="bg-white dark:bg-gray-900 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="space-y-0">
            {categorizedProfiles.map((category, index) => {
              const isCollapsed = collapsedGroups[category.id];
              const hasItems = category.profiles.length > 0;
              const isLastGroup = index === categorizedProfiles.length - 1;

              return (
                <div key={category.id} className={`space-y-0 ${isLastGroup ? '!mb-0' : ''}`}>
                  <button
                    onClick={() => toggleGroup(category.id)}
                    className={`w-full text-left py-3 px-4 bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                      index === categorizedProfiles.length - 1 ? '' : 'border-b border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm tracking-wider">
                          {category.label}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {category.profiles.length} profile
                          {category.profiles.length !== 1 ? 's' : ''}
                        </span>
                        <div className="p-1 rounded-md">
                          {hasItems ? (
                            isCollapsed ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronUp className="w-4 h-4" />
                            )
                          ) : (
                            <X className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>

                  {hasItems && !isCollapsed && (
                    <ul className="space-y-1 px-3 py-2">
                      {category.profiles.map((profile) => {
                        const urlSlug = createUrlSlug(profile.name);
                        const isSelected = selectedId === profile._id;

                        return (
                          <li key={profile._id}>
                            <Link
                              href={`/profiles/${urlSlug}`}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200
                                ${
                                  isSelected
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                            >
                              <ChevronRight
                                className={`w-4 h-4 transition-opacity
                                  ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                              />
                              <span>{profile.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
