<script>
  import { User, Calendar, ChevronDown, ChevronUp } from 'lucide-svelte';
  import { createEventDispatcher } from 'svelte';
  
  export let entry;
  export let isHighlighted = false;
  export let searchTerm = '';
  
  const dispatch = createEventDispatcher();
  
  let isExpanded = false;
  const DESCRIPTION_LIMIT = 400;
  
  // Highlight matching text
  function highlightMatch(text, term) {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark class="bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 px-0.5 py-0.5 rounded-sm font-medium">$1</mark>');
  }
  
  // Format date to be more concise
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }
  
  // Process markdown-like text for better rendering
  function processMarkdown(text) {
    if (!text) return '';
    
    const result = text
      // Headers (convert to proper block elements)
      .replace(/^### (.*$)/gm, '<div class="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">$1</div>')
      .replace(/^## (.*$)/gm, '<div class="font-bold text-neutral-900 dark:text-white mb-1">$1</div>')
      .replace(/^# (.*$)/gm, '<div class="font-bold text-lg text-neutral-900 dark:text-white mb-2">$1</div>')
      // Bold text **text** or __text__
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/__(.*?)__/g, '<strong class="font-semibold">$1</strong>')
      // Bold-italic combination ***text*** or ___text___
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-bold italic">$1</strong>')
      .replace(/_{3}(.*?)_{3}/g, '<strong class="font-bold italic">$1</strong>')
      // Italic text *text* or _text_ (but not if it's part of a bold)
      .replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em class="italic">$1</em>')
      .replace(/(?<!_)_([^_]+?)_(?!_)/g, '<em class="italic">$1</em>')
      // Strikethrough ~~text~~
      .replace(/~~(.*?)~~/g, '<del class="line-through text-neutral-500 dark:text-neutral-400">$1</del>')
      // Links [text](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      // Inline code `code`
      .replace(/`([^`]+)`/g, '<code class="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
      // Line breaks (convert double line breaks to paragraphs)
      .replace(/\n\n/g, '<br><br>')
      // Single line breaks
      .replace(/\n/g, '<br>');
    
    return result;
  }
  
  // Smart truncation that doesn't break markdown syntax
  function smartTruncate(text, limit) {
    if (!text || text.length <= limit) return text;
    
    let truncated = text.substring(0, limit);
    
    // Don't break markdown syntax - look for safe breaking points
    const unsafePatterns = [
      /\*\*[^*]*$/, // incomplete bold
      /_[^_]*$/, // incomplete italic  
      /`[^`]*$/, // incomplete code
      /\[[^\]]*$/, // incomplete link start
      /\([^)]*$/ // incomplete link url
    ];
    
    // If we're in the middle of markdown, back up to safe spot
    for (const pattern of unsafePatterns) {
      if (pattern.test(truncated)) {
        const match = truncated.match(pattern);
        if (match) {
          truncated = truncated.substring(0, match.index);
        }
      }
    }
    
    // Look for sentence endings within last 50 characters
    const sentenceEnd = truncated.lastIndexOf('. ');
    if (sentenceEnd > limit - 50) {
      truncated = truncated.substring(0, sentenceEnd + 1);
    } else {
      // Fall back to word boundary
      const lastSpace = truncated.lastIndexOf(' ');
      if (lastSpace > limit - 30) {
        truncated = truncated.substring(0, lastSpace);
      }
    }
    
    return truncated + '...';
  }
  
  $: truncatedDescription = smartTruncate(entry.description, DESCRIPTION_LIMIT);
  $: shouldShowExpand = entry.description && entry.description.length > DESCRIPTION_LIMIT;
  $: displayDescription = isExpanded ? entry.description : truncatedDescription;
</script>

<div 
  class="px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-600 {isHighlighted ? 'bg-blue-50 dark:bg-blue-950' : 'hover:bg-neutral-50 dark:hover:bg-neutral-900'} cursor-pointer transition-colors"
  on:click={() => dispatch('click')}
>
  <div class="flex items-start justify-between">
    <div class="flex-1 min-w-0">
      <!-- Title and Author/Date -->
      <div class="flex items-center justify-between mb-2">
        <h3 class="font-medium text-sm text-neutral-900 dark:text-white">
          {@html highlightMatch(entry.title, searchTerm)}
        </h3>
        
        {#if entry.author || entry.created}
          <div class="flex items-center space-x-1 text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
            {#if entry.author}
              <User class="w-3 h-3" />
              <span>{entry.author}</span>
            {/if}
            {#if entry.author && entry.created}
              <span>•</span>
            {/if}
            {#if entry.created}
              <Calendar class="w-3 h-3" />
              <span>{formatDate(entry.created)}</span>
            {/if}
          </div>
        {/if}
      </div>
      
      <!-- Description -->
      <div class="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
        <div class="flex items-start justify-between">
          <div class="flex-1 {isExpanded ? '' : 'line-clamp-2'}">
            {@html highlightMatch(processMarkdown(displayDescription), searchTerm)}
          </div>
          {#if shouldShowExpand}
            <button
              class="ml-2 p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
              on:click|stopPropagation={() => isExpanded = !isExpanded}
            >
              {#if isExpanded}
                <ChevronUp class="w-3 h-3" />
              {:else}
                <ChevronDown class="w-3 h-3" />
              {/if}
            </button>
          {/if}
        </div>
      </div>
      
      <!-- Pattern (for regex entries) -->
      {#if entry.pattern}
        <code class="text-xs {isHighlighted ? 'bg-blue-100 dark:bg-blue-900' : 'bg-neutral-100 dark:bg-neutral-800'} px-1.5 py-1 rounded text-neutral-700 dark:text-neutral-300 font-mono block mb-2 truncate">
          {entry.pattern}
        </code>
      {/if}
      
      <!-- Category and Tags -->
      <div class="flex flex-wrap gap-1">
        <span class="text-xs px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-neutral-600 dark:text-neutral-300 whitespace-nowrap">
          {entry.type.replace('_', ' ')}
        </span>
        {#if entry.tags.length > 0}
          {#each entry.tags as tag}
            <span class="text-xs px-1 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
              {tag}
            </span>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>