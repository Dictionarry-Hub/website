// src/app/components/MobileFooter.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { SupportButton } from './SupportButton';

export function MobileFooter() {
  return (
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-center">
        {/* Social Links */}
        <div className="flex items-center space-x-6">
          <Link
            href="https://discord.com/invite/Y9TYP6jeYZ"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
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
