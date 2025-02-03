// src/app/components/Dropdown.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  items: Array<{ href: string; label: string }>;
  value: string;
}

export function Dropdown({ items, value }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(() => {
    const selected = items.find((item) => item.href === value);
    return selected ? selected.label : 'Select option';
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (href: string, label: string) => {
    setSelectedLabel(label);
    setIsOpen(false);
    router.push(href);
  };

  return (
    <div className="relative w-48" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left rounded-lg 
                  bg-white dark:bg-gray-800
                  border border-gray-200 dark:border-gray-700
                  text-gray-900 dark:text-white
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  flex items-center justify-between
                  transition-colors duration-200"
      >
        <span className="text-sm">{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute w-full mt-2 rounded-lg shadow-lg 
                       bg-white dark:bg-gray-800 
                       border border-gray-200 dark:border-gray-700
                       z-50"
        >
          {items.map((item) => (
            <button
              key={item.href}
              onClick={() => handleSelect(item.href, item.label)}
              className="w-full px-4 py-2 text-sm text-left
                        text-gray-900 dark:text-white
                        hover:bg-gray-100 dark:hover:bg-gray-700
                        active:bg-gray-200 dark:active:bg-gray-600
                        cursor-pointer transition-colors duration-200
                        first:rounded-t-lg last:rounded-b-lg
                        block"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
