import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { execSync } from 'child_process';
import { ContentEntry, RawContent, ProcessorConfig, ContentProcessor } from '../core/types';
import { DataSource } from '../core/DataSource';
import { slugify, sanitizeForSearch } from '../utils/text';
import { Regex101Cache } from '../utils/regex101Cache';
import { TestResultsCache } from '../utils/testResultsCache';

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

export class RegexPatternProcessor extends ContentProcessor {
  name = 'regex-pattern';
  supportedPaths = ['regex_patterns'];
  private regex101Cache = new Regex101Cache();
  private testResultsCache = new TestResultsCache();

  canProcess(path: string): boolean {
    return path.includes('regex_patterns') && (path.endsWith('.yml') || path.endsWith('.yaml'));
  }

  async process(content: RawContent, config: ProcessorConfig): Promise<ContentEntry | null> {
    try {
      const data = yaml.load(content.content) as any;
      const filename = path.basename(content.path);
      const slug = slugify(filename.replace(/\.ya?ml$/, ''));
      
      const title = data.name || filename.replace(/\.ya?ml$/, '').replace(/[-_]/g, ' ');
      const description = data.description || '';
      const tags = [...(data.tags || []), 'regex'];
      
      let searchContent = `${title} ${description} ${data.pattern || ''} regex pattern`;
      
      // Process regex101 link if present
      if (data.tests && typeof data.tests === 'string' && data.tests.includes('regex101.com')) {
        console.log(`  🧪 Found tests for ${title}: ${data.tests}`);
        const regex101Data = await this.fetchRegex101Data(data.tests);
        if (regex101Data) {
          console.log(`    ✓ Fetched regex101 data, ${regex101Data.unitTests?.length || 0} unit tests`);
          data.regex101 = {
            url: data.tests,
            pattern: regex101Data.regex,
            flags: regex101Data.flags,
            flavor: regex101Data.flavor,
            unitTests: regex101Data.unitTests
          };
          
          // Run tests if we have unit tests
          if (regex101Data.unitTests && regex101Data.unitTests.length > 0) {
            console.log(`    🏃 Running ${regex101Data.unitTests.length} tests...`);
            const testResults = await this.runRegexTests(data.pattern || regex101Data.regex, regex101Data.unitTests);
            data.testResults = testResults;
            console.log(`    ✅ Results: ${testResults.passed} passed, ${testResults.failed} failed`);
          } else {
            console.log(`    ⚠️  No unit tests found`);
          }
        } else {
          console.log(`    ❌ Failed to fetch regex101 data`);
        }
      }
      
      return {
        id: `regex-pattern-${slug}`,
        path: `/regex-pattern/${slug}`,
        type: 'regex-pattern',
        slug,
        category: 'regex-pattern',
        title,
        description,
        data,
        searchText: sanitizeForSearch(searchContent),
        searchWeight: 0.8,
        tags,
        filename,
        lastModified: content.stats?.mtime || new Date().toISOString()
      };
    } catch (error: any) {
      console.warn(`Error processing regex pattern ${content.path}:`, error.message);
      return null;
    }
  }

