// src/app/formats/layout.tsx
import { getContent } from '@api/getData';
import { Nav } from '@components/Nav';
import { MobileFormatNavigation } from './components/MobileFormatNavigation';

interface CustomFormatEntry {
  _id: string;
  name: string;
  description?: string;
  conditions: Array<{
    name: string;
    negate: boolean;
    required: boolean;
    type: string;
    pattern?: string;
    source?: string;
    resolution?: string;
  }>;
  tags?: string[];
}

export default async function FormatLayout({ children }: { children: React.ReactNode }) {
  const customFormats = (await getContent('custom_formats')) as CustomFormatEntry[] | null;

  return (
    <>
      <Nav formatNav={customFormats ? <MobileFormatNavigation formats={customFormats} /> : null} />
      {children}
    </>
  );
}
