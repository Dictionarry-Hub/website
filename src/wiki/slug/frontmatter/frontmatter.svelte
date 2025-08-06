<script>
  import { User, Calendar, Clock, Tag, Layers } from 'lucide-svelte';
  
  export let entry;
  
  // Format date helper
  function formatDate(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  
  // Calculate relative time
  function getRelativeTime(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  }
  
  $: metadata = entry.frontmatter || {};
  $: tags = metadata.tags || entry.tags || [];
  $: appliesTo = metadata.applies_to || metadata.appliesTo || [];
  $: created = metadata.created;
</script>

<header class="border-b border-neutral-200 dark:border-neutral-700 pb-4 mb-6">
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
    <!-- Title on the left -->
    <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">
      {entry.title}
    </h1>
    
    <!-- Metadata on the right -->
    <div class="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
      {#if metadata.author}
        <div class="flex items-center gap-1">
          <User size={14} />
          <span>{metadata.author}</span>
        </div>
      {/if}
      
      {#if created}
        <div class="flex items-center gap-1">
          <Calendar size={14} />
          <span>{formatDate(created)}</span>
        </div>
      {/if}
      
      {#if metadata.readingTime}
        <div class="flex items-center gap-1">
          <Clock size={14} />
          <span>{metadata.readingTime} min read</span>
        </div>
      {/if}
    </div>
  </div>
  
  <!-- Tags and applies to below -->
  {#if appliesTo.length > 0 || tags.length > 0}
    <div class="flex flex-wrap items-center gap-2 mt-2">
      {#each appliesTo as app}
        <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          {app}
        </span>
      {/each}
      
      {#each tags as tag}
        <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
          {tag}
        </span>
      {/each}
    </div>
  {/if}
</header>