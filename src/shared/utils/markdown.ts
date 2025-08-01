export function parseMarkdown(text: string): string {
  if (!text) return '';
  
  return text
    // Convert line breaks to <br>
    .replace(/\n/g, '<br>')
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-neutral-900 dark:text-white">$1</strong>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links - using inline styles to avoid CSS issues
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 underline hover:no-underline transition-all">$1</a>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm">$1</code>');
}