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
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div className="grid grid-cols-12 gap-8">
      <main className="col-span-12 lg:col-span-9">{children}</main>
      {isDesktop ? (
        <aside className="col-span-3 hidden lg:block">
          <div className="sticky top-24">
            <ProfileNavigation profiles={profiles} selectedId={selectedId} />
          </div>
        </aside>
      ) : null}
    </div>
  );
}
