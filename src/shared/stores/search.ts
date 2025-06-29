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
        
        // Check for exact matches first (huge bonus)
        const normalizedTerm = normalize(term);
        if (normalize(a.title) === normalizedTerm) scoreA += 100;
        if (normalize(b.title) === normalizedTerm) scoreB += 100;
        
        termWords.forEach(word => {
          const normalizedWord = normalize(word);
          
          // Title matches
          const aTitleNorm = normalize(a.title);
          const bTitleNorm = normalize(b.title);
          
          if (aTitleNorm === normalizedWord) scoreA += 50; // Exact word match in title
          else if (aTitleNorm.includes(normalizedWord)) scoreA += 20; // Partial match in title
          
          if (bTitleNorm === normalizedWord) scoreB += 50;
          else if (bTitleNorm.includes(normalizedWord)) scoreB += 20;
          
          // Description matches: medium weight (10 points)
          if (normalize(a.description).includes(normalizedWord)) scoreA += 10;
          if (normalize(b.description).includes(normalizedWord)) scoreB += 10;
          
          // Tag matches: lower weight (5 points)
          if (a.tags.some(tag => normalize(tag).includes(normalizedWord))) scoreA += 5;
          if (b.tags.some(tag => normalize(tag).includes(normalizedWord))) scoreB += 5;
          
          // Content matches: lowest weight (2 points)
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
  searchFilter.set('All Types');
}

// Function to perform search
export function performSearch(term: string, filter?: string): void {
  searchTerm.set(term);
  if (filter) {
    searchFilter.set(filter);
  }
}