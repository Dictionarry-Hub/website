// src/app/profiles/layout.tsx
import { getContent } from '@api/getData';
import { Nav } from '@components/Nav';
import { MobileProfileNavigation } from './components/MobileProfileNavigation';

interface QualityProfileEntry {
  _id: string;
  name: string;
  description?: string;
  tags?: string[];
}

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const profiles = (await getContent('profiles')) as QualityProfileEntry[] | null;

  return (
    <>
      <Nav formatNav={profiles ? <MobileProfileNavigation profiles={profiles} /> : null} />
      {children}
    </>
  );
}
