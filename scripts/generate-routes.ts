import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { marked } from 'marked';
import matter from 'gray-matter';

interface RouteData {
  path: string;
  type: 'quality-profile' | 'custom-format' | 'regex-pattern' | 'media-management' | 'markdown';
  data?: any;
  frontmatter?: any;
  html?: string;
  slug: string;
  filename?: string;
  category: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9-]/g, '');
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
          const html = marked(markdown);
          
          const slug = slugify(item.replace('.md', ''));
          const route = slug === 'home' ? '/' : `${basePath}/${slug}`;
          
          routes.push({
            path: route,
            type: 'markdown',
            frontmatter,
            html,
            slug,
            category: basePath.slice(1) // remove leading slash
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