import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { marked } from 'marked';
import matter from 'gray-matter';
import hljs from 'highlight.js';

// Configure marked to generate header IDs
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false
});

// Add extension to ensure header IDs are generated
marked.use({
  extensions: [
    {
      name: 'heading',
      level: 'block',
      start(src) { return src.match(/^#{1,6}\s/)?.index; },
      tokenizer(src) {
        const match = src.match(/^(#{1,6})\s+(.+?)(?:\n|$)/);
        if (match) {
          const level = match[1].length;
          const text = match[2].trim();
          return {
            type: 'heading',
            raw: match[0],
            depth: level,
            text: text
          };
        }
      },
      renderer(token) {
        const id = sanitizeForAnchor(token.text);
        return `<h${token.depth} id="${id}">${token.text}</h${token.depth}>\n`;
      }
    }
  ]
});

// Function to match navigation component's sanitizeForAnchor
function sanitizeForAnchor(text: string): string {
  return text
    .replace(/[^\w\s-]/g, '') // Remove emojis and special characters except hyphens
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}

// Fix header IDs in HTML to match navigation expectations
function fixHeaderIds(html: string): string {
  return html.replace(/<h([1-6])[^>]*id="[^"]*"[^>]*>(.*?)<\/h[1-6]>/g, (match, level, content) => {
    // Strip HTML tags from content to get plain text
    const plainText = content.replace(/<[^>]*>/g, '');
    const correctId = sanitizeForAnchor(plainText);
    return `<h${level} id="${correctId}">${content}</h${level}>`;
  });
}

interface NavigationItem {
  title?: string;
  children?: (string | NavigationItem)[];
  level?: number; // Used internally for stack management
}

interface HeaderInfo {
  title: string;
  level: number;
}

interface RouteData {
  path: string;
  type: 'quality-profile' | 'custom-format' | 'regex-pattern' | 'media-management' | 'markdown';
  data?: any;
  frontmatter?: any;
  html?: string;
  slug: string;
  filename?: string;
  category: string;
  navigation?: (string | NavigationItem)[];
}

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

function buildNestedNavigation(headers: HeaderInfo[]): (string | NavigationItem)[] {
  const result: (string | NavigationItem)[] = [];
  const stack: NavigationItem[] = [];
  
  for (const header of headers) {
    // Pop items from stack that are same level or deeper
    while (stack.length > 0 && stack[stack.length - 1].level! >= header.level) {
      stack.pop();
    }
    
    // Check if this header has children after it
    const currentIndex = headers.indexOf(header);
    const hasChildren = headers.slice(currentIndex + 1).some(h => h.level === header.level + 1);
    
    const navItem: NavigationItem = hasChildren ? {
      title: header.title,
      children: []
    } : header.title;
    
    if (stack.length === 0) {
      // Top level item
      result.push(navItem);
    } else {
      // Child item - add to nearest parent
      const parent = stack[stack.length - 1];
      if (parent.children) {
        parent.children.push(navItem);
      }
    }
    
    // Only push to stack if it's a NavigationItem with children
    if (typeof navItem === 'object' && navItem.children) {
      stack.push({ ...navItem, level: header.level });
    }
  }
  
  return result;
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

function generateRoutes(): void {
  const routes: RouteData[] = [];

  // Helper function to process YAML directories
  function processYamlDirectory(dir: string, type: RouteData['type'], basePath: string): void {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      if (file.endsWith('.yml') || file.endsWith('.yaml')) {
        try {
          const content = fs.readFileSync(path.join(dir, file), 'utf-8');
          const data = yaml.load(content);
          
          const slug = slugify(file.replace(/\.ya?ml$/, ''));
          
          routes.push({
            path: `${basePath}/${slug}`,
            type: type,
            data: data,
            slug: slug,
            filename: file,
            category: basePath.slice(1) // remove leading slash
          });
        } catch (error: any) {
          console.warn(`Error processing ${file}:`, error.message);
        }
      }
    });
  }

  // Process quality profiles
  processYamlDirectory('./public/database/profiles', 'quality-profile', '/quality-profile');
  
  // Process custom formats
  processYamlDirectory('./public/database/custom_formats', 'custom-format', '/custom-format');
  
  // Process regex patterns
  processYamlDirectory('./public/database/regex_patterns', 'regex-pattern', '/regex-pattern');
  
  // Process media management
  processYamlDirectory('./public/database/media_management', 'media-management', '/media-management');

  // Process markdown files (wiki, etc.)
  function processMarkdownDirectory(dir: string, basePath: string): void {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        processMarkdownDirectory(fullPath, `${basePath}/${item}`);
      } else if (item.endsWith('.md')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const { data: frontmatter, content: markdown } = matter(content);
          let html = marked(markdown);
          
          // Extract and build nested navigation
          const headers = extractHeaders(markdown);
          const navigation = buildNestedNavigation(headers);
          
          // Post-process to add syntax highlighting
          html = html.replace(/<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g, (match, lang, code) => {
            try {
              // Decode HTML entities before highlighting
              const decodedCode = code.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
              const highlighted = hljs.highlight(decodedCode, { language: lang }).value;
              return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
            } catch (err) {
              return match;
            }
          });
          
          // Handle code blocks without language
          html = html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
            try {
              // Decode HTML entities before highlighting
              const decodedCode = code.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
              const highlighted = hljs.highlightAuto(decodedCode).value;
              return `<pre><code class="hljs">${highlighted}</code></pre>`;
            } catch (err) {
              return match;
            }
          });
          
          const slug = slugify(item.replace('.md', ''));
          const route = slug === 'home' ? '/' : `${basePath}/${slug}`;
          
          routes.push({
            path: route,
            type: 'markdown',
            frontmatter,
            html,
            slug,
            category: basePath.slice(1), // remove leading slash
            navigation
          });
        } catch (error: any) {
          console.warn(`Error processing ${item}:`, error.message);
        }
      }
    });
  }

  // Process markdown files from database
  processMarkdownDirectory('./public/database/wiki', '/wiki');
  processMarkdownDirectory('./public/database/dev_logs', '/dev-logs');
  
  // Ensure generated directory exists
  const generatedDir = './src/generated';
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
  }

  // Write as TypeScript module for static import
  const tsContent = `export const routes = ${JSON.stringify(routes, null, 2)};`;
  
  fs.writeFileSync(
    path.join(generatedDir, 'routes.ts'),
    tsContent
  );

  console.log(`Generated ${routes.length} routes:`);
  routes.forEach(route => {
    console.log(`  ${route.path} (${route.type})`);
  });
}

generateRoutes();