import { writable, derived } from 'svelte/store';

export interface SearchEntry {
  id: string;
  title: string;
  description: string;
  content?: string;
  route: string;
  type: 'wiki' | 'custom_format' | 'profile' | 'dev_log' | 'regex_pattern';
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

// Store for selected filter
export const searchFilter = writable<string>('All Types');

// Available filter options
export const searchFilters = [
  'All Types',
  'Wiki Articles',
  'Custom Formats', 
  'Quality Profiles',
  'Development Logs',
  'Regex Patterns'
];

// Derived store for filtered search results
export const searchResults = derived(
  [searchIndex, searchTerm, searchFilter],
  ([$searchIndex, $searchTerm, $searchFilter]) => {
    if (!$searchIndex || !$searchTerm.trim()) {
      return [];
    }

    const term = $searchTerm.toLowerCase().trim();
    
    return $searchIndex.entries
      .filter(entry => {
        // Filter by type
        const matchesFilter = $searchFilter === 'All Types' || 
          ($searchFilter === 'Wiki Articles' && entry.type === 'wiki') ||
          ($searchFilter === 'Custom Formats' && entry.type === 'custom_format') ||
          ($searchFilter === 'Quality Profiles' && entry.type === 'profile') ||
          ($searchFilter === 'Development Logs' && entry.type === 'dev_log') ||
          ($searchFilter === 'Regex Patterns' && entry.type === 'regex_pattern');
        
        if (!matchesFilter) return false;

        // Search in title, description, content, and tags
        const searchableText = [
          entry.title,
          entry.description,
          entry.content || '',
          ...entry.tags
        ].join(' ').toLowerCase();

        return searchableText.includes(term);
      })
      .sort((a, b) => {
        // Score based on where the match appears
        const termWords = term.split(' ');
        let scoreA = 0;
        let scoreB = 0;

        // Higher score for title matches
        termWords.forEach(word => {
          if (a.title.toLowerCase().includes(word)) scoreA += 10;
          if (b.title.toLowerCase().includes(word)) scoreB += 10;
          
          // Medium score for description matches
          if (a.description.toLowerCase().includes(word)) scoreA += 5;
          if (b.description.toLowerCase().includes(word)) scoreB += 5;
          
          // Lower score for content/tag matches
          if (a.searchText.includes(word)) scoreA += 1;
          if (b.searchText.includes(word)) scoreB += 1;
        });

        // Factor in base weight
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
  searchFilter.set('All Types');
}

// Function to perform search
export function performSearch(term: string, filter?: string): void {
  searchTerm.set(term);
  if (filter) {
    searchFilter.set(filter);
  }
}