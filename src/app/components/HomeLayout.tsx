// src/app/components/HomeLayout.tsx
'use client';
import { TableOfContents } from '@components/TableOfContents';
import { GettingStarted } from '@components/GettingStarted';
import { useMediaQuery } from '@hooks/useMediaQuery';

interface HomeLayoutProps {
  children: React.ReactNode;
  headers: Array<{ id: string; level: number; text: string }>;
}

export function HomeLayout({ children, headers }: HomeLayoutProps) {
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isNarrow = useMediaQuery('(max-width: 1024px)');
  const shouldCollapse = isPortrait || isNarrow;

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8">
        <main className="flex-1">
          {children}
          {shouldCollapse && (
            <div className="mt-8">
              <GettingStarted />
            </div>
          )}
        </main>
        {!shouldCollapse && (
          <aside className="hidden lg:block w-[300px]">
            <div className="fixed top-24 w-[300px]">
              <TableOfContents headers={headers} />
              <div className="mt-6">
                <GettingStarted />
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
