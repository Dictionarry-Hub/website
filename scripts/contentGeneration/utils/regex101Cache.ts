import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface Regex101Test {
  testString: string;
  compareString: string;
  description: string;
  criteria: 'DOES_MATCH' | 'DOES_NOT_MATCH';
  target: 'REGEX';
}

interface Regex101Response {
  permalinkFragment: string;
  version: number;
  dateCreated: string;
  regex: string;
  testString: string;
  flags: string;
  delimiter: string;
  flavor: string;
  substitution: null;
  listSubstitution: null;
  title: string | null;
  unitTests: Regex101Test[];
}

export class Regex101Cache {
  private cache: Map<string, Regex101Response> = new Map();
  private cacheFile: string;
  private pendingFetches: Map<string, Promise<Regex101Response | null>> = new Map();

  constructor(cacheDir?: string) {
    const dir = cacheDir || path.join(process.cwd(), '.cache');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    this.cacheFile = path.join(dir, 'regex101.json');
    this.loadCache();
  }

  private loadCache(): void {
    if (fs.existsSync(this.cacheFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(this.cacheFile, 'utf-8'));
        this.cache = new Map(Object.entries(data));
        console.log(`  📦 Loaded ${this.cache.size} cached regex101 entries`);
      } catch (error) {
        console.warn('Failed to load regex101 cache:', error);
      }
    }
  }

  private saveCache(): void {
    try {
      const data = Object.fromEntries(this.cache.entries());
      fs.writeFileSync(this.cacheFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.warn('Failed to save regex101 cache:', error);
    }
  }

  async fetchData(url: string): Promise<Regex101Response | null> {
    // Extract ID from URL
    const match = url.match(/regex101\.com\/r\/([a-zA-Z0-9]+)/);
    if (!match) {
      console.warn(`Invalid regex101 URL: ${url}`);
      return null;
    }
    
    const id = match[1];
    
    // Check cache first
    if (this.cache.has(id)) {
      return this.cache.get(id)!;
    }

    // Check if already fetching
    if (this.pendingFetches.has(id)) {
      return this.pendingFetches.get(id)!;
    }

    // Create fetch promise
    const fetchPromise = this.fetchFromAPI(id, url);
    this.pendingFetches.set(id, fetchPromise);

    try {
      const result = await fetchPromise;
      if (result) {
        this.cache.set(id, result);
        this.saveCache();
      }
      return result;
    } finally {
      this.pendingFetches.delete(id);
    }
  }

  private async fetchFromAPI(id: string, url: string): Promise<Regex101Response | null> {
    try {
      // Get available versions
      const versionsCommand = `curl -s https://regex101.com/api/regex/${id}`;
      const versionsResult = execSync(versionsCommand, { encoding: 'utf-8' });
      const versionsData = JSON.parse(versionsResult) as { permalinkFragment: string; versions: number[] };
      
      const latestVersion = versionsData.versions?.length > 0 
        ? Math.max(...versionsData.versions)
        : 1;
      
      // Fetch specific version
      const dataCommand = `curl -s https://regex101.com/api/regex/${id}/${latestVersion}`;
      const dataResult = execSync(dataCommand, { encoding: 'utf-8' });
      return JSON.parse(dataResult) as Regex101Response;
    } catch (error: any) {
      console.warn(`Error fetching regex101 data for ${url}: ${error.message}`);
      return null;
    }
  }

  // Batch fetch multiple URLs
  async fetchBatch(urls: string[]): Promise<Map<string, Regex101Response | null>> {
    const results = new Map<string, Regex101Response | null>();
    
    // Separate cached and uncached
    const uncached: string[] = [];
    for (const url of urls) {
      const match = url.match(/regex101\.com\/r\/([a-zA-Z0-9]+)/);
      if (match) {
        const id = match[1];
        if (this.cache.has(id)) {
          results.set(url, this.cache.get(id)!);
        } else {
          uncached.push(url);
        }
      }
    }

    if (uncached.length > 0) {
      console.log(`  🌐 Fetching ${uncached.length} regex101 entries (${results.size} from cache)...`);
      
      // Fetch uncached in parallel
      const fetchPromises = uncached.map(url => 
        this.fetchData(url).then(data => ({ url, data }))
      );
      
      const fetchResults = await Promise.all(fetchPromises);
      for (const { url, data } of fetchResults) {
        results.set(url, data);
      }
    } else {
      console.log(`  ✅ All ${results.size} regex101 entries from cache`);
    }

    return results;
  }

  clearCache(): void {
    this.cache.clear();
    if (fs.existsSync(this.cacheFile)) {
      fs.unlinkSync(this.cacheFile);
    }
    console.log('  🗑️  Cleared regex101 cache');
  }
}