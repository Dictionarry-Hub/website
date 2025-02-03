// src/app/components/SupportButton.tsx
'use client';
import Link from 'next/link';
import { Coffee } from 'lucide-react';

export function SupportButton() {
  return (
    <Link
      href="https://www.buymeacoffee.com/santiagosayshey"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center space-x-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <Coffee className="h-4 w-4 text-white" />
      <span className="text-sm font-medium">Support Us!</span>
    </Link>
  );
}
