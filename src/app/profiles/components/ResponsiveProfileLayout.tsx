// components/ResponsiveProfileLayout.tsx
'use client';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { ProfileNavigation } from './ProfileNavigation';

interface ResponsiveProfileLayoutProps {
  children: React.ReactNode;
  profiles: any[];
  selectedId?: string;
}

export function ResponsiveProfileLayout({ children, profiles, selectedId }: ResponsiveProfileLayoutProps) {
  const isPortrait = useMediaQuery('(orientation: portrait)');
  return (
    <div className="grid grid-cols-12 gap-8">
      <main className={`${isPortrait ? 'col-span-12' : 'col-span-12 lg:col-span-9'}`}>{children}</main>
      {!isPortrait && (
        <aside className="col-span-3 hidden lg:block">
          <div className="sticky top-24">
            <ProfileNavigation profiles={profiles} selectedId={selectedId} />
          </div>
        </aside>
      )}
    </div>
  );
}
