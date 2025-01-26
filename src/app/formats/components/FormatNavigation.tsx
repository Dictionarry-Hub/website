// src/app/formats/components/FormatNavigation.tsx
"use client";

import { useCallback } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FORMAT_CATEGORIES, FormatCategory } from "../constants";

interface CustomFormat {
  _id: string;
  name: string;
  tags?: string[];
}

interface FormatNavigationProps {
  formats: CustomFormat[];
  selectedId?: string;
}

interface CategorizedFormat extends FormatCategory {
  formats: CustomFormat[];
}

export function FormatNavigation({
  formats,
  selectedId,
}: FormatNavigationProps) {
  const categorizeFormats = useCallback(() => {
    const categorized: CategorizedFormat[] = FORMAT_CATEGORIES.map(
      (category) => {
        const matchingFormats = formats.filter((format) =>
          format.tags?.some((tag) => category.tags.includes(tag))
        );

        return {
          ...category,
          formats: matchingFormats.sort((a, b) => a.name.localeCompare(b.name)),
        };
      }
    );

    // Add uncategorized section for formats that don't match any category
    const uncategorizedFormats = formats.filter(
      (format) =>
        !format.tags?.some((tag) =>
          FORMAT_CATEGORIES.some((cat) => cat.tags.includes(tag))
        )
    );

    if (uncategorizedFormats.length > 0) {
      categorized.push({
        id: "uncategorized",
        label: "Other Formats",
        formats: uncategorizedFormats.sort((a, b) =>
          a.name.localeCompare(b.name)
        ),
        tags: [],
        icon: null,
      });
    }

    return categorized;
  }, [formats]);

  const categorizedFormats = categorizeFormats();

  return (
    <nav className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      {/* Container with max height, scrolling, and custom scrollbar */}
      <div className="max-h-[calc(100vh-8rem)] overflow-y-auto mb-4 scrollable">
        <div className="space-y-0">
          {categorizedFormats.map((category, index) => (
            <div key={category.id} className="space-y-0">
              {/* Category Header */}
              <div
                className={`py-3 px-4 mb-1 bg-gray-100 dark:bg-gray-800/80 ${
                  index === 0
                    ? "border-b border-gray-200 dark:border-gray-700 rounded-t-lg" // First header: bottom border
                    : "border-y border-gray-200 dark:border-gray-700" // Other headers: top and bottom border
                }`}
              >
                <div className="flex items-center gap-2">
                  {category.icon && (
                    <category.icon
                      className={`w-5 h-5 ${category.accentColor?.light} ${category.accentColor?.dark}`}
                    />
                  )}
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm tracking-wider">
                    {category.label}
                  </h3>
                </div>
              </div>

              {/* Format Links */}
              <ul className="space-y-1 px-3 py-2">
                {category.formats.map((format) => {
                  const encodedId = encodeURIComponent(format._id);
                  const isSelected = selectedId === format._id;

                  return (
                    <li key={format._id}>
                      <Link
                        href={`/formats/${encodedId}`}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200
                          ${
                            isSelected
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                      >
                        <ChevronRight
                          className={`w-4 h-4 transition-opacity
                            ${isSelected ? "opacity-100" : "opacity-0"}`}
                        />
                        <span>{format.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
