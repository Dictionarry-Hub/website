// src/components/TableOfContents.tsx

"use client";
import { useCallback, useState, useEffect, useRef } from "react";
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

// Renders a single TOC item with clean indentation
function TOCItem({
  header,
  activeId,
  scrollToHeader,
}: {
  header: Header;
  activeId: string;
  scrollToHeader: (id: string) => void;
}) {
  // Calculate indentation based on header level
  const indentLevel = Math.max(0, header.level - 1);
  const paddingLeft = indentLevel * 1 + 0.75; // Base padding + 1rem per level
  
  // Determine if item is active
  const isActive = activeId === header.id;
  
  return (
    <li>
      <button
        onClick={() => scrollToHeader(header.id)}
        className={`
          w-full text-left transition-all duration-200 py-1.5 rounded-md text-sm
          ${isActive
            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }
        `}
        style={{ paddingLeft: `${paddingLeft}rem`, paddingRight: "0.75rem" }}
      >
        <div className="flex justify-between items-baseline gap-3">
          <span className="truncate">{header.text}</span>
          
          {header.date && header.level === 1 && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 whitespace-nowrap">
              {header.date}
            </span>
          )}
        </div>
      </button>
    </li>
  );
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
    <ul className="space-y-0.5">
      {headers.map((header) => (
        <TOCItem 
          key={header.id}
          header={header}
          activeId={activeId}
          scrollToHeader={scrollToHeader}
        />
      ))}
    </ul>
  );
}

export function TableOfContents({ headers }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [manuallySelected, setManuallySelected] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headerRefs = useRef<Map<string, HTMLElement>>(new Map());
  const autoScrollingRef = useRef(false);
  
  // Update headerRefs map whenever headers change
  useEffect(() => {
    headerRefs.current.clear();
    
    // Delay to ensure DOM is ready
    const timer = setTimeout(() => {
      headers.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          headerRefs.current.set(id, element);
        } else {
          console.warn(`Element with ID ${id} not found for Table of Contents`);
        }
      });
      
      // Setup observer after we've collected all header references
      setupObserver();
    }, 100); // Slightly longer delay to ensure DOM is fully ready
    
    return () => clearTimeout(timer);
  }, [headers]);
  
  // Setup the IntersectionObserver
  const setupObserver = useCallback(() => {
    // Disconnect any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Create new observer with improved options for header detection
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Skip updates if we're currently in a programmatic scroll
        if (autoScrollingRef.current) return;
        
        // Skip updates if there's a manually selected header
        if (manuallySelected) return;
        
        // Get all currently visible headers
        const visibleHeaders = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => ({
            id: entry.target.id,
            ratio: entry.intersectionRatio,
            y: entry.boundingClientRect.y
          }));
        
        if (visibleHeaders.length > 0) {
          // If multiple headers are visible, prioritize the one that's higher in the viewport
          // or with a better intersection ratio
          const topHeader = visibleHeaders.reduce((prev, current) => {
            if (current.ratio > prev.ratio * 1.2) return current; // Prefer significantly better visibility
            if (Math.abs(current.ratio - prev.ratio) < 0.2 && current.y < prev.y) return current; // Or higher position
            return prev;
          });
          
          // Only update if not manually selected
          if (!manuallySelected) {
            setActiveId(topHeader.id);
          }
        }
      },
      { 
        // Improved rootMargin that better detects headers at different viewport positions
        rootMargin: "-80px 0px -40% 0px",
        threshold: [0.1, 0.5, 0.9] // Multiple thresholds for better detection
      }
    );
    
    // Observe all header elements
    headerRefs.current.forEach(element => {
      observerRef.current?.observe(element);
    });
  }, [manuallySelected]);
  
  // Function to smoothly scroll to a header
  const scrollToHeader = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // First, update the active ID immediately for better UX
      setActiveId(id);
      
      // Set this header as manually selected - will remain active until user scrolls
      setManuallySelected(id);
      
      // Set flag to indicate we're programmatically scrolling
      autoScrollingRef.current = true;
      
      // Get the position of the element relative to the viewport
      const rect = element.getBoundingClientRect();
      
      // Calculate offset: account for fixed header and add a small buffer
      const navHeight = 64; // Height of the fixed navbar
      const offset = 24; // Additional buffer space
      
      // Calculate final scroll position
      const scrollPosition = window.scrollY + rect.top - navHeight - offset;
      
      // Smooth scroll to the target
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
      
      // Mobile menu handling
      setIsOpen(false);
      
      // Reset the auto-scrolling flag after scrolling is likely complete
      setTimeout(() => {
        autoScrollingRef.current = false;
      }, 500);
    } else {
      console.warn(`Target element with ID ${id} not found for scrolling`);
    }
  }, []);
  
  // Add scroll event listener to clear manual selection when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      // Only clear manual selection if we're not auto-scrolling
      if (!autoScrollingRef.current && manuallySelected) {
        setManuallySelected(null);
      }
    };
    
    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [manuallySelected]);

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
      <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/80 rounded-t-lg">
            <h2 className="font-medium text-gray-900 dark:text-white flex items-center ">
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