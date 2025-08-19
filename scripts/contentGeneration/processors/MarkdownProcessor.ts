import * as path from 'path';
import matter from 'gray-matter';
import { ContentEntry, RawContent, ProcessorConfig, ContentProcessor, DataSourceConfig } from '../core/types';
import { DataSource } from '../core/DataSource';
import { slugify, sanitizeForSearch, stripMarkdown, calculateReadingTime } from '../utils/text';
import { parseMarkdown } from '../../parseMarkdown';

export class MarkdownProcessor extends ContentProcessor {
  name = 'markdown';
  supportedPaths = ['wiki', 'devlogs'];
  
  private categoryMap: Record<string, { basePath: string; searchWeight: number; publicPath: string }> = {
    'wiki': { basePath: '/wiki', searchWeight: 0.8, publicPath: 'wiki' },
    'devlogs': { basePath: '/devlogs', searchWeight: 0.6, publicPath: 'devlogs' }
  };

  canProcess(path: string): boolean {
    return (path.includes('wiki') || path.includes('dev_logs')) && path.endsWith('.md');
  }

  async process(content: RawContent, config: ProcessorConfig): Promise<ContentEntry | null> {
    try {
      const { data: frontmatter, content: markdown } = matter(content.content);
      const filename = path.basename(content.path);
      const slug = slugify(filename.replace('.md', ''));
      
      // Determine category from path
      const category = content.path.includes('wiki') ? 'wiki' 
                     : content.path.includes('dev_logs') ? 'devlogs'
                     : 'wiki'; // default fallback
      const { basePath, searchWeight } = this.categoryMap[category] || this.categoryMap['wiki'];
      
      // Calculate reading time
      const plainText = stripMarkdown(markdown);
      const readingTime = calculateReadingTime(plainText);
      
      // Process markdown to get structured blocks and navigation
      const parsed = parseMarkdown(markdown);
      const blocks = parsed.blocks;
      const navigation = parsed.navigation;
      
      // Determine route
      const route = slug === 'home' ? '/' : `${basePath}/${slug}`;
      
      // Extract metadata
      const title = frontmatter.title || filename.replace('.md', '').replace(/[-_]/g, ' ');
      const description = frontmatter.description || stripMarkdown(markdown).substring(0, 200) + '...';
      const blurb = frontmatter.blurb || '';
      
      return {
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
        searchText: sanitizeForSearch(`${title} ${description} ${blurb} ${plainText}`),
        searchWeight,
        tags: frontmatter.tags || [category],
        filename,
        lastModified: content.stats?.mtime || new Date().toISOString()
      };
    } catch (error: any) {
      console.warn(`Error processing markdown file ${content.path}:`, error.message);
      return null;
    }
  }

  async processAll(source: DataSource): Promise<ContentEntry[]> {
    const entries: ContentEntry[] = [];
    
    // ALWAYS use local public folder for markdown files, regardless of database source
    // This ensures markdown content is never fetched from remote repositories
    const markdownSourceConfig: DataSourceConfig = {
      type: 'local',
      localPath: './public'
    };
    const markdownSource = new DataSource(markdownSourceConfig);
    await markdownSource.initialize();
    
    try {
      // Process wiki files from public/wiki
      const wikiFiles = await markdownSource.listFiles('wiki', /\.md$/);
      for (const file of wikiFiles) {
        const content = await markdownSource.readFile(file);
        if (content) {
          const entry = await this.process(content, {} as ProcessorConfig);
          if (entry) entries.push(entry);
        }
      }
      
      // Process devlog files from public/devlogs
      const devlogFiles = await markdownSource.listFiles('devlogs', /\.md$/);
      for (const file of devlogFiles) {
        const content = await markdownSource.readFile(file);
        if (content) {
          // Update the path to match expected format
          content.path = content.path.replace('devlogs', 'dev_logs');
          const entry = await this.process(content, {} as ProcessorConfig);
          if (entry) entries.push(entry);
        }
      }
      
      // NOTE: We intentionally DO NOT read from the source parameter
      // Markdown files should ONLY come from local public folder
    } finally {
      await markdownSource.cleanup();
    }
    
    return entries;
  }
}