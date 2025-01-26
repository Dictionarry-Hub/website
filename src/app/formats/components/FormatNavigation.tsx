// src/app/formats/components/FormatNavigation.tsx
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
      });
    }

    return categorized;
  }, [formats]);

  const categorizedFormats = categorizeFormats();

  return (
    <nav className="w-full space-y-6">
      {categorizedFormats.map((category) => (
        <div key={category.id} className="space-y-2">
          <h3 className="font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
            {category.label}
          </h3>
          <ul className="space-y-1">
            {category.formats.map((format) => {
              const encodedId = encodeURIComponent(format._id);
              const isSelected = selectedId === format._id;

              return (
                <li key={format._id}>
                  <Link
                    href={`/formats/${encodedId}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                      ${
                        isSelected
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
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
    </nav>
  );
}
