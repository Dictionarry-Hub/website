// src/app/components/DarkModeToggle.tsx
"use client";

import { useDarkMode } from "../hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";

export function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <Moon className="h-5 w-5 text-gray-200" />
      ) : (
        <Sun className="h-5 w-5 text-gray-600" />
      )}
    </button>
  );
}
