import * as fs from 'fs';
import * as path from 'path';
import { ContentEntry } from './types';

const BASE_URL = 'https://dictionarry.dev';
const SITE_TITLE = 'Dictionarry';
const SITE_DESCRIPTION = 'Guides, documentation, and development updates for the Dictionarry project';

export class RssGenerator {
  private outputDir: string;

  constructor(outputDir: string = './public/rss') {
    this.outputDir = outputDir;
  }

  private escapeXml(text: string | undefined): string {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  private toRfc822(date: string | Date): string {
    return new Date(date).toUTCString();
  }

  private generateItem(entry: ContentEntry): string {
    const title = this.escapeXml(entry.title || entry.frontmatter?.title || 'Untitled');
    const link = `${BASE_URL}${entry.path}`;
    const description = this.escapeXml(
      entry.frontmatter?.blurb || entry.description || ''
    );
    const pubDate = entry.frontmatter?.created
      ? this.toRfc822(entry.frontmatter.created)
      : this.toRfc822(new Date());
    const author = this.escapeXml(entry.frontmatter?.author || 'Dictionarry');
    const tags: string[] = entry.frontmatter?.tags || [];
    const categories = tags
      .map((tag: string) => `      <category>${this.escapeXml(tag)}</category>`)
      .join('\n');

    return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${author}</author>
${categories}
    </item>`;
  }

  private generateFeed(title: string, description: string, feedPath: string, entries: ContentEntry[]): string {
    const items = entries.map(e => this.generateItem(e)).join('\n');
    const lastBuildDate = this.toRfc822(new Date());

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${this.escapeXml(title)}</title>
    <link>${BASE_URL}</link>
    <description>${this.escapeXml(description)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}${feedPath}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
  }

  private getEntriesByCategory(entries: ContentEntry[], category: string): ContentEntry[] {
    return entries
      .filter(entry => entry.category === category)
      .filter(entry => entry.frontmatter?.created)
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter?.created || 0);
        const dateB = new Date(b.frontmatter?.created || 0);
        return dateB.getTime() - dateA.getTime();
      });
  }

  generate(entries: ContentEntry[]): { wiki: number; devlogs: number; all: number } {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    const wikiEntries = this.getEntriesByCategory(entries, 'wiki');
    const devlogEntries = this.getEntriesByCategory(entries, 'devlogs');

    const allEntries = [...wikiEntries, ...devlogEntries]
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter?.created || 0);
        const dateB = new Date(b.frontmatter?.created || 0);
        return dateB.getTime() - dateA.getTime();
      });

    const wikiFeed = this.generateFeed(
      `${SITE_TITLE} - Wiki`,
      'Guides and documentation from the Dictionarry wiki',
      '/rss/wiki.xml',
      wikiEntries
    );
    fs.writeFileSync(path.join(this.outputDir, 'wiki.xml'), wikiFeed);

    const devlogsFeed = this.generateFeed(
      `${SITE_TITLE} - Devlogs`,
      'Development updates and progress notes from the Dictionarry project',
      '/rss/devlogs.xml',
      devlogEntries
    );
    fs.writeFileSync(path.join(this.outputDir, 'devlogs.xml'), devlogsFeed);

    const allFeed = this.generateFeed(
      `${SITE_TITLE} - All Updates`,
      SITE_DESCRIPTION,
      '/rss/all.xml',
      allEntries
    );
    fs.writeFileSync(path.join(this.outputDir, 'all.xml'), allFeed);

    return {
      wiki: wikiEntries.length,
      devlogs: devlogEntries.length,
      all: allEntries.length
    };
  }
}
