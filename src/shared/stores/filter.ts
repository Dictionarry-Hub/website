import { writable } from 'svelte/store';

export interface FilterState {
  searchFilters: string[];
}

const DEFAULT_FILTER_STATE: FilterState = {
  searchFilters: ['All Types']
};

// Available filter options
export const filterOptions = [
  'All Types',
  'Wiki Articles',
  'Custom Formats', 
  'Quality Profiles',
  'Development Logs',
  'Regex Patterns',
  'Media Management'
];

// Load filter state from localStorage
function loadFilterState(): FilterState {
  if (typeof window === 'undefined') {
    return DEFAULT_FILTER_STATE;
  }

  try {
    const saved = localStorage.getItem('dictionarry-filter-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate that the saved filters are still valid
      if (Array.isArray(parsed.searchFilters) && 
          parsed.searchFilters.every(filter => filterOptions.includes(filter))) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load filter state from localStorage:', e);
  }

  return DEFAULT_FILTER_STATE;
}

// Create the writable store
function createFilterStore() {
  const { subscribe, set, update } = writable<FilterState>(loadFilterState());

  return {
    subscribe,
    set,
    update,
    // Toggle search filter
    toggleSearchFilter: (filter: string) => {
      if (!filterOptions.includes(filter)) return;
      
      update(state => {
        let newFilters: string[];
        
        if (filter === 'All Types') {
          // If "All Types" is selected, clear everything else and select only "All Types"
          newFilters = ['All Types'];
        } else {
          // Remove "All Types" if it's selected and we're adding a specific filter
          const currentFilters = state.searchFilters.filter(f => f !== 'All Types');
          
          if (currentFilters.includes(filter)) {
            // Remove the filter if it's already selected
            newFilters = currentFilters.filter(f => f !== filter);
            // If no filters left, default to "All Types"
            if (newFilters.length === 0) {
              newFilters = ['All Types'];
            }
          } else {
            // Add the filter if it's not selected
            newFilters = [...currentFilters, filter];
          }
        }
        
        const newState = { ...state, searchFilters: newFilters };
        saveToLocalStorage(newState);
        return newState;
      });
    },
    // Reset to defaults
    reset: () => {
      set(DEFAULT_FILTER_STATE);
      saveToLocalStorage(DEFAULT_FILTER_STATE);
    }
  };
}

// Save filter state to localStorage
function saveToLocalStorage(state: FilterState) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('dictionarry-filter-state', JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save filter state to localStorage:', e);
  }
}

export const filterStore = createFilterStore();