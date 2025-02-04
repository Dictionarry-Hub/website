// src/app/components/DesktopFooter.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { GitFork, Star, CircleDot } from 'lucide-react';
import { SupportButton } from './SupportButton';
import { useGithubStats } from '@hooks/useGithubStats';

export function DesktopFooter() {
  const { stats, loading } = useGithubStats('Dictionarry-Hub', 'website');

  return (
    <div className="container mx-auto px-6 py-4">
      <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
        {/* Left side - Repo Info */}
        <div className="flex flex-col items-center space-y-2 md:items-start">
          <Link
            href="https://github.com/Dictionarry-Hub/website"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-md bg-gray-300/50 dark:bg-gray-800/50 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {/* Column 1 - Icon */}
            <div className="flex items-center self-stretch">
              <Image src="/svg/github-mark.svg" alt="GitHub" width={24} height={24} className="block dark:hidden" />
              <Image
                src="/svg/github-mark-white.svg"
                alt="GitHub"
                width={24}
                height={24}
                className="hidden dark:block"
              />
            </div>

            {/* Column 2 - Headers and Stats */}
            <div className="flex flex-col gap-1">
              {/* Row 1 - Headers */}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dictionarry / Website</span>

              {/* Row 2 - Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-gray-500" />
                  <span>{loading ? '-' : (stats?.stars ?? '0')}</span>
                </div>

                <div className="flex items-center gap-1">
                  <GitFork size={14} className="text-gray-500" />
                  <span>{loading ? '-' : (stats?.forks ?? '0')}</span>
                </div>

                <div className="flex items-center gap-1">
                  <CircleDot size={14} className="text-gray-500" />
                  <span>{loading ? '-' : (stats?.issues ?? '0')}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Middle - Links */}
        <div className="flex items-center space-x-6">
          <Link
            href="https://discord.com/invite/Y9TYP6jeYZ"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-100 dark:text-gray-900">
              Join our Discord
            </span>
            {/* Icon */}
            <div className="transform transition-transform duration-200 ease-out group-hover:scale-110 group-hover:brightness-110">
              <Image
                src="/svg/discord-mark-black.svg"
                alt="Discord"
                width={20}
                height={20}
                className="block dark:hidden"
              />
              <Image
                src="/svg/discord-mark-white.svg"
                alt="Discord"
                width={20}
                height={20}
                className="hidden dark:block"
              />
            </div>
          </Link>

          <SupportButton />
        </div>
      </div>
    </div>
  );
}
