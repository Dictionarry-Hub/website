<script>
  import { User, Calendar } from 'lucide-svelte';
  export let entry;

  function formatDate(dateString) {
    if (!dateString) return 'Unknown date';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function extractTextSnippet(html, maxLength = 200) {
    if (!html) return '';
    
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Get text content and clean it up
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    // Remove extra whitespace and truncate
    const cleanText = textContent.replace(/\s+/g, ' ').trim();
    
    if (cleanText.length <= maxLength) {
      return cleanText;
    }
    
    // Truncate at word boundary
    const truncated = cleanText.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  }
</script>

<article class="relative pb-2 group">
  <!-- Content -->
  <a href="#{entry.path}" class="block bg-white dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700/50 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
      <h2 class="text-lg font-semibold text-neutral-800 dark:text-white mb-2 sm:mb-0">
        {entry.title}
      </h2>
      <div class="flex flex-col items-start sm:items-end text-xs text-neutral-500 dark:text-neutral-400 space-y-1 flex-shrink-0 sm:pl-4">
        <div class="flex items-center">
          <Calendar class="w-3.5 h-3.5 mr-1.5" />
          <time datetime={entry.frontmatter?.created}>
            {formatDate(entry.frontmatter?.created)}
          </time>
        </div>
        {#if entry.frontmatter?.author}
          <div class="flex items-center">
            <User class="w-3.5 h-3.5 mr-1.5" />
            <span>{entry.frontmatter.author}</span>
          </div>
        {/if}
      </div>
    </div>

    {#if entry.html}
      <div class="hidden sm:block text-neutral-600 dark:text-neutral-300 mb-4">
        <p class="text-sm leading-relaxed">
          {extractTextSnippet(entry.html)}
        </p>
      </div>
    {/if}
    
    {#if entry.frontmatter?.tags && entry.frontmatter.tags.length > 0}
      <div class="flex flex-wrap gap-2">
        {#each entry.frontmatter.tags as tag}
          <span class="px-2.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs rounded-full font-medium">
            {tag}
          </span>
        {/each}
      </div>
    {/if}
  </a>
</article>
