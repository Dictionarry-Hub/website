import { ContentEntry, ContentProcessor } from '../core/types';
import { DataSource } from '../core/DataSource';
import { slugify, sanitizeForSearch } from '../utils/text';

export class StaticPageProcessor extends ContentProcessor {
  name = 'static';
  supportedPaths = [];

  canProcess(path: string): boolean {
    return false; // Static pages don't process files
  }

  async process(): Promise<ContentEntry | null> {
    return null; // Not used for static pages
  }

  async processAll(source: DataSource): Promise<ContentEntry[]> {
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
}