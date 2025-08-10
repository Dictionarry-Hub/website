import * as path from 'path';
import * as yaml from 'js-yaml';
import { ContentEntry, RawContent, ProcessorConfig, ContentProcessor } from '../core/types';
import { DataSource } from '../core/DataSource';
import { slugify, sanitizeForSearch } from '../utils/text';

export class CustomFormatProcessor extends ContentProcessor {
  name = 'custom-format';
  supportedPaths = ['custom_formats'];

  canProcess(path: string): boolean {
    return path.includes('custom_formats') && (path.endsWith('.yml') || path.endsWith('.yaml'));
  }

  async process(content: RawContent, config: ProcessorConfig): Promise<ContentEntry | null> {
    try {
      const data = yaml.load(content.content) as any;
      const filename = path.basename(content.path);
      const slug = slugify(filename.replace(/\.ya?ml$/, ''));
      
      const title = data.name || filename.replace(/\.ya?ml$/, '').replace(/[-_]/g, ' ');
      const description = data.description || '';
      const tags = [...(data.tags || []), 'custom-format'];
      
      const searchContent = `${title} ${description} custom format ${JSON.stringify(data.specifications || [])}`;
      
      return {
        id: `custom-format-${slug}`,
        path: `/custom-format/${slug}`,
        type: 'custom-format',
        slug,
        category: 'custom-format',
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
      console.warn(`Error processing custom format ${content.path}:`, error.message);
      return null;
    }
  }

  async processAll(source: DataSource): Promise<ContentEntry[]> {
    const entries: ContentEntry[] = [];
    const files = await source.listFiles('custom_formats', /\.ya?ml$/);
    
    // Batch fetch commit logs for all files (get all commits)
    const commitLogs = await source.getFileCommitLogs(files);
    
    for (const file of files) {
      const content = await source.readFile(file);
      if (content) {
        const entry = await this.process(content, {} as ProcessorConfig);
        if (entry) {
          // Add commit log if available
          const commitLog = commitLogs.get(file);
          if (commitLog) {
            entry.commitLog = commitLog;
          }
          entries.push(entry);
        }
      }
    }
    
    return entries;
  }

  async postProcess(entries: ContentEntry[], allEntries: ContentEntry[]): Promise<void> {
    // Find all quality profiles
    const qualityProfiles = allEntries.filter(e => e.type === 'quality-profile');
    
    // Create a map to track which profiles reference each custom format
    const formatReferences = new Map<string, Array<{
      title: string;
      slug: string;
      score: number;
    }>>();
    
    for (const profile of qualityProfiles) {
      if (profile.data?.custom_formats) {
        for (const formatRef of profile.data.custom_formats) {
          // Find the custom format entry that matches this format name
          const formatEntry = entries.find(e => 
            e.type === 'custom-format' && 
            (e.data?.name === formatRef.name || e.title === formatRef.name)
          );
          
          if (formatEntry) {
            if (!formatReferences.has(formatEntry.id)) {
              formatReferences.set(formatEntry.id, []);
            }
            formatReferences.get(formatEntry.id)!.push({
              title: profile.title,
              slug: profile.slug,
              score: formatRef.score || 0
            });
          }
        }
      }
    }
    
    // Add the references to each custom format entry
    for (const entry of entries) {
      if (entry.type === 'custom-format') {
        const references = formatReferences.get(entry.id);
        if (references && references.length > 0) {
          // Sort by score descending
          references.sort((a, b) => b.score - a.score);
          entry.data = {
            ...entry.data,
            referencedBy: references
          };
        }
      }
    }
    
    // Log statistics
    const formatsWithReferences = Array.from(formatReferences.keys()).length;
    if (formatsWithReferences > 0) {
      console.log(`  🔗 Linked ${formatsWithReferences} custom formats to quality profiles`);
    }
  }
}