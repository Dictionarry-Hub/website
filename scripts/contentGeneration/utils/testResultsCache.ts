import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

interface TestResult {
  testString: string;
  description: string;
  criteria: string;
  matches: boolean;
  passed: boolean;
  error?: boolean;
}

interface CachedTestResults {
  passed: number;
  failed: number;
  results: TestResult[];
}

interface CacheEntry {
  patternHash: string;
  testsHash: string;
  results: CachedTestResults;
  timestamp: number;
}

export class TestResultsCache {
  private cache: Map<string, CacheEntry> = new Map();
  private cacheFile: string;
  private cacheDuration: number = 7 * 24 * 60 * 60 * 1000; // 7 days

  constructor(cacheDir?: string) {
    const dir = cacheDir || path.join(process.cwd(), '.cache');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    this.cacheFile = path.join(dir, 'testResults.json');
    this.loadCache();
  }

  private loadCache(): void {
    if (fs.existsSync(this.cacheFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(this.cacheFile, 'utf-8'));
        const now = Date.now();
        
        // Load entries and filter out expired ones
        for (const [key, entry] of Object.entries(data)) {
          const cacheEntry = entry as CacheEntry;
          if (now - cacheEntry.timestamp < this.cacheDuration) {
            this.cache.set(key, cacheEntry);
          }
        }
        
        if (this.cache.size > 0) {
          console.log(`  📦 Loaded ${this.cache.size} cached test results`);
        }
      } catch (error) {
        console.warn('Failed to load test results cache:', error);
      }
    }
  }

  private saveCache(): void {
    try {
      const data = Object.fromEntries(this.cache.entries());
      fs.writeFileSync(this.cacheFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.warn('Failed to save test results cache:', error);
    }
  }

  private hashPattern(pattern: string): string {
    return crypto.createHash('sha256').update(pattern).digest('hex').substring(0, 16);
  }

  private hashTests(tests: any[]): string {
    const testsString = JSON.stringify(tests.map(t => ({
      testString: t.testString,
      criteria: t.criteria
    })));
    return crypto.createHash('sha256').update(testsString).digest('hex').substring(0, 16);
  }

  getCachedResults(pattern: string, tests: any[]): CachedTestResults | null {
    const patternHash = this.hashPattern(pattern);
    const testsHash = this.hashTests(tests);
    const cacheKey = `${patternHash}_${testsHash}`;
    
    const entry = this.cache.get(cacheKey);
    if (entry && entry.patternHash === patternHash && entry.testsHash === testsHash) {
      return entry.results;
    }
    
    return null;
  }

  setCachedResults(pattern: string, tests: any[], results: CachedTestResults): void {
    const patternHash = this.hashPattern(pattern);
    const testsHash = this.hashTests(tests);
    const cacheKey = `${patternHash}_${testsHash}`;
    
    this.cache.set(cacheKey, {
      patternHash,
      testsHash,
      results,
      timestamp: Date.now()
    });
    
    this.saveCache();
  }

  clearCache(): void {
    this.cache.clear();
    if (fs.existsSync(this.cacheFile)) {
      fs.unlinkSync(this.cacheFile);
    }
    console.log('  🗑️  Cleared test results cache');
  }

  getStats(): { total: number; expired: number } {
    const now = Date.now();
    let expired = 0;
    
    for (const entry of this.cache.values()) {
      if (now - entry.timestamp >= this.cacheDuration) {
        expired++;
      }
    }
    
    return {
      total: this.cache.size,
      expired
    };
  }
}