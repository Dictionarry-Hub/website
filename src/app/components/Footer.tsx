// src/app/components/Footer.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Hammer, Coffee } from 'lucide-react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { MobileFooter } from './MobileFooter';
import { DesktopFooter } from './DesktopFooter';

export function Footer() {
  const isDesktop = useMediaQuery('(min-width: 1000px)');

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 mt-16">
      {isDesktop ? <DesktopFooter /> : <MobileFooter />}
    </footer>
  );
}
