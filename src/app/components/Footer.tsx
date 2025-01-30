'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Hammer } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 mt-16">
      <div className="container mx-auto px-6 py-4">
        {/* Main footer content */}
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          {/* Left side - Text */}
          <div className="flex flex-col items-center space-y-2 md:items-start">
            <div className="group relative inline-flex items-center gap-2 rounded-md bg-gray-300/50 dark:bg-gray-800/50 px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Hammer size={14} className="text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                built by{' '}
                <Link
                  href="https://github.com/santiagosayshey"
                  className="relative text-gray-900 dark:text-gray-100 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative">
                    santiagosayshey
                    <span className="absolute -bottom-px left-0 w-full h-px bg-blue-600 dark:bg-blue-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </Link>
              </span>

              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-100 dark:text-gray-900">
                No copyright, use this stuff however you want :P
              </span>
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

            <a
              href="https://www.buymeacoffee.com/santiagosayshey"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative transform transition-transform duration-200 ease-out hover:scale-105"
            >
              <img
                src="https://img.buymeacoffee.com/button-api/?text=Support the project&emoji=☕&slug=santiagosayshey&button_colour=3B82F6&font_colour=ffffff&font_family=Inter&outline_colour=ffffff&coffee_colour=FFDD00"
                alt="Buy Me a Coffee"
                width="160"
                height="42"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
