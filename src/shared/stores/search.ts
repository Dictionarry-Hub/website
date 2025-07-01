import { writable, derived } from 'svelte/store';
import { filterStore } from './filter';

export interface SearchEntry {
  id: string;
  title: string;
  description: string;
  content?: string;
  route: string;
  type: 'wiki' | 'custom_format' | 'profile' | 'dev_log' | 'regex_pattern' | 'media_management';
  tags: string[];
  searchText: string;
  weight: number;
}

export interface SearchIndex {
  entries: SearchEntry[];
  lastUpdated: string;
}

// Store for the search index data
export const searchIndex = writable<SearchIndex | null>(null);

// Store for current search term
export const searchTerm = writable<string>('');

// Re-export filter functionality from filter store
export const selectedFilters = derived(filterStore, $filterStore => $filterStore.searchFilters);
export const toggleSearchFilter = filterStore.toggleSearchFilter;

// Available filter options (re-export from filter store)
export { filterOptions as searchFilters } from './filter';

// Derived store for filtered search results
export const searchResults = derived(
  [searchIndex, searchTerm, selectedFilters],
  ([$searchIndex, $searchTerm, $selectedFilters]) => {
    if (!$searchIndex || !$searchTerm.trim()) {
      return [];
    }

    const term = $searchTerm.toLowerCase().trim();
    
    return $searchIndex.entries
      .filter(entry => {
        // Filter by type - matches if "All Types" is selected OR if specific type is selected
        const matchesFilter = $selectedFilters.includes('All Types') ||
          ($selectedFilters.includes('Wiki Articles') && entry.type === 'wiki') ||
          ($selectedFilters.includes('Custom Formats') && entry.type === 'custom_format') ||
          ($selectedFilters.includes('Quality Profiles') && entry.type === 'profile') ||
          ($selectedFilters.includes('Development Logs') && entry.type === 'dev_log') ||
          ($selectedFilters.includes('Regex Patterns') && entry.type === 'regex_pattern') ||
          ($selectedFilters.includes('Media Management') && entry.type === 'media_management');
        
        if (!matchesFilter) return false;

        return (
          entry.title.toLowerCase().includes(term) ||
          entry.description.toLowerCase().includes(term) ||
          (entry.content && entry.content.toLowerCase().includes(term)) ||
          entry.tags.some(tag => tag.toLowerCase().includes(term))
        );
      })
      .sort((a, b) => {
        // Calculate weighted search scores
        const termWords = term.split(' ');
        let scoreA = 0;
        let scoreB = 0;

        // Helper function to normalize text (remove special chars, extra spaces)
        const normalize = (text) => text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
        
        // Calculate similarity percentage between two strings
        const calculateSimilarity = (str1, str2) => {
          const norm1 = normalize(str1);
          const norm2 = normalize(str2);
          
          if (norm1 === norm2) return 1.0; // 100% match
          
          // Count overlapping characters
          let matches = 0;
          const longer = norm1.length > norm2.length ? norm1 : norm2;
          const shorter = norm1.length <= norm2.length ? norm1 : norm2;
          
          for (let i = 0; i < shorter.length; i++) {
            if (longer.includes(shorter[i])) {
              matches++;
            }
          }
          
          // Percentage based on the longer string length
          return matches / longer.length;
        };
        
        const normalizedTerm = normalize(term);
        
        // Title similarity scoring (0-100 points based on percentage)
        const aTitleSimilarity = calculateSimilarity(normalizedTerm, a.title);
        const bTitleSimilarity = calculateSimilarity(normalizedTerm, b.title);
        
        scoreA += aTitleSimilarity * 100; // 0-100 points for title similarity
        scoreB += bTitleSimilarity * 100;
        
        // Additional scoring for word matches
        termWords.forEach(word => {
          const normalizedWord = normalize(word);
          
          // Description matches: medium weight
          if (normalize(a.description).includes(normalizedWord)) scoreA += 10;
          if (normalize(b.description).includes(normalizedWord)) scoreB += 10;
          
          // Tag matches: lower weight
          if (a.tags.some(tag => normalize(tag).includes(normalizedWord))) scoreA += 5;
          if (b.tags.some(tag => normalize(tag).includes(normalizedWord))) scoreB += 5;
          
          // Content matches: lowest weight
          if (a.content && normalize(a.content).includes(normalizedWord)) scoreA += 2;
          if (b.content && normalize(b.content).includes(normalizedWord)) scoreB += 2;
        });

        // Factor in base content type weight
        scoreA += a.weight;
        scoreB += b.weight;

        return scoreB - scoreA;
      })
      .slice(0, 50); // Limit to top 50 results for performance
  }
);

// Function to load search index
export async function loadSearchIndex(): Promise<void> {
  try {
    const response = await fetch('/search-index.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch search index: ${response.status}`);
    }
    
    const index: SearchIndex = await response.json();
    searchIndex.set(index);
    console.log(`Loaded search index with ${index.entries.length} entries`);
  } catch (error) {
    console.error('Failed to load search index:', error);
    // Set empty index as fallback
    searchIndex.set({ entries: [], lastUpdated: new Date().toISOString() });
  }
}

// Function to clear search
export function clearSearch(): void {
  searchTerm.set('');
  filterStore.reset();
}

// Function to perform search
export function performSearch(term: string): void {
  searchTerm.set(term);
}