import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import { execSync } from 'child_process';
import { parseMarkdown } from './parseMarkdown';

// Keep configuration minimal as parseMarkdown handles most processing

// Unified content entry interface
interface ContentEntry {
  id: string;
  path: string;
  type: 'quality-profile' | 'custom-format' | 'regex-pattern' | 'media-management' | 'markdown' | 'static';
  slug: string;
  category: string;
  
  // Content data
  title: string;
  description?: string;
  data?: any; // For YAML content
  frontmatter?: any; // For markdown frontmatter
  blocks?: any[]; // Structured blocks for markdown
  markdown?: string; // Raw markdown content
  
  // Navigation
  navigation?: (string | NavigationItem)[];
  
  // Search data
  searchText: string;
  searchWeight: number;
  tags: string[];
  
  // Metadata
  filename?: string;
  lastModified?: string;
}

interface NavigationItem {
  title?: string;
  children?: (string | NavigationItem)[];
  level?: number;
}


interface ContentDatabase {
  entries: ContentEntry[];
  routeMap: Record<string, ContentEntry>;
  searchIndex: {
    terms: Record<string, string[]>; // term -> entry IDs
    entries: Record<string, {
      title: string;
      description: string;
      route: string;
      type: string;
      weight: number;
    }>;
  };
  categories: string[];
  lastGenerated: string;
  version: string;
}

// Utility functions
function sanitizeForAnchor(text: string): string {
  return text
    .replace(/[^\w\s-]/g, '') // Remove emojis and special characters except hyphens
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/[()[\]]/g, '')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function sanitizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripMarkdown(text: string): string {
  return text
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*\*(.*?)\*\*\*/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractHeaders(markdown: string): HeaderInfo[] {
  const headers: HeaderInfo[] = [];
  const lines = markdown.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const title = match[2].trim();
      
      headers.push({
        title,
        level
      });
    }
  }
  
  return headers;
}

function buildNestedNavigation(headers: HeaderInfo[]): (string | NavigationItem)[] {
  const result: (string | NavigationItem)[] = [];
  const stack: NavigationItem[] = [];
  
  for (const header of headers) {
    while (stack.length > 0 && stack[stack.length - 1].level! >= header.level) {
      stack.pop();
    }
    
    const currentIndex = headers.indexOf(header);
    const hasChildren = headers.slice(currentIndex + 1).some(h => h.level === header.level + 1);
    
    const navItem: NavigationItem = hasChildren ? {
      title: header.title,
      children: []
    } : header.title;
    
    if (stack.length === 0) {
      result.push(navItem);
    } else {
      const parent = stack[stack.length - 1];
      if (parent.children) {
        parent.children.push(navItem);
      }
    }
    
    if (typeof navItem === 'object' && navItem.children) {
      stack.push({ ...navItem, level: header.level });
    }
  }
  
  return result;
}

// Regex101 API interface
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

interface Regex101VersionResponse {
  permalinkFragment: string;
  versions: number[];
}

// Fetch regex101 data
async function fetchRegex101Data(url: string): Promise<Regex101Response | null> {
  try {
    // Extract the ID from the URL
    const match = url.match(/regex101\.com\/r\/([a-zA-Z0-9]+)/);
    if (!match) {
      console.warn(`Invalid regex101 URL: ${url}`);
      return null;
    }
    
    const id = match[1];
    
    // First, get the available versions using curl
    const versionsCommand = `curl -s https://regex101.com/api/regex/${id}`;
    const versionsResult = execSync(versionsCommand, { encoding: 'utf-8' });
    const versionsData = JSON.parse(versionsResult) as Regex101VersionResponse;
    
    // Get the latest version
    const latestVersion = versionsData.versions && versionsData.versions.length > 0 
      ? Math.max(...versionsData.versions)
      : 1;
    
    // Fetch the specific version using curl
    const dataCommand = `curl -s https://regex101.com/api/regex/${id}/${latestVersion}`;
    const dataResult = execSync(dataCommand, { encoding: 'utf-8' });
    const data = JSON.parse(dataResult) as Regex101Response;
    
    return data;
  } catch (error: any) {
    console.warn(`Error fetching regex101 data for ${url}: ${error.message}`);
    return null;
  }
}

