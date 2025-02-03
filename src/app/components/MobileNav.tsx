// src/app/components/MobileNav.tsx
'use client';
import { Dropdown } from './Dropdown';
import { DarkModeToggle } from './DarkModeToggle';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const dropdownItems = [
  { href: '/', label: 'Home' },
  { href: '/devlog', label: 'Development Log' },
  { href: '/wiki', label: 'Wiki' },
  { href: '/formats', label: 'Custom Formats' },
  { href: '/tiers', label: 'Group Tiers' },
  { href: '/profiles', label: 'Quality Profiles' },
  { href: '/builder', label: 'Profile Builder' },
];

export function MobileNav() {
  const pathname = usePathname();
  const activeHref =
    dropdownItems.find(
      (item) =>
        pathname === item.href || (pathname?.startsWith(item.href) && pathname?.charAt(item.href.length) === '/')
    )?.href || '/';

  return (
    <div className="relative flex items-center w-full">
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="flex items-center group">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src="/logo.png"
              alt="Dictionarry Logo"
              width={32}
              height={32}
              className="transform transition-transform duration-200 group-hover:scale-110"
            />
          </div>
        </Link>

        <DarkModeToggle />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <Dropdown items={dropdownItems} value={activeHref} />
      </div>
    </div>
  );
}
