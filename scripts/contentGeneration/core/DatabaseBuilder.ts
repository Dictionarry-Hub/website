import * as fs from 'fs';
import * as path from 'path';
import { ContentEntry, ContentDatabase } from './types';
import { SearchIndexBuilder } from './SearchIndexBuilder';

export class DatabaseBuilder {
  private searchIndexBuilder: SearchIndexBuilder;
  
  constructor() {
    this.searchIndexBuilder = new SearchIndexBuilder();
  }
  
  build(entries: ContentEntry[]): ContentDatabase {
    // Build route map
    const routeMap: Record<string, ContentEntry> = {};
    for (const entry of entries) {
      routeMap[entry.path] = entry;
    }
    
    // Extract unique categories
    const categories = [...new Set(entries.map(e => e.category))].sort();
    
    // Build search index
    const searchIndex = this.searchIndexBuilder.build(entries);
    
    // Create database
    const database: ContentDatabase = {
      entries,
      routeMap,
      searchIndex,
      categories,
      lastGenerated: new Date().toISOString(),
      version: '2.0.0'
    };
    
    return database;
  }
  
  async write(database: ContentDatabase, outputPath: string): Promise<void> {
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Generate TypeScript content
    const tsContent = `// Auto-generated content database
// Generated at: ${database.lastGenerated}
// Version: ${database.version}

export const contentDatabase = ${JSON.stringify(database, null, 2)} as const;

// Type exports
export type ContentEntry = typeof contentDatabase.entries[0];
export type ContentType = ContentEntry['type'];
export type ContentCategory = typeof contentDatabase.categories[number];
`;
    
    // Write file
    fs.writeFileSync(outputPath, tsContent);
  }
  
  getStats(database: ContentDatabase): {
    totalEntries: number;
    byType: Record<string, number>;
    byCategory: Record<string, number>;
    searchStats: { uniqueTerms: number; totalEntries: number };
  } {
    const byType: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    
    for (const entry of database.entries) {
      byType[entry.type] = (byType[entry.type] || 0) + 1;
      byCategory[entry.category] = (byCategory[entry.category] || 0) + 1;
    }
    
    return {
      totalEntries: database.entries.length,
      byType,
      byCategory,
      searchStats: this.searchIndexBuilder.getStats(database.searchIndex)
    };
  }
}