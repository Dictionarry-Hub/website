// src/app/builder/components/RecommendHeader.tsx

import React from 'react';
import { RotateCcw, ChevronLeft } from 'lucide-react';

interface RecommendHeaderProps {
  onReset: () => void;
  onBack: () => void;
  canGoBack: boolean;
}

const RecommendHeader: React.FC<RecommendHeaderProps> = ({ onReset, onBack, canGoBack }) => {
  return (
    <div className="mb-6">
      {/* Title row with actions */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Profile Builder</h2>

        {/* Action buttons - Compact on mobile, full on desktop */}
        <div className="flex gap-2">
          <button
            onClick={onBack}
            disabled={!canGoBack}
            className="inline-flex items-center justify-center rounded-md
              bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
              text-gray-700 dark:text-gray-200
              transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              sm:px-3 sm:py-2 p-2"
          >
            <ChevronLeft size={16} className="sm:mr-2" />
            <span className="hidden sm:inline text-sm">Back</span>
          </button>

          <button
            onClick={onReset}
            className="inline-flex items-center justify-center rounded-md
              bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
              text-gray-700 dark:text-gray-200
              transition-colors duration-200
              sm:px-3 sm:py-2 p-2"
          >
            <RotateCcw size={16} className="sm:mr-2" />
            <span className="hidden sm:inline text-sm">Reset</span>
          </button>
        </div>
      </div>

      {/* Combined description for both mobile and desktop */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <span className="hidden sm:inline">
          Configure your ideal quality settings at each step, with smart filtering that shows only compatible profiles.
          Choose a starting resolution to get started, and follow the flowchart to build your profile.
        </span>
        <span className="sm:hidden">
          Select a node in each row to build your quality profile. Long-press any node to see more details about that
          option. Only compatible options will be available at each step.
        </span>
      </p>
    </div>
  );
};

export default RecommendHeader;
