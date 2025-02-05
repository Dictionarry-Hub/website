// src/app/formats/components/FormatDisplay.tsx
'use client';

import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  BookOpenCheck,
  Handshake,
  ArrowLeft,
  Download,
  BeakerIcon,
  Copy,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import { FORMAT_CATEGORIES } from '../constants/format_constants';
import { CONDITION_METADATA } from '../constants/condition_constants';
import ReactMarkdown from 'react-markdown';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Condition {
  name: string;
  negate: boolean;
  required: boolean;
  type: keyof typeof CONDITION_METADATA;
  pattern?: string;
  source?: string;
  resolution?: string;
}

interface TestConditionResult {
  matches: boolean;
  name: string;
  negate: boolean;
  pattern: string;
  required: boolean;
  type: string;
}

interface Test {
  conditionResults: TestConditionResult[];
  expected: boolean;
  id: number;
  input: string;
  lastRun: string;
  passes: boolean;
}

interface CustomFormat {
  _id: string;
  name: string;
  description?: string;
  tags?: string[];
  conditions: Condition[];
  tests?: Test[];
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
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const shouldShowPattern = (type: string): boolean => {
  return ['release_group', 'release_title', 'edition'].includes(type);
};

export function FormatDisplay({ format }: FormatDisplayProps) {
  if (!format) return null;

  const featuredIcon = getFeaturedIcon(format.tags);
  const IconComponent = featuredIcon?.icon;
  const accentColor = featuredIcon?.accentColor;

  const [copiedPattern, setCopiedPattern] = useState<string | null>(null);

  const handleCopy = async (pattern: string) => {
    await navigator.clipboard.writeText(pattern);
    setCopiedPattern(pattern);
    setTimeout(() => setCopiedPattern(null), 2000);
  };

  return (
    <div className="">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/90 dark:to-gray-900/80 rounded-t-lg border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {IconComponent && accentColor && (
                <div className={`flex-shrink-0 p-2 ${accentColor.bg} ${accentColor.darkBg} rounded-lg`}>
                  <IconComponent className={`w-4 h-4 ${accentColor.light} ${accentColor.dark}`} />
                </div>
              )}
              <h1 className="text-xl font-bold">{format.name}</h1>
            </div>
            <div className="hidden sm:block">
              <Link
                href="/formats"
                className="group inline-flex items-center gap-2 px-3 py-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Formats</span>
              </Link>
            </div>
            <Link href="/formats" className="sm:hidden">
              <ArrowLeft className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Description */}
      {format.description && (
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Description</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{format.description}</ReactMarkdown>
          </div>
        </div>
      )}

      {format.description && format.conditions && format.conditions.length > 0 && (
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
                const showPattern = shouldShowPattern(condition.type);

                const conditionContent = (
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-2 cursor-help">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">{condition.name}</span>
                      <div className="flex gap-1.5 ml-auto">
                        {condition.required && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                        {condition.negate && <XCircle className="w-4 h-4 text-blue-500" />}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatConditionType(condition.type)}
                    </div>
                  </div>
                );

                return showPattern && condition.pattern ? (
                  <TooltipProvider key={`${condition.type}-${index}`} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger className="w-full" asChild>
                        <div>{conditionContent}</div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-xl"
                        sideOffset={5}
                      >
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono break-all bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                            {condition.pattern}
                          </code>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleCopy(condition.pattern || '');
                            }}
                            className="flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                          >
                            {copiedPattern === condition.pattern ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            )}
                          </button>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div key={`${condition.type}-${index}`}>{conditionContent}</div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tests Section */}
      {format.tests && format.tests.length > 0 && (
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BeakerIcon className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold">Test Cases</h2>
            </div>
            <div className="space-y-4">
              {format.tests.map((test) => (
                <div key={test.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  {/* Test Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0">
                        {test.passes ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <code className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded break-all max-w-[250px] sm:max-w-none">
                        {test.input}
                      </code>
                    </div>
                    <span className="text-xs text-gray-500">
                      Last run: {new Date(test.lastRun).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    {/* Test Results */}
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Expected: <span className="font-medium">{test.expected ? 'Pass' : 'Fail'}</span>
                    </div>

                    {/* Condition Results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {test.conditionResults.map((result, index) => (
                        <div
                          key={index}
                          className="text-xs flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-700/50 rounded"
                        >
                          <div className="flex-shrink-0">
                            {result.matches ? (
                              <CheckCircle2 className="w-3 h-3 text-green-500" />
                            ) : (
                              <XCircle className="w-3 h-3 text-red-500" />
                            )}
                          </div>
                          <span className="break-words">{result.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
