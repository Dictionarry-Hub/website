// src/app/formats/components/FormatDisplay.tsx
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  BookOpenCheck,
  Filter,
  ArrowLeft,
} from "lucide-react";
import { FORMAT_CATEGORIES } from "../constants/format_constants";
import { CONDITION_METADATA } from "../constants/condition_constants";

interface Condition {
  name: string;
  negate: boolean;
  required: boolean;
  type: keyof typeof CONDITION_METADATA;
  pattern?: string;
  source?: string;
  resolution?: string;
}

interface CustomFormat {
  _id: string;
  name: string;
  description?: string;
  tags?: string[];
  conditions: Condition[];
}

interface FormatDisplayProps {
  format?: CustomFormat;
}

const getFeaturedIcon = (tags?: string[]) => {
  if (!tags || tags.length === 0) return null;

  // Find the first matching category based on tags
  const matchingCategory = FORMAT_CATEGORIES.find((category) =>
    category.tags.some((categoryTag) => tags.includes(categoryTag))
  );

  return matchingCategory
    ? {
        icon: matchingCategory.icon,
        accentColor: matchingCategory.accentColor,
      }
    : null;
};

const formatConditionType = (type: string) => {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function FormatDisplay({ format }: FormatDisplayProps) {
  if (!format) {
    return (
      <div className="h-full space-y-8">
        <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/90 dark:to-gray-900/80 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold">About Custom Formats</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              This page serves as a <em>detailed technical reference</em> for
              Dictionarry's custom format system. While most users won't need
              this level of detail, we maintain it to be{" "}
              <strong>fully transparent about how our system works</strong>.
              It's here for anyone who wants to verify our approach, contribute
              improvements, or just learn more about our technical philosophy.
              Select a format from the sidebar to explore its implementation
              details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <BookOpenCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium">Testing</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Each format needs to work <em>reliably</em> for our automation
                to be useful, which is why{" "}
                <strong>
                  Profilarr includes a comprehensive test suite to validate
                  everything
                </strong>
                . We've included all test cases here so you can see exactly what
                we're checking for. Since it's impossible to test every possible
                release name out there, we rely on <em>your feedback</em> to
                catch edge cases - if you notice something not working as it
                should, please let us know!
              </p>
            </div>

            <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Filter className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium">Contributing / Thanks</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                These formats represent a <strong>collaborative effort</strong>,
                building upon foundations from <em>TRaSH guides</em> and
                evolving through community input. This documentation serves both
                as a reference and a way to identify potential improvements. If
                you spot something that could be enhanced,{" "}
                <em>consider contributing</em> through a PR or issue.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const featuredIcon = getFeaturedIcon(format.tags);
  const IconComponent = featuredIcon?.icon;
  const accentColor = featuredIcon?.accentColor;

  return (
    <div className="">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/90 dark:to-gray-900/80 rounded-t-lg border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {IconComponent && accentColor && (
              <div
                className={`flex-shrink-0 p-2 ${accentColor.bg} ${accentColor.darkBg} rounded-lg`}
              >
                <IconComponent
                  className={`w-4 h-4 ${accentColor.light} ${accentColor.dark}`}
                />
              </div>
            )}
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">{format.name}</h1>
              {format.tags && format.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {format.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Link
            href="/formats"
            className="group inline-flex items-center gap-2 px-3 py-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Formats</span>
          </Link>
        </div>
      </div>

      {/* Description */}
      {format.description && (
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Description</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {format.description}
          </p>
        </div>
      )}

      {format.description &&
        format.conditions &&
        format.conditions.length > 0 && (
          <hr className="mx-6 my-2 border-t border-gray-200 dark:border-gray-700" />
        )}

      {/* Conditions Section */}
      {format.conditions && format.conditions.length > 0 && (
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold">Conditions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {format.conditions.map((condition, index) => {
                const metadata = CONDITION_METADATA[condition.type];
                if (!metadata) return null;

                const Icon = metadata.icon;
                return (
                  <div
                    key={`${condition.type}-${index}`}
                    className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">
                        {condition.name}
                      </span>
                      <div className="flex gap-1.5 ml-auto">
                        {condition.required && (
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        )}
                        {condition.negate && (
                          <XCircle className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatConditionType(condition.type)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