  private async fetchRegex101Data(url: string): Promise<Regex101Response | null> {
    try {
      const match = url.match(/regex101\.com\/r\/([a-zA-Z0-9]+)/);
      if (!match) {
        console.warn(`Invalid regex101 URL: ${url}`);
        return null;
      }
      
      const id = match[1];
      
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

  private async runRegexTests(pattern: string, tests: Regex101Test[]) {
    // Check cache first
    const cachedResults = this.testResultsCache.getCachedResults(pattern, tests);
    if (cachedResults) {
      return cachedResults;
    }
    
    const scriptPath = path.join(process.cwd(), 'scripts', 'testRegex.ps1');
    
    if (!fs.existsSync(scriptPath)) {
      console.warn('PowerShell test script not found at scripts/testRegex.ps1');
      return { passed: 0, failed: tests.length, results: [] };
    }
    
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);
    
    // Run all tests in parallel
    const testPromises = tests.map(async (test, index) => {
      try {
        const escapedPattern = pattern.replace(/'/g, "''");
        const escapedTestString = test.testString.replace(/'/g, "''");
        
        const command = `pwsh -NoProfile -ExecutionPolicy Bypass -File "${scriptPath}" '${escapedPattern}' '${escapedTestString}'`;
        const { stdout } = await execAsync(command, { encoding: 'utf-8' });
        
        const matches = stdout.trim() === 'True';
        const shouldMatch = test.criteria === 'DOES_MATCH';
        const testPassed = matches === shouldMatch;
        
        return {
          testString: test.testString,
          description: test.description,
          criteria: test.criteria,
          matches,
          passed: testPassed,
          error: false
        };
      } catch (error) {
        return {
          testString: test.testString,
          description: test.description,
          criteria: test.criteria,
          matches: false,
          passed: false,
          error: true
        };
      }
    });
    
    const results = await Promise.all(testPromises);
    
    let passed = 0;
    let failed = 0;
    
    for (const result of results) {
      if (result.passed) passed++;
      else failed++;
    }
    
    const testResults = { passed, failed, results };
    
    // Cache the results
    this.testResultsCache.setCachedResults(pattern, tests, testResults);
    
    return testResults;
  }

  async processAll(source: DataSource): Promise<ContentEntry[]> {
    const files = await source.listFiles('regex_patterns', /\.ya?ml$/);
    console.log(`  📂 Processing ${files.length} regex patterns...`);
    
    // Batch fetch commit logs for all files (get all commits)
    const commitLogs = await source.getFileCommitLogs(files);
    
    // First pass: read all files and collect regex101 URLs
    const fileContents: Array<{ content: RawContent; data: any; regex101Url?: string; file: string }> = [];
    const regex101Urls: string[] = [];
    
    for (const file of files) {
      const content = await source.readFile(file);
      if (content) {
        try {
          const data = yaml.load(content.content) as any;
          const regex101Url = data.tests && typeof data.tests === 'string' && data.tests.includes('regex101.com') 
            ? data.tests 
            : undefined;
          
          fileContents.push({ content, data, regex101Url, file });
          if (regex101Url) {
            regex101Urls.push(regex101Url);
          }
        } catch (error) {
          console.warn(`Error parsing ${file}:`, error);
        }
      }
    }
    
    // Batch fetch all regex101 data
    let regex101Data = new Map<string, any>();
    if (regex101Urls.length > 0) {
      console.log(`  🧪 Found ${regex101Urls.length} patterns with tests`);
      regex101Data = await this.regex101Cache.fetchBatch(regex101Urls);
    }
    
    // Second pass: process all files with cached regex101 data
    const entries: ContentEntry[] = [];
    let testsRun = 0;
    let testsFromCache = 0;
    let totalPassed = 0;
    let totalFailed = 0;
    let processed = 0;
    const totalFiles = fileContents.length;
    const patternsWithTests = fileContents.filter(f => f.regex101Url).length;
    
    for (const { content, data, regex101Url, file } of fileContents) {
      // Check if tests would be cached before processing
      const willUseCachedTests = regex101Url && regex101Data.get(regex101Url)?.unitTests && 
        this.testResultsCache.getCachedResults(data.pattern || regex101Data.get(regex101Url).regex, regex101Data.get(regex101Url).unitTests);
      
      const entry = await this.processWithCachedData(content, data, regex101Url ? regex101Data.get(regex101Url) : null);
      if (entry) {
        // Add commit log if available
        const commitLog = commitLogs.get(file);
        if (commitLog) {
          entry.commitLog = commitLog;
        }
        entries.push(entry);
        if (entry.data?.testResults) {
          testsRun++;
          if (willUseCachedTests) testsFromCache++;
          totalPassed += entry.data.testResults.passed || 0;
          totalFailed += entry.data.testResults.failed || 0;
          const cacheInfo = testsFromCache > 0 ? ` (${testsFromCache} cached)` : '';
          process.stdout.write(`\r    🧪 Testing patterns: ${testsRun}/${patternsWithTests} completed${cacheInfo}`);
        }
        processed++;
      }
    }
    
    if (testsRun > 0) {
      process.stdout.write('\r' + ' '.repeat(80) + '\r');
      const cacheInfo = testsFromCache > 0 ? ` (${testsFromCache} from cache)` : '';
      console.log(`  ✅ Ran tests for ${testsRun} patterns${cacheInfo}: ${totalPassed} passed, ${totalFailed} failed`);
    }
    
    return entries;
  }
  
  private async processWithCachedData(content: RawContent, data: any, regex101Data: any): Promise<ContentEntry | null> {
    try {
      const filename = path.basename(content.path);
      const slug = slugify(filename.replace(/\.ya?ml$/, ''));
      
      const title = data.name || filename.replace(/\.ya?ml$/, '').replace(/[-_]/g, ' ');
      const description = data.description || '';
      const tags = [...(data.tags || []), 'regex'];
      
      let searchContent = `${title} ${description} ${data.pattern || ''} regex pattern`;
      
      // Process regex101 data if available
      if (regex101Data) {
        data.regex101 = {
          url: data.tests,
          pattern: regex101Data.regex,
          flags: regex101Data.flags,
          flavor: regex101Data.flavor,
          unitTests: regex101Data.unitTests
        };
        
        // Run tests if we have unit tests
        if (regex101Data.unitTests && regex101Data.unitTests.length > 0) {
          const testResults = await this.runRegexTests(data.pattern || regex101Data.regex, regex101Data.unitTests);
          data.testResults = testResults;
        }
      }
      
      return {
        id: `regex-pattern-${slug}`,
        path: `/regex-pattern/${slug}`,
        type: 'regex-pattern',
        slug,
        category: 'regex-pattern',
        title,
        description,
        data,
        searchText: sanitizeForSearch(searchContent),
        searchWeight: 0.8,
        tags,
        filename,
        lastModified: content.stats?.mtime || new Date().toISOString()
      };
    } catch (error: any) {
      console.warn(`Error processing regex pattern ${content.path}:`, error.message);
      return null;
    }
  }
}