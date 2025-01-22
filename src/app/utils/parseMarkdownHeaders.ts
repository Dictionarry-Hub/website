// utils/parseMarkdownHeaders.ts
interface Header {
  id: string;
  text: string;
  level: number;
}

function createUrlId(text: string): string {
  // Convert to lowercase and normalize spaces
  const normalizedText = text.toLowerCase().trim();

  // Replace any special characters and spaces with dashes
  const id = normalizedText
    .replace(/[^a-z0-9-\s]/g, "") // Remove special chars except spaces and dashes
    .replace(/\s+/g, "-") // Replace spaces with single dash
    .replace(/-+/g, "-"); // Replace multiple dashes with single dash

  console.debug(`Creating ID from "${text}" -> "${id}"`);
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
  try {
    while ((match = headerRegex.exec(markdown)) !== null) {
      const level = match[1].length; // Number of # symbols
      const text = match[2].trim();
      const id = createUrlId(text);

      headers.push({ id, text, level });
      console.debug(
        `Found header: Level ${level}, Text: "${text}", ID: "${id}"`
      );
    }
  } catch (error) {
    console.error("Error parsing markdown headers:", error);
  }

  return headers;
}

// Export the createUrlId function for consistent ID generation
export { createUrlId };
