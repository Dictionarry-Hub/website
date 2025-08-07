import * as path from 'path';
import * as yaml from 'js-yaml';
import { ContentEntry, RawContent, ProcessorConfig, ContentProcessor } from '../core/types';
import { DataSource } from '../core/DataSource';
import { slugify, sanitizeForSearch } from '../utils/text';

export class QualityProfileProcessor extends ContentProcessor {
  name = 'quality-profile';
  supportedPaths = ['profiles'];

  canProcess(path: string): boolean {
    return path.includes('profiles') && (path.endsWith('.yml') || path.endsWith('.yaml'));
  }

  async process(content: RawContent, config: ProcessorConfig): Promise<ContentEntry | null> {
    try {
      const data = yaml.load(content.content) as any;
      const filename = path.basename(content.path);
      const slug = slugify(filename.replace(/\.ya?ml$/, ''));
      
      const title = data.name || filename.replace(/\.ya?ml$/, '').replace(/[-_]/g, ' ');
      const description = data.description || '';
      const tags = [...(data.tags || []), 'quality-profile'];
      
      const searchContent = `${title} ${description} quality profile ${JSON.stringify(data.formatItems || [])}`;
      
      return {
        id: `quality-profile-${slug}`,
        path: `/quality-profile/${slug}`,
        type: 'quality-profile',
        slug,
        category: 'quality-profile',
        title,
        description,
        data,
        searchText: sanitizeForSearch(searchContent),
        searchWeight: 0.9,
        tags,
        filename,
        lastModified: content.stats?.mtime || new Date().toISOString()
      };
    } catch (error: any) {
      console.warn(`Error processing quality profile ${content.path}:`, error.message);
      return null;
    }
  }

  async processAll(source: DataSource): Promise<ContentEntry[]> {
    const entries: ContentEntry[] = [];
    const files = await source.listFiles('profiles', /\.ya?ml$/);
    
    for (const file of files) {
      const content = await source.readFile(file);
      if (content) {
        const entry = await this.process(content, {} as ProcessorConfig);
        if (entry) entries.push(entry);
      }
    }
    
    return entries;
  }

  // Link custom formats to quality profiles
  async postProcess(entries: ContentEntry[], allEntries: ContentEntry[]): Promise<void> {
    const customFormatMap = new Map(
      allEntries
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
              slug: cfSlug,
              tags: customFormatEntry.data.tags || [],
              conditions: customFormatEntry.data.conditions || [],
              description: customFormatEntry.data.description || ''
            };
          }
          return cf;
        });
      }
    }
  }
}