// Run PowerShell regex tests
function runRegexTests(pattern: string, tests: Regex101Test[]): { passed: number; failed: number; results: any[] } {
  const scriptPath = path.join(process.cwd(), 'scripts', 'testRegex.ps1');
  
  // Ensure the PowerShell script exists
  if (!fs.existsSync(scriptPath)) {
    console.warn('PowerShell test script not found. Creating it...');
    createPowerShellTestScript(scriptPath);
  }
  
  const results = [];
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      // Escape the pattern and test string for PowerShell
      const escapedPattern = pattern.replace(/'/g, "''");
      const escapedTestString = test.testString.replace(/'/g, "''");
      
      // Run the PowerShell script (use pwsh for PowerShell Core on Linux/Mac)
      const command = `pwsh -NoProfile -ExecutionPolicy Bypass -File "${scriptPath}" '${escapedPattern}' '${escapedTestString}'`;
      const result = execSync(command, { encoding: 'utf-8' }).trim();
      
      const matches = result === 'True';
      const shouldMatch = test.criteria === 'DOES_MATCH';
      const testPassed = matches === shouldMatch;
      
      if (testPassed) passed++;
      else failed++;
      
      results.push({
        testString: test.testString,
        description: test.description,
        criteria: test.criteria,
        matches,
        passed: testPassed
      });
    } catch (error) {
      console.warn(`Error running regex test for pattern "${pattern}" with test "${test.testString}":`, error);
      failed++;
      results.push({
        testString: test.testString,
        description: test.description,
        criteria: test.criteria,
        matches: false,
        passed: false,
        error: true
      });
    }
  }
  
  return { passed, failed, results };
}

// Create PowerShell test script
function createPowerShellTestScript(scriptPath: string): void {
  const scriptContent = `param(
    [string]$Pattern,
    [string]$TestString
)

try {
    $regex = [regex]::new($Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Multiline)
    $matches = $regex.IsMatch($TestString)
    Write-Output $matches
} catch {
    Write-Output "False"
}`;
  
  fs.writeFileSync(scriptPath, scriptContent);
}

// Content processors
async function processYamlFile(
  filePath: string, 
  type: ContentEntry['type'], 
  basePath: string,
  category: string
): Promise<ContentEntry | null> {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = yaml.load(content) as any;
    const filename = path.basename(filePath);
    const slug = slugify(filename.replace(/\.ya?ml$/, ''));
    const stats = fs.statSync(filePath);
    
    // Extract title based on type
    let title = data.name || filename.replace(/\.ya?ml$/, '').replace(/[-_]/g, ' ');
    let description = data.description || '';
    let searchContent = '';
    let tags: string[] = data.tags || [];
    
    // Type-specific processing
    switch (type) {
      case 'custom-format':
        searchContent = `${title} ${description} custom format ${JSON.stringify(data.specifications || [])}`;
        tags = [...tags, 'custom-format'];
        break;
      case 'quality-profile':
        searchContent = `${title} ${description} quality profile ${JSON.stringify(data.formatItems || [])}`;
        tags = [...tags, 'quality-profile'];
        break;
      case 'regex-pattern':
        searchContent = `${title} ${description} ${data.pattern || ''} regex pattern`;
        tags = [...tags, 'regex'];
        
        // Process regex101 link if present
        if (data.tests && typeof data.tests === 'string' && data.tests.includes('regex101.com')) {
          const regex101Data = await fetchRegex101Data(data.tests);
          if (regex101Data) {
            // Store the regex101 data
            data.regex101 = {
              url: data.tests,
              pattern: regex101Data.regex,
              flags: regex101Data.flags,
              flavor: regex101Data.flavor,
              unitTests: regex101Data.unitTests
            };
            
            // Run tests if we have unit tests
            if (regex101Data.unitTests && regex101Data.unitTests.length > 0) {
              const testResults = runRegexTests(data.pattern || regex101Data.regex, regex101Data.unitTests);
              data.testResults = testResults;
            }
          }
        }
        break;
      case 'media-management':
        const searchableContent = Object.entries(data)
          .map(([section, config]) => {
            if (typeof config === 'object' && config !== null) {
              return Object.entries(config as Record<string, any>)
                .map(([key, value]) => `${key}: ${value}`)
                .join(' ');
            }
            return `${section}: ${config}`;
          })
          .join(' ');
        
        // Set proper titles and descriptions for media management
        if (slug === 'naming') {
          title = 'Naming Settings';
          description = 'File and folder naming configuration for Radarr and Sonarr';
        } else if (slug === 'qualitydefinitions') {
          title = 'Quality Definitions';
          description = 'Quality definitions and file size limits for different video qualities';
        } else if (slug === 'misc') {
          title = 'Miscellaneous Settings';
          description = 'Miscellaneous media management settings';
        }
        
        searchContent = `${title} ${description} ${searchableContent} media management`;
        tags = [...tags, 'media-management', slug];
        break;
    }
    
    const entry: ContentEntry = {
      id: `${type}-${slug}`,
      path: `${basePath}/${slug}`,
      type,
      slug,
      category,
      title,
      description,
      data,
      searchText: sanitizeForSearch(searchContent),
      searchWeight: type === 'custom-format' || type === 'quality-profile' ? 0.9 : 0.8,
      tags,
      filename,
      lastModified: stats.mtime.toISOString()
    };
    
    return entry;
  } catch (error: any) {
    console.warn(`Error processing YAML file ${filePath}:`, error.message);
    return null;
  }
}

