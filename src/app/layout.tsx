// src/app/layout.tsx
import { Schibsted_Grotesk } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';
import { Nav } from '@components/Nav';
import { Footer } from '@components/Footer';
import '@styles/globals.css';
import '@styles/prism.css';
import type { Metadata } from 'next';

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
});
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: {
    template: '%s | Dictionarry',
    default: 'Dictionarry - Simplify Media Automation',
  },
  description:
    'Simplify Radarr & Sonarr media automation through extensive, data-driven documentation, custom formats, and quality profiles. Make media management approachable without requiring extensive technical knowledge.',
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Dictionarry',
    description:
      'Simplify Radarr & Sonarr media automation through extensive, data-driven documentation, custom formats, and quality profiles.',
    url: 'https://dictionarry.vercel.app',
    siteName: 'Dictionarry',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Dictionarry Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dictionarry',
    description: 'Simplify media automation in Radarr & Sonarr',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  keywords: ['Radarr', 'Sonarr', 'Media Automation', 'Custom Formats', 'Quality Profiles', 'Profilarr'],
  authors: [{ name: 'santiagosayshey' }],
  creator: 'santiagosayshey',
  publisher: 'Dictionarry',
  viewport: 'width=device-width, initial-scale=1',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${schibsted.className}`}>
      <body className={`min-h-screen bg-white dark:bg-gray-900 ${geistMono.variable} flex flex-col`}>
        <Nav />
        <main className="container mx-auto px-4 py-8 mt-16 flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
