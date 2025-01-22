// src/components/TableOfContents.tsx

"use client";
import { useCallback, useState, useEffect } from "react";
import { ChevronDown, Menu } from "lucide-react";

interface Header {
  id: string;
  text: string;
  level: number;
  date?: string; // optional
}

interface TableOfContentsProps {
  headers: Header[];
}

function TableOfContentsContent({
  headers,
  activeId,
  scrollToHeader,
}: {
  headers: Header[];
  activeId: string;
  scrollToHeader: (id: string) => void;
}) {
  return (
    <ul className="space-y-2">
      {headers.map((header) => (
        <li key={header.id}>
          <button
            onClick={() => scrollToHeader(header.id)}
            className={`
              w-full text-left transition-all duration-200 py-1.5 px-3 rounded-md
              ${header.level > 1 ? "text-sm pl-6" : "text-base font-medium"}
              ${
                activeId === header.id
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }
            `}
          >
            <div className="flex justify-between items-baseline gap-3">
              <span>{header.text}</span>
              {header.date && header.level === 1 && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 whitespace-nowrap">
                  {header.date}
                </span>
              )}
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({ headers }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -66% 0px" }
    );

    headers.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        console.debug(`Observing element with ID: ${id}`);
      } else {
        console.warn(`Element with ID ${id} not found`);
      }
    });

    return () => observer.disconnect();
  }, [headers]);

  const scrollToHeader = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 64; // Height of the fixed navbar
      const offset = 24; // Additional offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navHeight - offset;

      console.debug(`Scrolling to ${id} at position ${offsetPosition}`);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update active ID immediately for better UX
      setActiveId(id);
      setIsOpen(false);
    } else {
      console.warn(`Target element ${id} not found`);
    }
  }, []);

  return (
    <>
      {/* Mobile version */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-3 px-4 text-left bg-white dark:bg-gray-900 rounded-lg shadow-md flex items-center justify-between border border-gray-200 dark:border-gray-700"
        >
          <span className="font-medium text-gray-900 dark:text-white flex items-center">
            <Menu className="w-5 h-5 mr-2" />
            Table of Contents
          </span>
          <ChevronDown
            className={`w-5 h-5 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            } text-gray-500 dark:text-gray-400`}
          />
        </button>

        {isOpen && (
          <div className="mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <TableOfContentsContent
              headers={headers}
              activeId={activeId}
              scrollToHeader={scrollToHeader}
            />
          </div>
        )}
      </div>

      {/* Desktop version */}
      <nav className="hidden lg:block sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="py-3 px-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-medium text-gray-900 dark:text-white flex items-center">
              <Menu className="w-5 h-5 mr-2" />
              Table of Contents
            </h2>
          </div>
          <div className="p-4">
            <TableOfContentsContent
              headers={headers}
              activeId={activeId}
              scrollToHeader={scrollToHeader}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
