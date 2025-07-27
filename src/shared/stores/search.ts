import { writable, derived, get } from 'svelte/store';
import { filterStore } from './filter';
import { contentDatabase } from '../../generated/contentDatabase';

// Store for current search term
export const searchTerm = writable<string>('');

// Re-export filter functionality from filter store
export const selectedFilters = derived(filterStore, $filterStore => $filterStore.searchFilters);
export const toggleSearchFilter = filterStore.toggleSearchFilter;

// Available filter options (re-export from filter store)
export { filterOptions as searchFilters } from './filter';

// Derived store for filtered search results
export const searchResults = derived(
  [searchTerm, selectedFilters],
  ([$searchTerm, $selectedFilters]) => {
    if (!$searchTerm.trim()) {
      return [];
    }

    const term = $searchTerm.toLowerCase().trim();
    
    // Map content database entries to search results
    return contentDatabase.entries
      .filter(entry => {
        // Filter by type - matches if "All Types" is selected OR if specific type is selected
        const matchesFilter = $selectedFilters.includes('All Types') ||
          ($selectedFilters.includes('Wiki Articles') && entry.category === 'wiki') ||
          ($selectedFilters.includes('Custom Formats') && entry.type === 'custom-format') ||
          ($selectedFilters.includes('Quality Profiles') && entry.type === 'quality-profile') ||
          ($selectedFilters.includes('Development Logs') && entry.category === 'dev-logs') ||
          ($selectedFilters.includes('Regex Patterns') && entry.type === 'regex-pattern') ||
          ($selectedFilters.includes('Media Management') && entry.type === 'media-management');
        
        if (!matchesFilter) return false;

        return (
          entry.title.toLowerCase().includes(term) ||
          (entry.description && entry.description.toLowerCase().includes(term)) ||
          entry.searchText.includes(term) ||
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
          
          // Search text matches: lowest weight
          if (normalize(a.searchText).includes(normalizedWord)) scoreA += 2;
          if (normalize(b.searchText).includes(normalizedWord)) scoreB += 2;
        });

        // Factor in base content type weight
        scoreA += a.searchWeight;
        scoreB += b.searchWeight;

        return scoreB - scoreA;
      })
      .slice(0, 50) // Limit to top 50 results for performance
      .map(entry => ({
        id: entry.id,
        title: entry.title,
        description: entry.description || '',
        route: entry.path,
        type: entry.type,
        tags: entry.tags,
        weight: entry.searchWeight
      }));
  }
);

// Function to load search index (now just logs that we're using the built-in database)
export async function loadSearchIndex(): Promise<void> {
  console.log(`Using content database with ${contentDatabase.entries.length} entries`);
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