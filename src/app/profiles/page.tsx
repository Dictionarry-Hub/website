import { getContent } from '@api/getData';
import { ProfileNavigation } from './components/ProfileNavigation';
import { Info, GitBranch, AlertTriangle, Download, Library } from 'lucide-react';
import Link from 'next/link';

interface QualityProfileEntry {
  _id: string;
  name: string;
  description?: string;
  tags?: string[];
  conditions?: Array<{
    name: string;
    negate: boolean;
    required: boolean;
    type: string;
    pattern?: string;
    source?: string;
    resolution?: string;
  }>;
}

export const metadata = {
  title: 'Quality Profiles | Dictionarry',
  description: 'Quality profile configurations for media automation',
};

export default async function ProfilesPage() {
  const profiles = (await getContent('profiles')) as QualityProfileEntry[] | null;

  if (!profiles) {
    return (
      <div className="container mx-auto">
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400">Failed to load quality profiles. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-8">
        <main className="col-span-12 lg:col-span-9">
          <div className="space-y-6">
            {/* Main Description Card */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/90 dark:to-gray-900/80 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h1 className="text-xl font-bold">Quality Profiles</h1>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  This page serves as a detailed technical reference for Dictionarry's quality profiles. While most
                  users won't need this level of detail, we maintain it to be transparent about our approach to media
                  quality management. Select a profile from the sidebar to view its configuration.
                </p>
              </div>

              <div className="p-6 space-y-8">
                {/* Profile Types */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <Library className="w-5 h-5 text-blue-500" />
                    <h2 className="text-lg font-semibold">Profile Types</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                      <h3 className="font-medium mb-2">Encode Profiles</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Primarily focused on release groups, utilizing our GPPi / EEi metrics.{' '}
                        <Link
                          href="/wiki/RGP"
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Read more about our release group philosophy →
                        </Link>
                      </p>
                    </div>
                    <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                      <h3 className="font-medium mb-2">Remux Profiles</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Focused on audio/video characteristics, prioritizing lossless audio formats and HDR metadata to
                        ensure the highest quality remuxes are selected.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Installation & Beta Testing */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Download className="w-5 h-5 text-blue-500" />
                      <h2 className="text-lg font-semibold">Installation</h2>
                    </div>
                    <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Quality profiles must be imported through Profilarr. Manual importing is not supported as these
                        profiles use a unified definition system that compiles into specific end formats depending on
                        the arr being imported to.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <GitBranch className="w-5 h-5 text-blue-500" />
                      <h2 className="text-lg font-semibold">Beta Testing</h2>
                    </div>
                    <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        New profiles often go through beta testing in our beta branches before making their way to
                        stable. Community involvement in testing these profiles is crucial for identifying edge cases
                        and potential issues.
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                        If you encounter any issues or edge cases with profiles in beta, please report them through our
                        GitHub issues or Discord community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <aside className="col-span-12 lg:col-span-3">
          <div className="sticky top-24">
            <ProfileNavigation profiles={profiles} />
          </div>
        </aside>
      </div>
    </div>
  );
}
