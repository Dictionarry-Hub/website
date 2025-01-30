// src/app/components/Nav.tsx
'use client';
import Image from 'next/image';
import { DarkModeToggle } from './DarkModeToggle';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/devlog', label: 'Development Log' },
  { href: '/wiki', label: 'Wiki' },
  { href: '/formats', label: 'Custom Formats' },
  { href: '/tiers', label: 'Group Tiers' },
  { href: '/profiles', label: 'Quality Profiles' },
  { href: '/builder', label: 'Profile Builder' },
];

export function Nav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to check if current path matches or is a subpath
  const isActiveRoute = (href: string) => {
    // Exact match or subpath match (but only if it starts with the full href to avoid partial matches)
    return pathname === href || (pathname?.startsWith(href) && pathname?.charAt(href.length) === '/');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`
          border-b border-gray-200 dark:border-gray-700
          bg-gray-50 dark:bg-gray-800
          transition-shadow duration-200
          ${isScrolled ? 'shadow-sm' : ''}
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
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      group relative px-4 py-2 rounded-lg
                      text-sm font-medium
                      transition-all duration-200
                      ${
                        isActiveRoute(item.href)
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                      }
                    `}
                  >
                    <div className="relative z-10 flex items-center">
                      <span className="transition-transform duration-200 group-hover:-translate-y-0.5">
                        {item.label}
                      </span>
                    </div>
                    {/* Active state underline */}
                    {isActiveRoute(item.href) && (
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2
                          w-4/5 h-0.5 bg-blue-600 dark:bg-blue-400
                          rounded-full transition-all duration-300"
                      />
                    )}
                    {/* Hover state background */}
                    <div
                      className="absolute inset-0 bg-gray-100 dark:bg-gray-700
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-200 rounded-lg"
                    />
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
