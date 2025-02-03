// src/app/profiles/[slug]/page.tsx
import { getContent } from '@api/getData';
import { ProfileDisplay } from '../components/ProfileDisplay';
import { ResponsiveProfileLayout } from '../components/ResponsiveProfileLayout';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface Quality {
  id: number | string;
  name: string;
  description?: string;
  qualities?: Array<{
    id: number;
    name: string;
  }>;
}

interface Tweaks {
  preferFreeleech: boolean;
  allowLosslessAudio: boolean;
  allowDVNoFallback: boolean;
  allowBleedingEdgeCodecs: boolean;
  allowPrereleases: boolean;
}

interface QualityProfile {
  _id: string;
  name: string;
  description?: string;
  tags?: string[];
  upgradesAllowed: boolean;
  minCustomFormatScore: number;
  upgradeUntilScore: number;
  minScoreIncrement: number;
  custom_formats: Array<{
    name: string;
    score: number;
  }>;
  qualities: Quality[];
  language: string;
  tweaks: Tweaks;
  upgrade_until?: {
    id: number | string;
    name: string;
    description?: string;
  };
}

const createUrlSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const profiles = (await getContent('profiles')) as QualityProfile[] | null;

  if (!profiles) {
    return {
      title: 'Profile Not Found | Dictionarry',
      description: 'The requested quality profile could not be found.',
    };
  }

  const decodedSlug = decodeURIComponent(slug);
  const selectedProfile = profiles.find((profile) => createUrlSlug(profile.name) === decodedSlug);

  if (!selectedProfile) {
    return {
      title: 'Profile Not Found | Dictionarry',
      description: 'The requested quality profile could not be found.',
    };
  }

  return {
    title: `${selectedProfile.name} | Dictionarry`,
    description: selectedProfile.description || `Configuration details for ${selectedProfile.name}`,
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const profiles = (await getContent('profiles')) as QualityProfile[] | null;

  if (!profiles) {
    return (
      <div className="container mx-auto">
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400">Failed to load quality profiles. Please try again later.</p>
        </div>
      </div>
    );
  }

  const decodedSlug = decodeURIComponent(slug);
  const selectedProfile = profiles.find((profile) => createUrlSlug(profile.name) === decodedSlug);

  if (!selectedProfile) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <ResponsiveProfileLayout profiles={profiles} selectedId={selectedProfile._id}>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/90 dark:to-gray-900/80 rounded-t-lg border-b border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h1 className="text-xl font-bold">{selectedProfile.name}</h1>
                </div>
                <div className="hidden sm:block">
                  <Link
                    href="/profiles"
                    className="group inline-flex items-center gap-2 px-3 py-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Back to Profiles</span>
                  </Link>
                </div>
                <Link href="/profiles" className="sm:hidden">
                  <ArrowLeft className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" />
                </Link>
              </div>
              {selectedProfile.tags && selectedProfile.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedProfile.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <ProfileDisplay profile={selectedProfile} />
        </div>
      </ResponsiveProfileLayout>
    </div>
  );
}

export async function generateStaticParams() {
  const profiles = (await getContent('profiles')) as QualityProfile[] | null;

  return (
    profiles?.map((profile) => ({
      slug: createUrlSlug(profile.name),
    })) || []
  );
}
