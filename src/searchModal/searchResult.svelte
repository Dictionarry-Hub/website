<script>
  import { User, Calendar } from 'lucide-svelte';
  import { createEventDispatcher } from 'svelte';
  
  export let entry;
  export let isHighlighted = false;
  export let searchTerm = '';
  
  const dispatch = createEventDispatcher();
  
  // Highlight matching text
  function highlightMatch(text, term) {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>');
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
</script>

<div 
  class="px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-600 {isHighlighted ? 'bg-blue-50 dark:bg-blue-950' : 'hover:bg-neutral-50 dark:hover:bg-neutral-900'} cursor-pointer transition-colors"
  on:click={() => dispatch('click')}
>
  <div class="flex items-start justify-between">
    <div class="flex-1 min-w-0">
      <!-- Title and Author/Date -->
      <div class="flex items-center justify-between mb-1">
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
      <p class="text-xs text-neutral-600 dark:text-neutral-400 mb-1.5 line-clamp-2">
        {@html highlightMatch(entry.description, searchTerm)}
      </p>
      
      <!-- Pattern (for regex entries) -->
      {#if entry.pattern}
        <code class="text-xs {isHighlighted ? 'bg-blue-100 dark:bg-blue-900' : 'bg-neutral-100 dark:bg-neutral-800'} px-1.5 py-1 rounded text-neutral-700 dark:text-neutral-300 font-mono block mb-1.5 truncate">
          {entry.pattern}
        </code>
      {/if}
      
      <!-- Category and Tags -->
      <div class="flex flex-wrap gap-1">
        <span class="text-xs px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-neutral-600 dark:text-neutral-300 whitespace-nowrap">
          {entry.type.replace('_', ' ')}
        </span>
        {#if entry.tags.length > 0}
          {#each entry.tags.slice(0, 3) as tag}
            <span class="text-xs px-1 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
              {tag}
            </span>
          {/each}
          {#if entry.tags.length > 3}
            <span class="text-xs text-neutral-500">+{entry.tags.length - 3}</span>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>