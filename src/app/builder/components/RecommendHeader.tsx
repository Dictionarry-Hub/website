// src/app/builder/components/RecommendHeader.tsx

import React, { useState } from 'react';
import { RotateCcw, ChevronLeft, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RecommendHeaderProps {
  onReset: () => void;
  onBack: () => void;
  canGoBack: boolean;
}

const RecommendHeader: React.FC<RecommendHeaderProps> = ({ onReset, onBack, canGoBack }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  return (
    <div className="mb-6">
      {/* Desktop layout */}
      <div className="hidden sm:flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Profile Builder</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure your ideal quality settings at each step, with smart filtering that shows only compatible
            profiles. Choose a starting resolution to get started, and follow the flowchart to build your profile.
          </p>
        </div>

        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <button
                  onClick={onReset}
                  className="inline-flex items-center justify-center px-3 py-2 rounded-md
                    bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                    text-gray-700 dark:text-gray-200 text-sm
                    transition-colors duration-200"
                >
                  <RotateCcw size={16} className="mr-2" />
                  Reset
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Reset all selections and start over</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <button
                  onClick={onBack}
                  disabled={!canGoBack}
                  className="inline-flex items-center justify-center px-3 py-2 rounded-md
                    bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                    text-gray-700 dark:text-gray-200 text-sm
                    transition-colors duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} className="mr-2" />
                  Back
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Go back to previous selection</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="sm:hidden">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Builder</h2>

          <button
            onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Info size={20} />
          </button>
        </div>

        {isDescriptionVisible && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 animate-in fade-in slide-in-from-top-2">
            Configure your ideal quality settings at each step, with smart filtering that shows only compatible
            profiles. Choose a starting resolution to get started, and follow the flowchart to build your profile.
          </p>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={onBack}
            disabled={!canGoBack}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-md
              bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
              text-gray-700 dark:text-gray-200
              transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} className="mr-2" />
            Back
          </button>

          <button
            onClick={onReset}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-md
              bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
              text-gray-700 dark:text-gray-200
              transition-colors duration-200"
          >
            <RotateCcw size={20} className="mr-2" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendHeader;
