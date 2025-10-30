import { marked } from 'marked';

// Configure marked globally for consistent processing
marked.use({
  gfm: true,
  breaks: false,
  pedantic: false
});

// Block types
export type Block =
  | ParagraphBlock
  | HeaderBlock
  | CodeBlock
  | TableBlock
  | MathBlock
  | ListBlock
  | BlockquoteBlock
  | FootnoteBlock
  | ImageBlock
  | VideoBlock
  | HorizontalRuleBlock;

interface ParagraphBlock {
  type: 'paragraph';
  content: string;
}

interface ImageBlock {
  type: 'image';
  src: string;
  alt?: string;
  variants?: {
    light?: string;
    dark?: string;
  };
}

interface VideoBlock {
  type: 'video';
  src: string;
  description?: string;
}

interface HorizontalRuleBlock {
  type: 'horizontal-rule';
}

interface HeaderBlock {
  type: 'header';
  level: number;
  text: string;
  id: string;
}

interface CodeBlock {
  type: 'code';
  language: string;
  code: string;
}

interface TableBlock {
  type: 'table';
  headers: string[];
  rows: string[][];
}

interface MathBlock {
  type: 'math';
  display: boolean; // true for block, false for inline
  content: string;
}

interface ListItem {
  content: string;
  children?: ListItem[];
}

interface ListBlock {
  type: 'list';
  ordered: boolean;
  items: ListItem[];
}

interface BlockquoteBlock {
  type: 'blockquote';
  content: string;
}

interface FootnoteBlock {
  type: 'footnote';
  id: string;
  content: string;
}

export interface ParsedContent {
  blocks: Block[];
  navigation: (string | NavigationItem)[];
}

interface NavigationItem {
  title: string;
  children?: (string | NavigationItem)[];
}

// Main parser function
export function parseMarkdown(markdown: string): ParsedContent {
  const lines = markdown.split('\n');
  const blocks: Block[] = [];
  const headers: { title: string; level: number }[] = [];
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    
    // Skip empty lines
    if (!line.trim()) {
      i++;
      continue;
    }
    
    // Check for math blocks
    if (line.trim().startsWith('$$')) {
      const result = parseMathBlock(lines, i);
      blocks.push(result.block);
      i = result.nextIndex;
      continue;
    }
    
    // Check for code blocks
    if (line.trim().startsWith('```')) {
      const result = parseCodeBlock(lines, i);
      blocks.push(result.block);
      i = result.nextIndex;
      continue;
    }
    
    // Check for tables
    if (isTableStart(lines, i)) {
      const result = parseTable(lines, i);
      blocks.push(result.block);
      i = result.nextIndex;
      continue;
    }
    
    // Check for headers
    if (line.match(/^#{1,6}\s+/)) {
      const result = parseHeader(line);
      headers.push({ title: result.block.text, level: result.block.level });
      blocks.push(result.block);
      i++;
      continue;
    }
    
    // Check for lists
    if (line.match(/^[\*\-\+]\s+/) || line.match(/^\d+\.\s+/)) {
      const result = parseList(lines, i);
      blocks.push(result.block);
      i = result.nextIndex;
      continue;
    }
    
    // Check for blockquotes
    if (line.startsWith('>')) {
      const result = parseBlockquote(lines, i);
      blocks.push(result.block);
      i = result.nextIndex;
      continue;
    }
    
    // Check for footnotes
    if (line.match(/^\[\^[\w\d]+\]:/)) {
      const result = parseFootnote(lines, i);
      blocks.push(result.block);
      i = result.nextIndex;
      continue;
    }
    
    // Check for horizontal rule (---, ***, ___)
    if (line.match(/^[\s]*(?:---+|___+|\*\*\*+)[\s]*$/)) {
      blocks.push({ type: 'horizontal-rule' });
      i++;
      continue;
    }
    
    // Check for videos (must check before images since videos use image syntax)
    if (line.startsWith('![video]')) {
      const result = parseVideo(lines, i);
      if (result.block) {
        blocks.push(result.block);
        i = result.nextIndex;
        continue;
      }
    }

    // Check for images
    if (line.startsWith('![')) {
      const result = parseImage(lines, i);
      if (result.block) {
        blocks.push(result.block);
        i = result.nextIndex;
        continue;
      }
    }
    
    // Parse as paragraph
    const result = parseParagraph(lines, i);
    blocks.push(result.block);
    i = result.nextIndex;
  }
  
  // Build navigation from headers
  const navigation = headers.length === 0 
    ? ['Overview'] 
    : buildNavigation(headers);
  
  return {
    blocks,
    navigation
  };
}

