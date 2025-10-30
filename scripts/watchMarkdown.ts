#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import chokidar from 'chokidar';
import { DataSource } from './contentGeneration/core/DataSource';
import { DatabaseBuilder } from './contentGeneration/core/DatabaseBuilder';
import { MarkdownProcessor } from './contentGeneration/processors/MarkdownProcessor';
import { ContentDatabase, ContentEntry } from './contentGeneration/core/types';

const WIKI_PATH = path.resolve('./public/wiki');
const DEVLOGS_PATH = path.resolve('./public/devlogs');
const OUTPUT_PATH = path.resolve('./src/generated/contentDatabase.ts');

let isRebuilding = false;
let pendingRebuild = false;

/**
 * Load the existing database from the generated file
 */
function loadExistingDatabase(): ContentDatabase | null {
  try {
    if (!fs.existsSync(OUTPUT_PATH)) {
      console.log('⚠️  No existing database found. Run `npm run db` first to create the initial database.');
      return null;
    }

    // Read the generated TypeScript file
    const content = fs.readFileSync(OUTPUT_PATH, 'utf-8');

    // Extract the JSON object from the TypeScript constant
    // The file format is: export const contentDatabase = {...} as const;
    const match = content.match(/export const contentDatabase = (\{[\s\S]*\}) as const;/);
    if (!match) {
      throw new Error('Could not parse existing database file');
    }

    // Parse the JSON (using eval is safe here since we control the source)
    const database = eval(`(${match[1]})`);
    return database as ContentDatabase;
  } catch (error: any) {
    console.error('❌ Error loading existing database:', error.message);
    return null;
  }
}

/**
 * Rebuild markdown entries and merge with existing database
 */
async function rebuildMarkdownEntries(existingDatabase: ContentDatabase): Promise<void> {
  if (isRebuilding) {
    pendingRebuild = true;
    return;
  }

  isRebuilding = true;
  const startTime = Date.now();

  try {
    console.log('\n🔄 Rebuilding markdown entries...');

    // Process markdown files
    const processor = new MarkdownProcessor();
    const dataSource = new DataSource({ type: 'local', localPath: './public' });
    await dataSource.initialize();

    const markdownEntries = await processor.processAll(dataSource);
    await dataSource.cleanup();

    // Filter out old markdown entries from the existing database
    const nonMarkdownEntries = existingDatabase.entries.filter(
      entry => entry.type !== 'markdown'
    );

    // Merge old non-markdown entries with new markdown entries
    const allEntries = [...nonMarkdownEntries, ...markdownEntries];

    // Rebuild database
    const databaseBuilder = new DatabaseBuilder();
    const database = databaseBuilder.build(allEntries);

    // Preserve metadata from existing database, update timestamp
    database.metadata = {
      ...existingDatabase.metadata,
      timestamp: new Date().toISOString(),
      entriesCount: allEntries.length
    };

    // Write updated database
    await databaseBuilder.write(database, OUTPUT_PATH);

    const duration = Date.now() - startTime;
    const stats = databaseBuilder.getStats(database);

    console.log(`✅ Markdown entries rebuilt in ${duration}ms`);
    console.log(`📊 Stats: ${stats.byType['markdown'] || 0} markdown entries (${stats.totalEntries} total)`);

  } catch (error: any) {
    console.error('❌ Error rebuilding markdown:', error.message);
  } finally {
    isRebuilding = false;

    // If another change occurred while we were rebuilding, trigger another rebuild
    if (pendingRebuild) {
      pendingRebuild = false;
      setTimeout(() => rebuildMarkdownEntries(existingDatabase), 100);
    }
  }
}

/**
 * Main watch function
 */
async function watchMarkdown() {
  console.log('👁️  Starting markdown watcher...');
  console.log(`📂 Watching directories:`);
  console.log(`   • ${WIKI_PATH}`);
  console.log(`   • ${DEVLOGS_PATH}`);
  console.log();

  // Load existing database
  const existingDatabase = loadExistingDatabase();
  if (!existingDatabase) {
    console.log('💡 Run `npm run db` to create the initial database, then restart the watcher.');
    process.exit(1);
  }

  console.log('✅ Loaded existing database');
  console.log(`   • Total entries: ${existingDatabase.entries.length}`);
  console.log(`   • Markdown entries: ${existingDatabase.entries.filter(e => e.type === 'markdown').length}`);
  console.log();

  // Set up file watcher
  const watcher = chokidar.watch([WIKI_PATH, DEVLOGS_PATH], {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 300,
      pollInterval: 100
    }
  });

  // Handle file changes
  watcher.on('add', (filePath) => {
    console.log(`📄 New file detected: ${path.relative(process.cwd(), filePath)}`);
    rebuildMarkdownEntries(existingDatabase);
  });

  watcher.on('change', (filePath) => {
    console.log(`📝 File changed: ${path.relative(process.cwd(), filePath)}`);
    rebuildMarkdownEntries(existingDatabase);
  });

  watcher.on('unlink', (filePath) => {
    console.log(`🗑️  File deleted: ${path.relative(process.cwd(), filePath)}`);
    rebuildMarkdownEntries(existingDatabase);
  });

  watcher.on('error', (error) => {
    console.error('❌ Watcher error:', error);
  });

  console.log('👀 Watching for changes... (Press Ctrl+C to stop)');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  watchMarkdown().catch(console.error);
}

export { watchMarkdown };
