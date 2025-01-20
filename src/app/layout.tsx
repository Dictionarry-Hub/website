// src/app/layout.tsx
import { Schibsted_Grotesk } from "next/font/google";
import { Nav } from "@components/Nav";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${schibsted.className}`}>
      <head>
        <title>Dictionarry</title>
        <meta
          name="description"
          content="A dictionary for arr apps - custom formats, profiles, and more"
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-900">
        <Nav />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