// Parse math block ($$...$$)
function parseMathBlock(lines: string[], startIndex: number): { block: MathBlock; nextIndex: number } {
  const endIndex = findClosingDelimiter(lines, startIndex, '$$');
  // Preserve the exact content including line breaks and formatting
  const mathContent = lines.slice(startIndex + 1, endIndex).join('\n');
  
  return {
    block: {
      type: 'math',
      display: true,
      content: mathContent
    },
    nextIndex: endIndex + 1
  };
}

// Parse code block with language
function parseCodeBlock(lines: string[], startIndex: number): { block: CodeBlock; nextIndex: number } {
  const openingLine = lines[startIndex];
  const language = openingLine.slice(3).trim() || 'plaintext';
  const endIndex = findClosingDelimiter(lines, startIndex, '```');
  
  const codeLines = lines.slice(startIndex + 1, endIndex);
  const code = codeLines.join('\n');
  
  return {
    block: {
      type: 'code',
      language,
      code
    },
    nextIndex: endIndex + 1
  };
}

// Parse table
function parseTable(lines: string[], startIndex: number): { block: TableBlock; nextIndex: number } {
  const headers: string[] = [];
  const rows: string[][] = [];
  
  let i = startIndex;
  
  // Parse header row
  if (lines[i].includes('|')) {
    headers.push(...parseTableRow(lines[i]));
    i++;
  }
  
  // Skip separator row (|---|---|)
  if (lines[i] && lines[i].match(/^\|?\s*:?-+:?\s*\|/)) {
    i++;
  }
  
  // Parse data rows
  while (i < lines.length && lines[i].includes('|')) {
    rows.push(parseTableRow(lines[i]));
    i++;
  }
  
  return {
    block: {
      type: 'table',
      headers,
      rows
    },
    nextIndex: i
  };
}

// Parse a single table row
function parseTableRow(line: string): string[] {
  return line
    .split('|')
    .map(cell => {
      const trimmed = cell.trim();
      // Process inline markdown in table cells (bold, italic, links, etc.)
      return trimmed ? processInlineElements(trimmed) : '';
    })
    .filter((cell, index, arr) => {
      // Remove empty first and last elements from pipe delimiters
      return !(index === 0 && cell === '') && !(index === arr.length - 1 && cell === '');
    });
}

