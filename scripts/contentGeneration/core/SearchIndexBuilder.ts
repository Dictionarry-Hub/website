import { ContentEntry } from './types';

export interface SearchIndex {
  terms: Record<string, string[]>;
  entries: Record<string, {
    title: string;
    description: string;
    route: string;
    type: string;
    weight: number;
  }>;
}

export class SearchIndexBuilder {
  build(entries: ContentEntry[]): SearchIndex {
    const searchIndex: SearchIndex = {
      terms: {},
      entries: {}
    };
    
    for (const entry of entries) {
      // Extract search terms (words longer than 2 characters)
      const terms = entry.searchText
        .split(' ')
        .filter(t => t.length > 2);
      
      // Add terms to index
      for (const term of terms) {
        if (!searchIndex.terms[term]) {
          searchIndex.terms[term] = [];
        }
        searchIndex.terms[term].push(entry.id);
      }
      
      // Add entry to search entries
      searchIndex.entries[entry.id] = {
        title: entry.title,
        description: entry.description || '',
        route: entry.path,
        type: entry.type,
        weight: entry.searchWeight
      };
    }
    
    return searchIndex;
  }
  
  getStats(searchIndex: SearchIndex): { uniqueTerms: number; totalEntries: number } {
    return {
      uniqueTerms: Object.keys(searchIndex.terms).length,
      totalEntries: Object.keys(searchIndex.entries).length
    };
  }
}