// utils/parseMarkdownHeaders.ts
interface Header {
  id: string;
  text: string;
  level: number;
}

export function parseMarkdownHeaders(markdown: string): Header[] {
  // Match all headers (# Header, ## Header, etc.)
  const headerRegex = /^(#{1,6})\s+(.+)$/gm;
  const headers: Header[] = [];
  let match;

  while ((match = headerRegex.exec(markdown)) !== null) {
    const level = match[1].length; // Number of # symbols
    const text = match[2].trim();
    // Create URL-friendly id from header text
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    headers.push({ id, text, level });
  }

  return headers;
}
