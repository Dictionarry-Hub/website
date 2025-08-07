import * as path from 'path';
import * as yaml from 'js-yaml';
import { ContentEntry, RawContent, ProcessorConfig, ContentProcessor } from '../core/types';
import { DataSource } from '../core/DataSource';
import { slugify, sanitizeForSearch } from '../utils/text';

export class MediaManagementProcessor extends ContentProcessor {
  name = 'media-management';
  supportedPaths = ['media_management'];

  canProcess(path: string): boolean {
    return path.includes('media_management') && (path.endsWith('.yml') || path.endsWith('.yaml'));
  }

  async process(content: RawContent, config: ProcessorConfig): Promise<ContentEntry | null> {
    try {
      const data = yaml.load(content.content) as any;
      const filename = path.basename(content.path);
      const slug = slugify(filename.replace(/\.ya?ml$/, ''));
      
      // Set proper titles and descriptions based on file
      let title = data.name || filename.replace(/\.ya?ml$/, '').replace(/[-_]/g, ' ');
      let description = data.description || '';
      
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
      
      const searchContent = `${title} ${description} ${searchableContent} media management`;
      const tags = [...(data.tags || []), 'media-management', slug];
      
      return {
        id: `media-management-${slug}`,
        path: `/media-management/${slug}`,
        type: 'media-management',
        slug,
        category: 'media-management',
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
      console.warn(`Error processing media management ${content.path}:`, error.message);
      return null;
    }
  }

  async processAll(source: DataSource): Promise<ContentEntry[]> {
    const entries: ContentEntry[] = [];
    const files = await source.listFiles('media_management', /\.ya?ml$/);
    
    for (const file of files) {
      const content = await source.readFile(file);
      if (content) {
        const entry = await this.process(content, {} as ProcessorConfig);
        if (entry) entries.push(entry);
      }
    }
    
    return entries;
  }
}