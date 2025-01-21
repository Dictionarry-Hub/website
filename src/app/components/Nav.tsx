// src/app/components/Nav.tsx
"use client";

import Image from "next/image";
import { DarkModeToggle } from "./DarkModeToggle";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/devlog", label: "Development Log" },
  { href: "/wiki", label: "Wiki" },
  { href: "/formats", label: "Custom Formats" },
  { href: "/profiles", label: "Quality Profiles" },
];

export function Nav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`
        border-b border-gray-200 dark:border-gray-800
        bg-gradient-to-r from-blue-50 via-white to-purple-50 
        dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
        transition-shadow duration-200
        ${isScrolled ? "shadow-sm" : ""}
      `}
      >
        <nav className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/logo.png"
                  alt="Dictionarry Logo"
                  width={32}
                  height={32}
                  className="transform transition-transform duration-200 group-hover:scale-110"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                Dictionarry
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <div className="relative flex items-center">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative px-4 py-2 rounded-lg text-sm font-medium
                      transition-colors duration-200
                      ${
                        pathname === item.href
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      }
                    `}
                  >
                    {pathname === item.href && (
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-500/10 dark:to-blue-400/10 rounded-lg
                        transition-all duration-300 ease-out"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
