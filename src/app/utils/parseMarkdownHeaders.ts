// utils/parseMarkdownHeaders.ts
interface Header {
  id: string;
  text: string;
  level: number;
}

export function createUrlId(text: string): string {
  // Convert to lowercase and normalize spaces
  const normalizedText = text.toLowerCase().trim();

  // Replace any special characters and spaces with dashes
  const id = normalizedText
    .replace(/[^a-z0-9-\s]/g, "") // Remove special chars except spaces and dashes
    .replace(/\s+/g, "-") // Replace spaces with single dash
    .replace(/-+/g, "-"); // Replace multiple dashes with single dash

  return id;
}

export function parseMarkdownHeaders(markdown: string): Header[] {
  // Match all headers (# Header, ## Header, etc.)
  const headerRegex = /^(#{1,6})\s+(.+)$/gm;
  const headers: Header[] = [];

  if (!markdown) {
    console.warn("No markdown content provided to parseMarkdownHeaders");
    return headers;
  }

  let match;
  while ((match = headerRegex.exec(markdown)) !== null) {
    const level = match[1].length; // Number of # symbols
    const text = match[2].trim();
    const id = createUrlId(text);

    headers.push({ id, text, level });
  }

  return headers;
}
