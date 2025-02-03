// src/app/components/DesktopFooter.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Hammer } from 'lucide-react';
import { SupportButton } from './SupportButton';

export function DesktopFooter() {
  return (
    <div className="container mx-auto px-6 py-4">
      <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
        {/* Left side - Text */}
        <div className="flex flex-col items-center space-y-2 md:items-start">
          <div className="group relative inline-flex items-center gap-2 rounded-md bg-gray-300/50 dark:bg-gray-800/50 px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Hammer size={14} className="text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Dictionarry • 2025</span>
          </div>
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

          <Link
            href="https://github.com/Dictionarry-Hub"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-100 dark:text-gray-900">
              View on GitHub
            </span>
            {/* Icon */}
            <div className="transform transition-transform duration-200 ease-out group-hover:scale-110 group-hover:brightness-110">
              <Image src="/svg/github-mark.svg" alt="GitHub" width={20} height={20} className="block dark:hidden" />
              <Image
                src="/svg/github-mark-white.svg"
                alt="GitHub"
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
