// src/app/formats/components/FormatDisplay.tsx
import {
  Box,
  Info,
  CheckCircle2,
  XCircle,
  BookOpenCheck,
  Filter,
} from "lucide-react";

interface Condition {
  name: string;
  negate: boolean;
  required: boolean;
  type: string;
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{format.name}</h1>

        {/* Tags */}
        {format.tags && format.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {format.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-sm font-medium rounded-full
                         bg-blue-50 dark:bg-blue-900/30 
                         text-blue-600 dark:text-blue-400
                         border border-blue-200 dark:border-blue-800/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        {format.description && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            <Info className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
            <p className="text-gray-600 dark:text-gray-300">
              {format.description}
            </p>
          </div>
        )}
      </div>

      {/* Conditions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Conditions</h2>
        <div className="grid gap-4">
          {format.conditions.map((condition, index) => (
            <div
              key={`${condition.name}-${index}`}
              className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {condition.negate ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                    <h3 className="font-medium">
                      {condition.name}
                      {condition.required && (
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                          Required
                        </span>
                      )}
                    </h3>
                  </div>

                  <div className="text-sm space-y-1">
                    <p className="text-gray-600 dark:text-gray-400">
                      Type:{" "}
                      <span className="font-medium">{condition.type}</span>
                    </p>
                    {condition.pattern && (
                      <p className="text-gray-600 dark:text-gray-400">
                        Pattern:{" "}
                        <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-900 font-mono text-xs">
                          {condition.pattern}
                        </code>
                      </p>
                    )}
                    {condition.source && (
                      <p className="text-gray-600 dark:text-gray-400">
                        Source:{" "}
                        <span className="font-medium">{condition.source}</span>
                      </p>
                    )}
                    {condition.resolution && (
                      <p className="text-gray-600 dark:text-gray-400">
                        Resolution:{" "}
                        <span className="font-medium">
                          {condition.resolution}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
