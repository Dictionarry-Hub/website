import { writable } from 'svelte/store';

const browser = typeof window !== 'undefined';

function createTheme() {
  // Initialize with system preference or saved preference
  const getInitialTheme = () => {
    if (!browser) return false;
    
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const { subscribe, set, update } = writable(getInitialTheme());

  return {
    subscribe,
    toggle: () => update(isDark => {
      const newTheme = !isDark;
      
      if (browser) {
        // Update localStorage
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        
        // Update document class
        if (newTheme) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      
      return newTheme;
    }),
    init: () => {
      if (!browser) return;
      
      const isDark = getInitialTheme();
      
      // Apply initial theme
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      set(isDark);
    }
  };
}

export const theme = createTheme();