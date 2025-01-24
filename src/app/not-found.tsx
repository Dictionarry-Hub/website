"use client";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative w-[600px] h-[400px] mb-4">
        <Image
          src="/gifs/what-huh.gif"
          alt="Page not found"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="w-[600px] text-center text-base text-gray-600 dark:text-gray-300">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </div>
    </div>
  );
}
