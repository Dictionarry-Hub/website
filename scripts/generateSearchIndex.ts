import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { parse as parseYaml } from 'yaml';

function slugify(text: string): string {
  return text
    .toLowerCase()
    // Remove emojis and special characters first
    .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove parentheses and brackets
    .replace(/[()[\]]/g, '')
    // Remove other special characters except hyphens and alphanumeric
    .replace(/[^a-z0-9-]/g, '')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '');
}

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

function stripMarkdown(text: string): string {
  return text
    // Remove headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    // Remove strikethrough
    .replace(/~~(.*?)~~/g, '$1')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove inline code backticks
    .replace(/`([^`]+)`/g, '$1')
    // Clean up line breaks
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function smartTruncate(text: string, limit: number): string {
  if (!text || text.length <= limit) return text;
  
  // Strip markdown first
  const cleanText = stripMarkdown(text);
  if (cleanText.length <= limit) return cleanText;
  
  // Find a good breaking point
  let truncated = cleanText.substring(0, limit);
  
  // Look for sentence endings within last 50 characters
  const sentenceEnd = truncated.lastIndexOf('. ');
  if (sentenceEnd > limit - 50) {
    return truncated.substring(0, sentenceEnd + 1);
  }
  
  // Fall back to word boundary
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > limit - 30) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
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
      
      const filename = basename(file, '.md');
      const slug = slugify(filename);
      const title = frontmatter.title || filename.replace(/[-_]/g, ' ');
      const description = frontmatter.description || body;
      
      entries.push({
        id: `wiki-${slug}`,
        title,
        description,
        content: body,
        route: `/wiki/${slug}`,
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
      
      const filename = basename(file, '.md');
      const slug = slugify(filename);
      const title = frontmatter.title || filename.replace(/[-_]/g, ' ');
      const description = frontmatter.description || body;
      
      entries.push({
        id: `dev-log-${slug}`,
        title,
        description,
        content: body,
        route: `/dev-logs/${slug}`,
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
        const filename = basename(file, '.yml');
        const slug = slugify(filename);
        const title = data.name || filename.replace(/[-_]/g, ' ');
        const description = data.description || '';
        
        entries.push({
          id: `custom-format-${slug}`,
          title,
          description,
          route: `/custom-format/${slug}`,
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
        const filename = basename(file, '.yml');
        const slug = slugify(filename);
        const title = data.name || filename.replace(/[-_]/g, ' ');
        const description = data.description || '';
        
        entries.push({
          id: `profile-${slug}`,
          title,
          description,
          route: `/quality-profile/${slug}`,
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
        const filename = basename(file, '.yml');
        const slug = slugify(filename);
        const title = data.name || filename.replace(/[-_]/g, ' ');
        const description = data.description || '';
        const pattern = data.regex || '';
        
        entries.push({
          id: `regex-${slug}`,
          title,
          description,
          content: pattern,
          route: `/regex-pattern/${slug}`,
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