"use client";

import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, BookOpen, Settings, Rocket } from "lucide-react";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

const ExternalLinkComponent = ({ href, children }: ExternalLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 py-1.5 px-3 rounded-md transition-all duration-200"
  >
    {children}
  </a>
);

export function GettingStarted() {
  return (
    <nav className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 rounded-t-lg">
        <h2 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
          <Rocket size={18} />
          Getting Started
        </h2>
      </div>

      <div className="p-4 space-y-1">
        <Link
          href="/devlog"
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 py-1.5 px-3 rounded-md transition-all duration-200"
        >
          <BookOpen size={18} />
          <span>Read our Development Log</span>
        </Link>

        <Link
          href="/profiles"
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 py-1.5 px-3 rounded-md transition-all duration-200"
        >
          <Settings size={18} />
          <span>Find your preferred profiles</span>
        </Link>

        <ExternalLinkComponent href="https://github.com/Dictionarry-Hub/profilarr">
          <div className="w-[18px] h-[18px] relative">
            <Image
              src="/GitHub.svg"
              alt="GitHub"
              fill
              className="object-contain dark:invert dark:brightness-100"
            />
          </div>
          <span>Download Profilarr on GitHub</span>
        </ExternalLinkComponent>

        <ExternalLinkComponent href="https://discord.com/invite/Y9TYP6jeYZ">
          <div className="w-[18px] h-[18px] relative">
            <Image
              src="/Discord.svg"
              alt="Discord"
              fill
              className="object-contain dark:invert dark:brightness-100"
            />
          </div>
          <span>Chat with the community!</span>
        </ExternalLinkComponent>
      </div>
    </nav>
  );
}
