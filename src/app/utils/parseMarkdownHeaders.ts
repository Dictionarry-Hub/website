// utils/parseMarkdownHeaders.ts
interface Header {
  id: string;
  text: string;
  level: number;
}

/**
 * Creates a URL-friendly ID from text
 * @param text The header text to convert to an ID
 * @returns A normalized ID string
 */
export function createUrlId(text: string): string {
  // Convert to lowercase and normalize spaces
  const normalizedText = text.toLowerCase().trim();

  // Replace any special characters and spaces with dashes
  const id = normalizedText
    .replace(/[^a-z0-9-\s]/g, "") // Remove special chars except spaces and dashes
    .replace(/\s+/g, "-") // Replace spaces with single dash
    .replace(/-+/g, "-") // Replace multiple dashes with single dash
    .replace(/^-|-$/g, ""); // Remove leading and trailing dashes

  return id || "section"; // Fallback ID if empty
}

/**
 * Parses markdown content to extract headers
 * @param markdown The markdown content to parse
 * @returns An array of header objects with id, text and level
 */
export function parseMarkdownHeaders(markdown: string): Header[] {
  if (!markdown) {
    console.warn("No markdown content provided to parseMarkdownHeaders");
    return [];
  }

  // Match all headers (# Header, ## Header, etc.)
  const headerRegex = /^(#{1,6})\s+(.+)$/gm;
  const headers: Header[] = [];

  let match;
  while ((match = headerRegex.exec(markdown)) !== null) {
    const level = match[1].length; // Number of # symbols
    const text = match[2].trim();
    const id = createUrlId(text);

    headers.push({ id, text, level });
  }

  return headers;
}