function calculateReadingTime(text: string): number {
  // Average reading speed is 200-250 words per minute
  const wordsPerMinute = 225;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

function processMarkdownFile(
  filePath: string,
  basePath: string,
  category: string
): ContentEntry | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content: markdown } = matter(content);
    const stats = fs.statSync(filePath);
    const filename = path.basename(filePath);
    const slug = slugify(filename.replace('.md', ''));
    
    // Calculate reading time
    const plainText = stripMarkdown(markdown);
    const readingTime = calculateReadingTime(plainText);
    
    // Process markdown with our custom parser to get structured blocks
    const parsed = parseMarkdown(markdown);
    const blocks = parsed.blocks;
    const navigation = parsed.navigation;
    
    // Determine route
    const route = slug === 'home' ? '/' : `${basePath}/${slug}`;
    
    // Extract title and description
    const title = frontmatter.title || filename.replace('.md', '').replace(/[-_]/g, ' ');
    const description = frontmatter.description || stripMarkdown(markdown).substring(0, 200) + '...';
    const blurb = frontmatter.blurb || '';
    
    const entry: ContentEntry = {
      id: `${category}-${slug}`,
      path: route,
      type: 'markdown',
      slug,
      category,
      title,
      description,
      frontmatter: {
        ...frontmatter,
        readingTime,
        blurb,
      },
      blocks,
      markdown,
      navigation,
      searchText: sanitizeForSearch(`${title} ${description} ${blurb} ${stripMarkdown(markdown)}`),
      searchWeight: category === 'wiki' ? 0.8 : 0.6,
      tags: frontmatter.tags || [category],
      filename,
      lastModified: stats.mtime.toISOString()
    };
    
    return entry;
  } catch (error: any) {
    console.warn(`Error processing markdown file ${filePath}:`, error.message);
    return null;
  }
}

// Static pages that don't have files but need routes
function createStaticEntries(): ContentEntry[] {
  const staticPages = [
    {
      id: 'getting-started-welcome',
      path: '/',
      title: 'Welcome',
      description: 'Welcome to Dictionarry - Your media automation configuration hub',
      category: 'getting-started',
      tags: ['welcome', 'home', 'getting-started']
    },
    {
      id: 'getting-started-profilarr',
      path: '/profilarr-setup',
      title: 'Profilarr Setup',
      description: 'Set up and configure Profilarr for automated quality profile management',
      category: 'getting-started',
      tags: ['profilarr', 'setup', 'configuration']
    },
    {
      id: 'getting-started-development',
      path: '/development',
      title: 'Development',
      description: 'Development guide and contribution instructions',
      category: 'getting-started',
      tags: ['development', 'contributing']
    },
    {
      id: 'quality-profile-index',
      path: '/quality-profile',
      title: 'Quality Profiles',
      description: 'Browse and manage quality profiles for your media automation',
      category: 'quality-profile',
      tags: ['quality', 'profiles', 'index']
    },
    {
      id: 'custom-format-index',
      path: '/custom-format',
      title: 'Custom Formats',
      description: 'Browse and manage custom formats for media matching',
      category: 'custom-format',
      tags: ['custom-formats', 'index']
    },
    {
      id: 'regex-pattern-index',
      path: '/regex-pattern',
      title: 'Regex Patterns',
      description: 'Browse and manage regex patterns for advanced matching',
      category: 'regex-pattern',
      tags: ['regex', 'patterns', 'index']
    },
    {
      id: 'media-management-index',
      path: '/media-management',
      title: 'Media Management',
      description: 'Configure media management settings',
      category: 'media-management',
      tags: ['media', 'management', 'settings', 'index']
    },
  ];
  
  return staticPages.map(page => ({
    ...page,
    type: 'static' as const,
    slug: slugify(page.title),
    searchText: sanitizeForSearch(`${page.title} ${page.description}`),
    searchWeight: 0.7,
    navigation: []
  }));
}

