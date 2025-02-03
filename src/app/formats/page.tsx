// src/app/formats/page.tsx
import { getContent } from '@api/getData';
import { ResponsiveFormatLayout } from './components/ResponsiveFormatLayout';
import { Info, BeakerIcon, Handshake, Download, Library } from 'lucide-react';
import Link from 'next/link';

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

export const metadata = {
  title: 'Custom Formats | Dictionarry',
  description: 'Custom format configurations for media automation',
};

export default async function FormatsPage() {
  const customFormats = (await getContent('custom_formats')) as CustomFormatEntry[] | null;

  if (!customFormats) {
    return (
      <div className="container mx-auto">
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400">Failed to load custom formats. Please try again later.</p>
        </div>
      </div>
    );
  }

  const mainContent = (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/90 dark:to-gray-900/80 p-6">
          <div className="flex items-center gap-4 mb-4">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-bold">Custom Formats</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            This page serves as a detailed technical reference for Dictionarry's custom format system. While most users
            won't need this level of detail, we maintain it to be transparent about our approach to format detection.
            Select a format from the sidebar to explore its implementation details.
          </p>
        </div>

        <div className="p-6 space-y-8">
          {/* Format Types */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Library className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold">Format Types</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-medium mb-2">Release Group Formats</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Primary formats used to identify and score releases based on source groups.{' '}
                  <Link
                    href="/wiki/RGP"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Read more about our release group philosophy →
                  </Link>
                </p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-medium mb-2">Quality Detection</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Formats that detect various quality aspects like resolution, source type, HDR metadata, and audio
                  formats to ensure accurate quality assessment.
                </p>
              </div>
            </div>
          </div>

          {/* Testing and Verification */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <BeakerIcon className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold">Testing & Verification</h2>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Each format needs to work <em>reliably</em> for our automation to be useful, which is why{' '}
                  <strong>Profilarr includes a comprehensive test suite to validate everything</strong>. We've included
                  all test cases here so you can see exactly what we're checking for. Since it's impossible to test
                  every possible release name out there, we rely on <em>your feedback</em> to catch edge cases - if you
                  notice something not working as it should, please let us know!
                </p>
              </div>
            </div>

            {/* Contributing and Thanks */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <Handshake className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold">Contributing / Thanks</h2>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  These formats represent a <strong>collaborative effort</strong>, building upon foundations from{' '}
                  <em>TRaSH guides</em> and evolving through community input. This documentation serves both as a
                  reference and a way to identify potential improvements. If you spot something that could be enhanced,{' '}
                  <em>consider contributing</em> through a PR or issue.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <Download className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold">Installation</h2>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Custom formats must be imported through Profilarr. Manual importing is not supported as these formats
                  use a unified definition system that compiles into specific end formats depending on the arr being
                  imported to.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  For testing and development purposes, you can find beta versions of formats in our development
                  branches. We welcome feedback and contributions to improve format detection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <ResponsiveFormatLayout formats={customFormats}>{mainContent}</ResponsiveFormatLayout>;
}
