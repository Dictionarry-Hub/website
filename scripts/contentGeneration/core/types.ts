export interface ContentEntry {
  id: string;
  path: string;
  type: 'quality-profile' | 'custom-format' | 'regex-pattern' | 'media-management' | 'markdown' | 'static';
  slug: string;
  category: string;
  
  title: string;
  description?: string;
  data?: any;
  frontmatter?: any;
  blocks?: any[];
  markdown?: string;
  
  navigation?: (string | NavigationItem)[];
  
  searchText: string;
  searchWeight: number;
  tags: string[];
  
  filename?: string;
  lastModified?: string;
}

export interface NavigationItem {
  title?: string;
  children?: (string | NavigationItem)[];
  level?: number;
}

export interface ContentDatabase {
  entries: ContentEntry[];
  routeMap: Record<string, ContentEntry>;
  searchIndex: {
    terms: Record<string, string[]>;
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

export interface DataSourceConfig {
  type: 'local' | 'github';
  repo?: string;
  branch?: string;
  token?: string;
  localPath?: string;
  cache?: boolean;
  cacheDir?: string;
  verbose?: boolean;
}

export interface ProcessorConfig {
  source: DataSourceConfig;
  outputPath: string;
  verbose?: boolean;
  debug?: boolean;
  only?: string[];
}

export interface RawContent {
  path: string;
  content: string;
  stats?: {
    size: number;
    mtime: string;
  };
}

export interface ProcessorResult {
  entries: ContentEntry[];
  errors: ProcessorError[];
  warnings: string[];
}

export interface ProcessorError {
  processor: string;
  file: string;
  error: string;
  stack?: string;
}

export abstract class ContentProcessor {
  abstract name: string;
  abstract supportedPaths: string[];
  
  abstract canProcess(path: string): boolean;
  abstract process(content: RawContent, config: ProcessorConfig): Promise<ContentEntry | null>;
  
  async postProcess?(entries: ContentEntry[], allEntries: ContentEntry[]): Promise<void>;
}