// src/app/components/Nav.tsx
'use client';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

interface NavProps {
  formatNav?: React.ReactNode;
}

export function Nav({ formatNav }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isNarrow = useMediaQuery('(max-width: 1024px)');
  const shouldShowMobile = isPortrait || isNarrow;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition-shadow duration-200 ${isScrolled ? 'shadow-sm' : ''}`}
      >
        <nav className="container mx-auto px-4">
          <div className="h-16 flex items-center">
            {!shouldShowMobile ? (
              <DesktopNav />
            ) : (
              <>
                <MobileNav />
                {formatNav}
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
