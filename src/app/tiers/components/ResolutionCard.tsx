// src/app/tiers/components/ResolutionCard.tsx

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Zap } from 'lucide-react';

const RESOLUTION_DATA = {
  '2160p': {
    title: 'Ultra High Definition',
    qualityNote: 'Ranked entirely using EEi at 55% Target Ratio since no GPPi data is available for 4K content',
    efficiencyNote: 'Ranked using EEi at 30% Target Ratio',
  },
  '1080p': {
    title: 'Full High Definition',
    qualityNote: 'Ranked using a combination of GPPi data and manual quality assessments',
    efficiencyNote: 'Ranked using EEi at 22.5% Target Ratio with extra HEVC weighting',
  },
  '720p': {
    title: 'High Definition',
    qualityNote: 'Ranked using a combination of GPPi data and manual quality assessments',
    efficiencyNote: 'Ranked using EEi at 15% Target Ratio with extra HEVC weighting',
  },
  SD: {
    title: 'Standard Definition',
    qualityNote: 'Ranked entirely using GPPi data',
    efficiencyNote: 'Ranked using EEi at 10% Target Ratio',
  },
};

interface TierInfo {
  _id: string;
  tierNumber: number;
}

interface ResolutionCardProps {
  resolution: string;
  Quality?: TierInfo[];
  Efficient?: TierInfo[];
}

export default function ResolutionCard({ resolution, Quality = [], Efficient = [] }: ResolutionCardProps) {
  const resData = RESOLUTION_DATA[resolution as keyof typeof RESOLUTION_DATA];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/90 dark:to-gray-900/80">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {resData.title} ({resolution})
        </h2>
      </div>

      {/* Tier Links Grid */}
      <div className="grid md:grid-cols-2">
        {/* Quality Section */}
        <Link href={`/tiers/${resolution}/quality`} className="group">
          <div className="p-6 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Star className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                        Quality
                      </h3>
                      <div className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                        {Quality.length} {Quality.length === 1 ? 'tier' : 'tiers'}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{resData.qualityNote}</p>
                  </div>
                </div>
                <ArrowRight className="hidden sm:block w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
              </div>
            </div>
          </div>
        </Link>

        {/* Efficiency Section */}
        <Link
          href={`/tiers/${resolution}/efficient`}
          className="group border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700"
        >
          <div className="p-6 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                        Efficiency
                      </h3>
                      <div className="px-2.5 py-1 rounded-md bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium">
                        {Efficient.length} {Efficient.length === 1 ? 'tier' : 'tiers'}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{resData.efficiencyNote}</p>
                  </div>
                </div>
                <ArrowRight className="hidden sm:block w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