// Main generator
async function generateContentDatabase(): Promise<void> {
  console.log('🔨 Generating unified content database...');
  
  const entries: ContentEntry[] = [];
  const categories = new Set<string>();
  
  // Add static entries
  entries.push(...createStaticEntries());
  
  // Process YAML directories
  const yamlDirs = [
    { dir: './public/database/profiles', type: 'quality-profile' as const, basePath: '/quality-profile', category: 'quality-profile' },
    { dir: './public/database/custom_formats', type: 'custom-format' as const, basePath: '/custom-format', category: 'custom-format' },
    { dir: './public/database/regex_patterns', type: 'regex-pattern' as const, basePath: '/regex-pattern', category: 'regex-pattern' },
    { dir: './public/database/media_management', type: 'media-management' as const, basePath: '/media-management', category: 'media-management' }
  ];
  
  for (const { dir, type, basePath, category } of yamlDirs) {
    if (fs.existsSync(dir)) {
      categories.add(category);
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
      
      for (const file of files) {
        const entry = await processYamlFile(path.join(dir, file), type, basePath, category);
        if (entry) entries.push(entry);
      }
    }
  }
  
  // Process markdown directories
  const markdownDirs = [
    { dir: './public/database/wiki', basePath: '/wiki', category: 'wiki' },
    { dir: './public/database/dev_logs', basePath: '/devlogs', category: 'devlogs' }
  ];
  
  for (const { dir, basePath, category } of markdownDirs) {
    if (fs.existsSync(dir)) {
      categories.add(category);
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
      
      for (const file of files) {
        const entry = processMarkdownFile(path.join(dir, file), basePath, category);
        if (entry) entries.push(entry);
      }
    }
  }

  // Link custom formats to quality profiles
  const customFormatMap = new Map(
    entries
      .filter(entry => entry.type === 'custom-format')
      .map(entry => [entry.slug, entry])
  );

  for (const entry of entries) {
    if (entry.type === 'quality-profile' && entry.data?.custom_formats) {
      entry.data.custom_formats = entry.data.custom_formats.map((cf: any) => {
        if (!cf.name) return cf;
        const cfSlug = slugify(cf.name);
        const customFormatEntry = customFormatMap.get(cfSlug);
        if (customFormatEntry) {
          return {
            ...cf,
            tags: customFormatEntry.data.tags || [],
            conditions: customFormatEntry.data.conditions || [],
            description: customFormatEntry.data.description || ''
          };
        }
        return cf;
      });
    }
  }
  
  // Build route map
  const routeMap: Record<string, ContentEntry> = {};
  for (const entry of entries) {
    routeMap[entry.path] = entry;
  }
  
  // Build search index
  const searchIndex = {
    terms: {} as Record<string, string[]>,
    entries: {} as Record<string, any>
  };
  
  // Build search terms index
  for (const entry of entries) {
    const terms = entry.searchText.split(' ').filter(t => t.length > 2);
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
  
  // Create final database
  const database: ContentDatabase = {
    entries,
    routeMap,
    searchIndex,
    categories: Array.from(categories).sort(),
    lastGenerated: new Date().toISOString(),
    version: '1.0.0'
  };
  
  // Ensure generated directory exists
  const generatedDir = './src/generated';
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
  }
  
  // Write as TypeScript module
  const tsContent = `// Auto-generated content database
export const contentDatabase = ${JSON.stringify(database, null, 2)} as const;

// Type exports
export type ContentEntry = typeof contentDatabase.entries[0];
export type ContentType = ContentEntry['type'];
export type ContentCategory = typeof contentDatabase.categories[number];
`;
  
  fs.writeFileSync(
    path.join(generatedDir, 'contentDatabase.ts'),
    tsContent
  );
  
  console.log(`✅ Generated content database with ${entries.length} entries`);
  console.log(`📁 Categories: ${Array.from(categories).join(', ')}`);
  console.log(`🔍 Search index contains ${Object.keys(searchIndex.terms).length} unique terms`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateContentDatabase().catch(console.error);
}

export { generateContentDatabase };