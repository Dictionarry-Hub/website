// components/TableOfContents.tsx
"use client";

import { useCallback, useState, useEffect } from "react";

interface Header {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headers: Header[];
}

export function TableOfContents({ headers }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66% 0px" }
    );

    headers.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headers]);

  const scrollToHeader = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Calculate padding based on header level
  const getPaddingClass = (level: number) => {
    const base = 4;
    const padding = (level - 1) * base;
    return `pl-${padding}`;
  };

  return (
    <nav className="space-y-2 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <h2 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
        Table of Contents
      </h2>
      <div className="space-y-1">
        {headers.map((header) => (
          <button
            key={header.id}
            onClick={() => scrollToHeader(header.id)}
            className={`
              w-full text-left transition-all duration-200 py-1 px-2 rounded
              ${getPaddingClass(header.level)}
              ${
                activeId === header.id
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }
              ${header.level === 1 ? "font-medium" : "text-sm"}
            `}
          >
            {/* Add visual indicator for nesting */}
            {header.level > 1 && (
              <span className="inline-block mr-2 opacity-40">
                {"└─".repeat(header.level - 1)}
              </span>
            )}
            {header.text}
          </button>
        ))}
      </div>
    </nav>
  );
}
