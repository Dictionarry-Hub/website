// src/app/layout.tsx
import { Schibsted_Grotesk } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';
import { Nav } from '@components/Nav';
import { Footer } from '@components/Footer';
import '@styles/globals.css';
import '@styles/prism.css';

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
});

const geistMono = GeistMono;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${schibsted.className}`}>
      <head>
        <title>Dictionarry</title>
        <meta name="description" content="A dictionary for arr apps - custom formats, profiles, and more" />
      </head>
      <body className={`min-h-screen bg-white dark:bg-gray-900 ${geistMono.variable} flex flex-col`}>
        <Nav />
        <main className="container mx-auto px-4 py-8 mt-16 flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
