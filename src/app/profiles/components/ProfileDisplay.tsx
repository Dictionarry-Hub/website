// src/app/profiles/components/ProfileDisplay.tsx

'use client';

import React from 'react';
import { AlertTriangle, Settings2, Globe2, ArrowUpCircle, AlertCircle, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ProfileFormatsDisplay } from './ProfileFormatsDisplay';

interface CustomFormat {
  name: string;
  score: number;
}

interface Quality {
  id: number | string;
  name: string;
  description?: string;
  qualities?: Array<{
    id: number;
    name: string;
  }>;
}

interface Tweaks {
  preferFreeleech: boolean;
  allowLosslessAudio: boolean;
  allowDVNoFallback: boolean;
  allowBleedingEdgeCodecs: boolean;
  allowPrereleases: boolean;
}

interface ProfileDisplayProps {
  profile: {
    name: string;
    description?: string;
    tags?: string[];
    upgradesAllowed: boolean;
    minCustomFormatScore: number;
    upgradeUntilScore: number;
    minScoreIncrement: number;
    custom_formats: CustomFormat[];
    qualities: Quality[];
    language: string;
    tweaks: Tweaks;
    upgrade_until?: {
      id: number | string;
      name: string;
      description?: string;
    };
  };
}

const parseLanguage = (languageStr: string): string => {
  if (!languageStr || languageStr === 'any') return 'Any';

  const [type, language] = languageStr.split('_');
  const capitalizedLanguage = language.charAt(0).toUpperCase() + language.slice(1);

  switch (type) {
    case 'only':
      return `Must Only Be: ${capitalizedLanguage}`;
    case 'must':
      return `Must Include: ${capitalizedLanguage}`;
    default:
      return capitalizedLanguage;
  }
};

export function ProfileDisplay({ profile }: ProfileDisplayProps) {
  return (
    <div className="">
      {/* Description */}
      {profile.description && (
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Description</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{profile.description}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Quality Settings */}
      {profile.qualities && profile.qualities.length > 0 && (
        <>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold">Quality Settings</h2>
            </div>
            <div className="space-y-2">
              {profile.qualities.map((quality, index) => {
                const isUpgradeTarget = profile.upgrade_until?.id === quality.id;
                const isLast = index === profile.qualities.length - 1;
                return (
                  <div key={`${quality.id}-${index}`} className="relative">
                    <div
                      className={`relative border dark:border-gray-700 rounded-lg overflow-hidden ${
                        isUpgradeTarget
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                          : 'bg-gray-50 dark:bg-gray-800/50'
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <h3
                              className={`text-lg font-medium ${
                                isUpgradeTarget ? 'text-blue-700 dark:text-blue-300' : ''
                              }`}
                            >
                              {quality.name}
                            </h3>
                            {quality.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">{quality.description}</p>
                            )}
                          </div>
                          {quality.qualities && (
                            <div className="flex flex-wrap justify-end gap-2 ml-4">
                              {quality.qualities.map((subQuality) => (
                                <span
                                  key={subQuality.id}
                                  className={`text-sm px-3 py-1.5 rounded-md ${
                                    isUpgradeTarget
                                      ? 'bg-blue-100/80 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300'
                                      : 'bg-white dark:bg-gray-900/50 text-gray-700 dark:text-gray-300'
                                  }`}
                                >
                                  {subQuality.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Custom Formats */}
      {profile.custom_formats && profile.custom_formats.length > 0 && (
        <>
          <hr className="border-gray-200 dark:border-gray-700" />
          <ProfileFormatsDisplay customFormats={profile.custom_formats} />
        </>
      )}

      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Core Settings */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Globe2 className="w-4 h-4 text-blue-400" />
              <span className="font-medium">Language:</span>
              <span className="text-gray-600 dark:text-gray-300">{parseLanguage(profile.language)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ArrowUpCircle className="w-4 h-4 text-blue-400" />
              <span className="font-medium">Upgrades:</span>
              <span className="text-gray-600 dark:text-gray-300">
                {profile.upgradesAllowed ? 'Allowed' : 'Not Allowed'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-blue-400" />
              <span className="font-medium">Minimum Score:</span>
              <span className="text-gray-600 dark:text-gray-300">{profile.minCustomFormatScore}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-blue-400" />
              <span className="font-medium">Upgrade Until Score:</span>
              <span className="text-gray-600 dark:text-gray-300">{profile.upgradeUntilScore}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-blue-400" />
              <span className="font-medium">Minimum Increment:</span>
              <span className="text-gray-600 dark:text-gray-300">{profile.minScoreIncrement}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tweaks */}
      {profile.tweaks && (
        <>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold">Additional Settings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                {Object.entries(profile.tweaks).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <span className="font-medium">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:
                    </span>
                    <span className={`${value ? 'text-green-500' : 'text-red-500'}`}>{value ? 'Yes' : 'No'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
