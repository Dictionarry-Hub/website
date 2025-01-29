import React, { useState } from 'react';
import { RotateCcw, ChevronLeft } from 'lucide-react';

interface RecommendHeaderProps {
  onReset: () => void;
  onBack: () => void;
  canGoBack: boolean;
}

const CustomTooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
        {children}
      </div>
      {isVisible && (
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-xs 
                      bg-gray-900 dark:bg-gray-700 text-white rounded whitespace-nowrap"
        >
          {content}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full 
                        border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"
          />
        </div>
      )}
    </div>
  );
};

const RecommendHeader = ({ onReset, onBack, canGoBack }: RecommendHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {/* Title and description */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Profile Recommender</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Configure your ideal quality settings at each step, with smart filtering that shows only compatible profiles.
          Choose a starting resolution to get started, and follow the flowchart to build your profile.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <CustomTooltip content="Reset all selections and start over">
          <button
            onClick={onReset}
            className="inline-flex items-center justify-center px-3 py-2 rounded-md
                     bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                     text-gray-700 dark:text-gray-200
                     transition-colors duration-200"
          >
            <RotateCcw size={16} className="mr-2" />
            Reset
          </button>
        </CustomTooltip>

        <CustomTooltip content="Go back to previous selection">
          <button
            onClick={onBack}
            disabled={!canGoBack}
            className="inline-flex items-center justify-center px-3 py-2 rounded-md
                     bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                     text-gray-700 dark:text-gray-200
                     transition-colors duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} className="mr-2" />
            Back
          </button>
        </CustomTooltip>
      </div>
    </div>
  );
};

export default RecommendHeader;
