"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function NotFound() {
  const constructionGifs = ["/gifs/hammer-construction.gif"];
  const [currentGifIndex, setCurrentGifIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGifIndex((prev) =>
        prev === constructionGifs.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(timer);
  }, [constructionGifs.length]); // Added dependency

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative w-[600px] h-[400px] mb-4">
        <Image
          src={constructionGifs[currentGifIndex]}
          alt="Construction in progress"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="w-[600px] text-center text-base text-gray-600 dark:text-gray-300">
        This page is currently under construction, check back soon.
      </div>
    </div>
  );
}
