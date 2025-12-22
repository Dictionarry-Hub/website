#!/usr/bin/env node

import { parseArgs } from 'util';
import { DataSource } from './contentGeneration/core/DataSource';
import { DatabaseBuilder } from './contentGeneration/core/DatabaseBuilder';
import { DataSourceConfig, ContentEntry } from './contentGeneration/core/types';

// Import all processors
import { RegexPatternProcessor } from './contentGeneration/processors/RegexPatternProcessor';
import { CustomFormatProcessor } from './contentGeneration/processors/CustomFormatProcessor';
import { QualityProfileProcessor } from './contentGeneration/processors/QualityProfileProcessor';
import { MediaManagementProcessor } from './contentGeneration/processors/MediaManagementProcessor';
import { MarkdownProcessor } from './contentGeneration/processors/MarkdownProcessor';
import { StaticPageProcessor } from './contentGeneration/processors/StaticPageProcessor';
import { RssGenerator } from './contentGeneration/core/RssGenerator';

interface CliOptions {
  repo?: string;
  branch?: string;
  token?: string;
  output?: string;
  cache?: boolean;
  cacheDir?: string;
  verbose?: boolean;
  debug?: boolean;
  only?: string[];
  help?: boolean;
}

function showHelp() {
  console.log(`
Content Database Generator

Usage: npm run generate:content -- [options]

Options:
  --repo <url>      GitHub repository URL to fetch content from
  --branch <name>   Branch to use (default: main)
  --token <token>   GitHub token for private repositories
  --output <path>   Output path for generated database (default: ./src/generated/contentDatabase.ts)
  --cache           Cache repository for faster subsequent runs
  --cache-dir <dir> Directory for cache storage (default: /tmp/dictionarry-cache)
  --verbose         Show detailed output
  --debug           Enable debug mode with extra logging
  --only <types>    Process only specific content types (comma-separated)
                    Available: regex, custom-formats, quality-profiles, media-management, markdown, static
  --help            Show this help message

Examples:
  # Generate from local files (default)
  npm run generate:content

  # Generate from GitHub repository
  npm run generate:content -- --repo https://github.com/user/repo --branch main

  # Generate only specific types with caching
  npm run generate:content -- --repo https://github.com/user/repo --cache --only regex,custom-formats

  # Use with private repository
  npm run generate:content -- --repo https://github.com/user/private-repo --token ghp_xxxx
`);
}

