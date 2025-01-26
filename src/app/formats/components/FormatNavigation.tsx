"use client";

import { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, ChevronUp, X } from "lucide-react";
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
  // Initialize state with all groups collapsed
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >(() => {
    // Try to get saved state from localStorage first
    const savedStates = localStorage.getItem("collapsedGroups");
    if (savedStates) {
      return JSON.parse(savedStates);
    }

    // If no saved state, create initial state with all categories collapsed
    const initialState = FORMAT_CATEGORIES.reduce((acc, category) => {
      acc[category.id] = true;
      return acc;
    }, {} as Record<string, boolean>);

    // Add uncategorized section if needed
    initialState["uncategorized"] = true;

    return initialState;
  });

  // Save collapsed states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("collapsedGroups", JSON.stringify(collapsedGroups));
  }, [collapsedGroups]);

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

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
    <div className="mb-8">
      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto scrollable pr-3">
        <nav className="bg-white dark:bg-gray-900 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="space-y-0 ">
            {categorizedFormats.map((category, index) => {
              const isCollapsed = collapsedGroups[category.id];
              const hasItems = category.formats.length > 0;
              const isLastGroup = index === categorizedFormats.length - 1;

              return (
                <div
                  key={category.id}
                  className={`space-y-0 ${isLastGroup ? "!mb-0" : ""}`}
                >
                  <button
                    onClick={() => toggleGroup(category.id)}
                    className={`w-full text-left py-3 px-4 bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                      index === 0
                        ? "border-b border-gray-200 dark:border-gray-700 rounded-t-lg"
                        : "border-y border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
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
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {category.formats.length} format
                          {category.formats.length !== 1 ? "s" : ""}
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
