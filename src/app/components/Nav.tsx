// src/app/components/Nav.tsx
import Image from "next/image";
import { DarkModeToggle } from "./DarkModeToggle";

export function Nav() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Dictionarry Logo"
              width={26}
              height={26}
              className="rounded-lg"
            />
            <a
              href="/"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              Dictionarry
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/wiki"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Wiki
            </a>
            <a
              href="/formats"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Formats
            </a>
            <a
              href="/profiles"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Profiles
            </a>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
