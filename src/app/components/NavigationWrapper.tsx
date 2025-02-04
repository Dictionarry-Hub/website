// src/app/components/NavigationWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import { MobileFormatNavigation } from '../formats/components/MobileFormatNavigation';
import { MobileProfileNavigation } from '../profiles/components/MobileProfileNavigation';

export function NavigationWrapper({ formats, profiles }: { formats: any; profiles: any }) {
  const pathname = usePathname();

  return (
    <>
      {pathname?.startsWith('/formats') && formats && <MobileFormatNavigation formats={formats} />}
      {pathname?.startsWith('/profiles') && profiles && <MobileProfileNavigation profiles={profiles} />}
    </>
  );
}
