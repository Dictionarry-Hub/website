import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { parse as parseYaml } from 'yaml';

interface SearchEntry {
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

interface SearchIndex {
  entries: SearchEntry[];
  lastUpdated: string;
}

const DATABASE_PATH = 'public/database';
const OUTPUT_PATH = 'public/search-index.json';

function sanitizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractFrontmatter(content: string): { frontmatter: any; body: string } {
  const frontmatterRegex = /^---\s*\n(.*?)\n---\s*\n(.*)/s;
  const match = content.match(frontmatterRegex);
  
  if (match) {
    try {
      const frontmatter = parseYaml(match[1]);
      return { frontmatter, body: match[2] };
    } catch (e) {
      console.warn('Failed to parse frontmatter:', e);
    }
  }
  
  return { frontmatter: {}, body: content };
}

function processWikiFiles(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const wikiPath = join(DATABASE_PATH, 'wiki');
  
  try {
    const files = readdirSync(wikiPath).filter(f => f.endsWith('.md'));
    
    for (const file of files) {
      const content = readFileSync(join(wikiPath, file), 'utf-8');
      const { frontmatter, body } = extractFrontmatter(content);
      
      const id = basename(file, '.md');
      const title = frontmatter.title || id.replace(/[-_]/g, ' ');
      const description = frontmatter.description || body.substring(0, 200).replace(/\n/g, ' ').trim();
      
      entries.push({
        id: `wiki-${id}`,
        title,
        description,
        content: body.substring(0, 1000),
        route: `/wiki/${id}`,
        type: 'wiki',
        tags: frontmatter.tags || [],
        searchText: sanitizeForSearch(`${title} ${description} ${body}`),
        weight: 0.8
      });
    }
  } catch (e) {
    console.warn('Failed to process wiki files:', e);
  }
  
  return entries;
}

function processDevLogs(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const devLogPath = join(DATABASE_PATH, 'dev_logs');
  
  try {
    const files = readdirSync(devLogPath).filter(f => f.endsWith('.md'));
    
    for (const file of files) {
      const content = readFileSync(join(devLogPath, file), 'utf-8');
      const { frontmatter, body } = extractFrontmatter(content);
      
      const id = basename(file, '.md');
      const title = frontmatter.title || id.replace(/[-_]/g, ' ');
      const description = frontmatter.description || body.substring(0, 200).replace(/\n/g, ' ').trim();
      
      entries.push({
        id: `dev-log-${id}`,
        title,
        description,
        content: body.substring(0, 1000),
        route: `/dev-logs/${id}`,
        type: 'dev_log',
        tags: frontmatter.tags || ['development'],
        searchText: sanitizeForSearch(`${title} ${description} ${body}`),
        weight: 0.6
      });
    }
  } catch (e) {
    console.warn('Failed to process dev log files:', e);
  }
  
  return entries;
}

function processCustomFormats(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const customFormatPath = join(DATABASE_PATH, 'custom_formats');
  
  try {
    const files = readdirSync(customFormatPath).filter(f => f.endsWith('.yml'));
    
    for (const file of files) {
      const content = readFileSync(join(customFormatPath, file), 'utf-8');
      
      try {
        const data = parseYaml(content);
        const id = basename(file, '.yml');
        const title = data.name || id.replace(/[-_]/g, ' ');
        const description = data.description || '';
        
        entries.push({
          id: `custom-format-${id}`,
          title,
          description,
          route: `/custom-formats/${id}`,
          type: 'custom_format',
          tags: data.tags || [],
          searchText: sanitizeForSearch(`${title} ${description} custom format`),
          weight: 0.9
        });
      } catch (e) {
        console.warn(`Failed to parse custom format ${file}:`, e);
      }
    }
  } catch (e) {
    console.warn('Failed to process custom format files:', e);
  }
  
  return entries;
}

function processProfiles(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const profilePath = join(DATABASE_PATH, 'profiles');
  
  try {
    const files = readdirSync(profilePath).filter(f => f.endsWith('.yml'));
    
    for (const file of files) {
      const content = readFileSync(join(profilePath, file), 'utf-8');
      
      try {
        const data = parseYaml(content);
        const id = basename(file, '.yml');
        const title = data.name || id.replace(/[-_]/g, ' ');
        const description = data.description || '';
        
        entries.push({
          id: `profile-${id}`,
          title,
          description,
          route: `/profiles/${id}`,
          type: 'profile',
          tags: data.tags || ['quality', 'profile'],
          searchText: sanitizeForSearch(`${title} ${description} quality profile`),
          weight: 0.9
        });
      } catch (e) {
        console.warn(`Failed to parse profile ${file}:`, e);
      }
    }
  } catch (e) {
    console.warn('Failed to process profile files:', e);
  }
  
  return entries;
}

function processRegexPatterns(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const regexPath = join(DATABASE_PATH, 'regex_patterns');
  
  try {
    const files = readdirSync(regexPath).filter(f => f.endsWith('.yml'));
    
    for (const file of files) {
      const content = readFileSync(join(regexPath, file), 'utf-8');
      
      try {
        const data = parseYaml(content);
        const id = basename(file, '.yml');
        const title = data.name || id.replace(/[-_]/g, ' ');
        const description = data.description || '';
        const pattern = data.regex || '';
        
        entries.push({
          id: `regex-${id}`,
          title,
          description,
          content: pattern,
          route: `/regex-patterns/${id}`,
          type: 'regex_pattern',
          tags: data.tags || ['regex', 'pattern'],
          searchText: sanitizeForSearch(`${title} ${description} ${pattern} regex pattern`),
          weight: 0.7
        });
      } catch (e) {
        console.warn(`Failed to parse regex pattern ${file}:`, e);
      }
    }
  } catch (e) {
    console.warn('Failed to process regex pattern files:', e);
  }
  
  return entries;
}

function generateSearchIndex(): void {
  console.log('Generating search index...');
  
  const entries: SearchEntry[] = [
    ...processWikiFiles(),
    ...processDevLogs(),
    ...processCustomFormats(),
    ...processProfiles(),
    ...processRegexPatterns()
  ];
  
  const searchIndex: SearchIndex = {
    entries: entries.sort((a, b) => b.weight - a.weight),
    lastUpdated: new Date().toISOString()
  };
  
  writeFileSync(OUTPUT_PATH, JSON.stringify(searchIndex, null, 2));
  console.log(`Generated search index with ${entries.length} entries`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSearchIndex();
}

export { generateSearchIndex };