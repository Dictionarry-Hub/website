// src/app/formats/components/ResponsiveFormatLayout.tsx
'use client';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { FormatNavigation } from './FormatNavigation';

interface ResponsiveFormatLayoutProps {
  children: React.ReactNode;
  formats: any[];
  selectedId?: string;
}

export function ResponsiveFormatLayout({ children, formats, selectedId }: ResponsiveFormatLayoutProps) {
  const isPortrait = useMediaQuery('(orientation: portrait)');
  return (
    <div className="grid grid-cols-12 gap-8">
      <main className={`${isPortrait ? 'col-span-12' : 'col-span-12 lg:col-span-9'}`}>{children}</main>
      {!isPortrait && (
        <aside className="col-span-3 hidden lg:block">
          <div className="sticky top-24">
            <FormatNavigation formats={formats} selectedId={selectedId} />
          </div>
        </aside>
      )}
    </div>
  );
}
