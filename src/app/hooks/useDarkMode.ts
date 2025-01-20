// src/app/hooks/useDarkMode.ts
"use client";

import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark

  useEffect(() => {
    // Set initial dark mode
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return { isDarkMode, toggleDarkMode };
}