// Parse header
function parseHeader(line: string): { block: HeaderBlock } {
  const match = line.match(/^(#{1,6})\s+(.+)$/);
  if (!match) {
    return {
      block: {
        type: 'header',
        level: 1,
        text: line,
        id: sanitizeForAnchor(line)
      }
    };
  }
  
  const level = match[1].length;
  const text = match[2].trim();
  const id = sanitizeForAnchor(text);
  
  return {
    block: {
      type: 'header',
      level,
      text,
      id
    }
  };
}

// Parse list with support for nested lists
function parseList(lines: string[], startIndex: number): { block: ListBlock; nextIndex: number } {
  const firstLine = lines[startIndex];
  const ordered = /^\d+\.\s+/.test(firstLine);
  const baseIndent = getIndentLevel(lines[startIndex]);
  
  const result = parseListItems(lines, startIndex, baseIndent, ordered);
  
  return {
    block: {
      type: 'list',
      ordered,
      items: result.items
    },
    nextIndex: result.nextIndex
  };
}

// Helper function to parse list items recursively
function parseListItems(
  lines: string[], 
  startIndex: number, 
  parentIndent: number,
  expectOrdered: boolean
): { items: ListItem[]; nextIndex: number } {
  const items: ListItem[] = [];
  let i = startIndex;
  
  while (i < lines.length) {
    const line = lines[i];
    const indent = getIndentLevel(line);
    
    // Check if we've gone back to parent level or less
    if (line.trim() && indent < parentIndent) {
      break;
    }
    
    // Empty line - check if list continues
    if (!line.trim()) {
      // Look ahead to see if list continues
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        const nextIndent = getIndentLevel(nextLine);
        if (nextIndent >= parentIndent && (
          nextLine.match(/^[\s]*[\*\-\+]\s+/) || 
          nextLine.match(/^[\s]*\d+\.\s+/)
        )) {
          i++;
          continue;
        }
      }
      // End of list
      i++;
      break;
    }
    
    // Check for list item at current indent level
    if (indent === parentIndent) {
      const unorderedMatch = line.match(/^[\s]*[\*\-\+]\s+(.+)/);
      const orderedMatch = line.match(/^[\s]*\d+\.\s+(.+)/);
      
      if ((expectOrdered && orderedMatch) || (!expectOrdered && unorderedMatch)) {
        const content = expectOrdered ? orderedMatch![1] : unorderedMatch![1];
        const item: ListItem = {
          content: processInlineElements(content)
        };
        
        // Look for nested list items
        i++;
        if (i < lines.length) {
          const nextIndent = getIndentLevel(lines[i]);
          if (nextIndent > parentIndent && (
            lines[i].match(/^[\s]*[\*\-\+]\s+/) || 
            lines[i].match(/^[\s]*\d+\.\s+/)
          )) {
            // Parse nested list
            const nestedOrdered = /^[\s]*\d+\.\s+/.test(lines[i]);
            const nested = parseListItems(lines, i, nextIndent, nestedOrdered);
            item.children = nested.items;
            i = nested.nextIndex;
          }
        }
        
        items.push(item);
      } else {
        // Not a list item at expected level
        break;
      }
    } else if (indent > parentIndent) {
      // This shouldn't happen if we're parsing correctly
      // Could be continuation text for previous item
      if (items.length > 0) {
        items[items.length - 1].content += ' ' + processInlineElements(line.trim());
      }
      i++;
    } else {
      // Less indented - end of this list level
      break;
    }
  }
  
  return { items, nextIndex: i };
}

// Helper function to get indentation level
function getIndentLevel(line: string): number {
  const match = line.match(/^(\s*)/);
  if (!match) return 0;
  
  const spaces = match[1];
  // Count spaces, treating tab as 2 spaces
  return spaces.split('').reduce((count, char) => {
    return count + (char === '\t' ? 2 : 1);
  }, 0);
}

// Parse blockquote
function parseBlockquote(lines: string[], startIndex: number): { block: BlockquoteBlock; nextIndex: number } {
  const contentLines: string[] = [];
  
  let i = startIndex;
  while (i < lines.length && lines[i].startsWith('>')) {
    const content = lines[i].replace(/^>\s?/, '');
    contentLines.push(content);
    i++;
  }
  
  // Process inline elements in the blockquote content
  const fullContent = contentLines.join(' ').trim();
  const processedContent = processInlineElements(fullContent);
  
  return {
    block: {
      type: 'blockquote',
      content: processedContent
    },
    nextIndex: i
  };
}

// Parse footnote
function parseFootnote(lines: string[], startIndex: number): { block: FootnoteBlock; nextIndex: number } {
  const line = lines[startIndex];
  const match = line.match(/^\[\^([\w\d]+)\]:\s*(.+)/);
  
  if (!match) {
    // Shouldn't happen but handle gracefully
    return {
      block: {
        type: 'footnote',
        id: 'unknown',
        content: line
      },
      nextIndex: startIndex + 1
    };
  }
  
  const id = match[1];
  const content = match[2];
  
  // Process inline elements in the footnote content
  const processedContent = processInlineElements(content);
  
  return {
    block: {
      type: 'footnote',
      id,
      content: processedContent
    },
    nextIndex: startIndex + 1
  };
}

// Parse video with support for various formats
function parseVideo(lines: string[], startIndex: number): { block: VideoBlock | null; nextIndex: number } {
  const line = lines[startIndex];

  // Match markdown syntax: ![video](path) or ![video](path "description")
  const videoMatch = line.match(/^!\[video\]\(([^")]+)(?:\s+"([^"]+)")?\)/);

  if (videoMatch) {
    let src = videoMatch[1].trim();
    const description = videoMatch[2];

    // If path doesn't start with http or /, assume it's in public/video folder
    if (!src.startsWith('http') && !src.startsWith('/')) {
      // Check if it's a video file
      if (src.match(/\.(mp4|mkv|webm|mov|avi)$/i)) {
        src = `/video/${src}`;
      }
    }

    return {
      block: {
        type: 'video',
        src,
        description
      },
      nextIndex: startIndex + 1
    };
  }

  return { block: null, nextIndex: startIndex + 1 };
}

// Parse image with support for light/dark variants
function parseImage(lines: string[], startIndex: number): { block: ImageBlock | null; nextIndex: number } {
  const line = lines[startIndex];
  
  // Match custom syntax: ![alt text](path[style=light|dark])
  const variantMatch = line.match(/^!\[([^\]]*)\]\(([^[]+)\[style=(light|dark)\]\)/);
  if (variantMatch) {
    const alt = variantMatch[1];
    const basePath = variantMatch[2];
    const style = variantMatch[3];
    
    // Check if next line has the opposite variant
    let variants: { light?: string; dark?: string } = {};
    let nextIndex = startIndex + 1;
    
    if (style === 'light') {
      variants.light = basePath;
      // Look for dark variant on next line
      if (nextIndex < lines.length) {
        const nextLine = lines[nextIndex];
        const darkMatch = nextLine.match(/^!\[([^\]]*)\]\(([^[]+)\[style=dark\]\)/);
        if (darkMatch && darkMatch[2] === basePath) {
          variants.dark = basePath;
          nextIndex++;
        }
      }
    } else if (style === 'dark') {
      variants.dark = basePath;
      // Look for light variant on next line
      if (nextIndex < lines.length) {
        const nextLine = lines[nextIndex];
        const lightMatch = nextLine.match(/^!\[([^\]]*)\]\(([^[]+)\[style=light\]\)/);
        if (lightMatch && lightMatch[2] === basePath) {
          variants.light = basePath;
          nextIndex++;
        }
      }
    }
    
    // Build the actual file paths
    const extension = basePath.match(/\.(svg|png|jpg|jpeg|gif|webp)$/i)?.[1] || 'svg';
    const baseFileName = basePath.replace(/\.(svg|png|jpg|jpeg|gif|webp)$/i, '');
    
    if (variants.light) {
      variants.light = `/svg/${baseFileName}[style=light].${extension}`;
    }
    if (variants.dark) {
      variants.dark = `/svg/${baseFileName}[style=dark].${extension}`;
    }
    
    return {
      block: {
        type: 'image',
        src: variants.light || variants.dark || `/svg/${basePath}`,
        alt,
        variants
      },
      nextIndex
    };
  }
  
  // Match standard markdown image syntax: ![alt text](path)
  // But exclude ![video](...) which should be handled by parseVideo
  const standardMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
  if (standardMatch) {
    const alt = standardMatch[1];

    // Skip if this is a video block (should be handled by parseVideo)
    if (alt.toLowerCase() === 'video') {
      return { block: null, nextIndex: startIndex + 1 };
    }

    let src = standardMatch[2];
    
    // If path doesn't start with http or /, assume it's in public folder
    if (!src.startsWith('http') && !src.startsWith('/')) {
      // Check if it's an SVG or image file
      if (src.match(/\.(svg|png|jpg|jpeg|gif|webp)$/i)) {
        // Check if file likely exists in svg or images folder
        if (src.includes('svg') || src.endsWith('.svg')) {
          src = `/svg/${src}`;
        } else {
          src = `/images/${src}`;
        }
      }
    }
    
    return {
      block: {
        type: 'image',
        src,
        alt
      },
      nextIndex: startIndex + 1
    };
  }
  
  return { block: null, nextIndex: startIndex + 1 };
}

// Parse paragraph
function parseParagraph(lines: string[], startIndex: number): { block: ParagraphBlock; nextIndex: number } {
  const paragraphLines: string[] = [];
  
  let i = startIndex;
  while (i < lines.length) {
    const line = lines[i];
    
    // Stop at special markers
    if (!line.trim() || 
        line.match(/^#{1,6}\s+/) ||
        line.trim().startsWith('```') ||
        line.trim().startsWith('$$') ||
        line.startsWith('>') ||
        line.match(/^[\*\-\+]\s+/) ||
        line.match(/^\d+\.\s+/) ||
        line.startsWith('![') ||
        line.match(/^[\s]*(?:---+|___+|\*\*\*+)[\s]*$/) ||
        isTableStart(lines, i)) {
      break;
    }
    
    paragraphLines.push(line);
    i++;
  }
  
  // Preserve line breaks - join with space but keep double line breaks
  const content = paragraphLines
    .map(line => line.trim())
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Process inline elements (links, bold, italic, inline math, etc.)
  const processedContent = processInlineElements(content);
  
  return {
    block: {
      type: 'paragraph',
      content: processedContent
    },
    nextIndex: i
  };
}

// Process inline elements in text
function processInlineElements(text: string): string {
  // Store math expressions to restore later
  const mathExpressions: string[] = [];
  
  // Replace inline math with numbered placeholders
  text = text.replace(/\$([^$]+)\$/g, (match, math) => {
    const index = mathExpressions.length;
    mathExpressions.push(math);
    // Use a placeholder that won't be interpreted as markdown
    return `MATHBLOCK${index}MATHBLOCK`;
  });
  
  // Handle inline images with light/dark variants
  text = text.replace(/!\[([^\]]*)\]\(([^[]+)\[style=(light|dark)\]\)/g, (match, alt, basePath, style) => {
    const extension = basePath.match(/\.(svg|png|jpg|jpeg|gif|webp)$/i)?.[1] || 'svg';
    const baseFileName = basePath.replace(/\.(svg|png|jpg|jpeg|gif|webp)$/i, '');
    const src = `/svg/${baseFileName}[style=${style}].${extension}`;
    
    return `<img src="${src}" alt="${alt}" data-variant="${style}" />`;
  });
  
  // Handle standard inline images
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    // If path doesn't start with http or /, assume it's in public folder
    if (!src.startsWith('http') && !src.startsWith('/')) {
      if (src.match(/\.(svg|png|jpg|jpeg|gif|webp)$/i)) {
        if (src.includes('svg') || src.endsWith('.svg')) {
          src = `/svg/${src}`;
        } else {
          src = `/images/${src}`;
        }
      }
    }
    return `<img src="${src}" alt="${alt}" />`;
  });
  
  // Handle footnote references [^1], [^2], etc.
  text = text.replace(/\[\^([\w\d]+)\]/g, (match, id) => {
    return `<sup><a href="#fn-${id}" class="footnote-ref">[${id}]</a></sup>`;
  });
  
  // Use marked for inline processing (bold, italic, links, etc.)
  const markedResult = marked.parseInline(text);
  
  // Handle async result if needed - parseInline can return string or Promise<string>
  let processed: string;
  if (typeof markedResult === 'string') {
    processed = markedResult;
  } else {
    // If parseInline returns a Promise, we can't use async here
    // Fall back to the original text with basic replacements
    processed = text
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  }
  
  // Restore math expressions
  mathExpressions.forEach((math, index) => {
    const placeholder = `MATHBLOCK${index}MATHBLOCK`;
    const replacement = `<math-inline>${math}</math-inline>`;
    // Use a loop to ensure all instances are replaced
    while (processed.includes(placeholder)) {
      processed = processed.replace(placeholder, replacement);
    }
  });
  
  return processed;
}

// Check if current position starts a table
function isTableStart(lines: string[], index: number): boolean {
  if (index >= lines.length) return false;
  
  const currentLine = lines[index];
  const nextLine = lines[index + 1];
  
  // Check if current line has pipes and next line is a separator
  return currentLine.includes('|') && 
         !!nextLine && 
         nextLine.match(/^\|?\s*:?-+:?\s*\|/) !== null;
}

// Find closing delimiter for blocks
function findClosingDelimiter(lines: string[], startIndex: number, delimiter: string): number {
  for (let i = startIndex + 1; i < lines.length; i++) {
    if (lines[i].trim().startsWith(delimiter)) {
      return i;
    }
  }
  return lines.length - 1;
}

// Build navigation from headers
function buildNavigation(headers: { title: string; level: number }[]): (string | NavigationItem)[] {
  const result: (string | NavigationItem)[] = [];
  const stack: { item: NavigationItem; level: number }[] = [];
  
  for (const header of headers) {
    while (stack.length > 0 && stack[stack.length - 1].level >= header.level) {
      stack.pop();
    }
    
    const currentIndex = headers.indexOf(header);
    const hasChildren = headers.slice(currentIndex + 1).some(h => h.level === header.level + 1);
    
    if (hasChildren) {
      const navItem: NavigationItem = {
        title: header.title,
        children: []
      };
      
      if (stack.length === 0) {
        result.push(navItem);
      } else {
        stack[stack.length - 1].item.children!.push(navItem);
      }
      
      stack.push({ item: navItem, level: header.level });
    } else {
      if (stack.length === 0) {
        result.push(header.title);
      } else {
        stack[stack.length - 1].item.children!.push(header.title);
      }
    }
  }
  
  return result;
}

// Utility function
function sanitizeForAnchor(text: string): string {
  return text
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}