async function main() {
  try {
    // Parse command line arguments
    const { values } = parseArgs({
      args: process.argv.slice(2),
      options: {
        repo: { type: 'string' },
        branch: { type: 'string' },
        token: { type: 'string' },
        output: { type: 'string' },
        cache: { type: 'boolean' },
        'cache-dir': { type: 'string' },
        verbose: { type: 'boolean' },
        debug: { type: 'boolean' },
        only: { type: 'string' },
        help: { type: 'boolean' }
      }
    });

    const options = values as CliOptions & { 'cache-dir'?: string };
    options.cacheDir = options['cache-dir'];

    if (options.help) {
      showHelp();
      process.exit(0);
    }

    console.log('🔨 Starting content database generation...');
    
    // Configure data source
    const sourceConfig: DataSourceConfig = {
      type: options.repo ? 'github' : 'local',
      repo: options.repo,
      branch: options.branch || 'main',
      token: options.token,
      localPath: './public/database',
      cache: options.cache,
      cacheDir: options.cacheDir || '/tmp/dictionarry-cache'
    };

    if (options.verbose) {
      console.log('📋 Configuration:', sourceConfig);
    }

    // Initialize data source
    const dataSource = new DataSource(sourceConfig);
    await dataSource.initialize();

    // Count files in repository for validation
    const fileCounts: Record<string, number> = {
      'regex_patterns': (await dataSource.listFiles('regex_patterns', /\.ya?ml$/)).length,
      'custom_formats': (await dataSource.listFiles('custom_formats', /\.ya?ml$/)).length,
      'profiles': (await dataSource.listFiles('profiles', /\.ya?ml$/)).length,
      'media_management': (await dataSource.listFiles('media_management', /\.ya?ml$/)).length,
      'wiki': (await dataSource.listFiles('wiki', /\.md$/)).length,
      'dev_logs': (await dataSource.listFiles('dev_logs', /\.md$/)).length
    };

    const totalExpectedFiles = Object.values(fileCounts).reduce((sum, count) => sum + count, 0);
    
    if (options.verbose) {
      console.log('📂 Repository file counts:');
      for (const [dir, count] of Object.entries(fileCounts)) {
        if (count > 0) {
          console.log(`  • ${dir}: ${count} files`);
        }
      }
      console.log(`  • Total: ${totalExpectedFiles} files`);
    }

    // Initialize processors
    const processors = [
      new RegexPatternProcessor(),
      new CustomFormatProcessor(),
      new QualityProfileProcessor(),
      new MediaManagementProcessor(),
      new MarkdownProcessor(),
      new StaticPageProcessor()
    ];

    // Filter processors if --only is specified
    let activeProcessors = processors;
    if (options.only) {
      const onlyTypes = options.only.split(',').map(t => t.trim().toLowerCase());
      const typeMap: Record<string, string> = {
        'regex': 'regex-pattern',
        'custom-formats': 'custom-format',
        'quality-profiles': 'quality-profile',
        'media-management': 'media-management',
        'markdown': 'markdown',
        'static': 'static'
      };
      
      const processorNames = onlyTypes.map(t => typeMap[t] || t);
      activeProcessors = processors.filter(p => processorNames.includes(p.name));
      
      console.log(`📦 Processing only: ${activeProcessors.map(p => p.name).join(', ')}`);
    }

    // Process all content
    const allEntries: ContentEntry[] = [];
    const errors: Array<{ processor: string; error: string }> = [];

    for (const processor of activeProcessors) {
      try {
        if (options.verbose) {
          console.log(`  ⚙️  Processing ${processor.name}...`);
        }

        const entries = await processor.processAll(dataSource);
        allEntries.push(...entries);

        if (options.debug) {
          console.log(`    ✓ Found ${entries.length} ${processor.name} entries`);
        }
      } catch (error: any) {
        const errorMsg = `Failed to process ${processor.name}: ${error.message}`;
        console.error(`    ✗ ${errorMsg}`);
        errors.push({ processor: processor.name, error: error.message });
        
        if (options.debug) {
          console.error(error.stack);
        }
      }
    }

    // Run post-processing
    console.log('🔄 Running post-processing...');
    for (const processor of activeProcessors) {
      if (processor.postProcess) {
        try {
          const processorEntries = allEntries.filter(e => e.type === processor.name || e.category === processor.name);
          await processor.postProcess(processorEntries, allEntries);
        } catch (error: any) {
          console.warn(`  ⚠️  Post-processing failed for ${processor.name}: ${error.message}`);
        }
      }
    }

    // Build database
    console.log('🏗️  Building database...');
    const databaseBuilder = new DatabaseBuilder();
    const database = databaseBuilder.build(allEntries);
    
    // Add metadata
    database.metadata = {
      source: sourceConfig.repo || 'local',
      branch: sourceConfig.branch || 'main',
      timestamp: new Date().toISOString(),
      entriesCount: allEntries.length
    };

    // Write output
    const outputPath = options.output || './src/generated/contentDatabase.ts';
    console.log(`💾 Writing database to ${outputPath}...`);
    await databaseBuilder.write(database, outputPath);

    // Generate RSS feeds
    console.log('📰 Generating RSS feeds...');
    const rssGenerator = new RssGenerator();
    const rssStats = rssGenerator.generate(allEntries);
    console.log(`  • wiki.xml: ${rssStats.wiki} entries`);
    console.log(`  • devlogs.xml: ${rssStats.devlogs} entries`);
    console.log(`  • all.xml: ${rssStats.all} entries`);

    // Display statistics
    const stats = databaseBuilder.getStats(database);
    console.log('\n✅ Content database generated successfully!');
    console.log('📊 Statistics:');
    console.log(`  • Total entries: ${stats.totalEntries}`);
    console.log(`  • By type:`);
    for (const [type, count] of Object.entries(stats.byType)) {
      console.log(`    - ${type}: ${count}`);
    }
    console.log(`  • Categories: ${database.categories.join(', ')}`);
    console.log(`  • Search index: ${stats.searchStats.uniqueTerms} unique terms`);

    if (errors.length > 0) {
      console.log('\n⚠️  Errors encountered:');
      for (const error of errors) {
        console.log(`  • ${error.processor}: ${error.error}`);
      }
    }

    // Cleanup
    await dataSource.cleanup();

  } catch (error: any) {
    console.error('❌ Fatal error:', error.message);
    if (process.argv.includes('--debug')) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { main as generateContentDatabase };