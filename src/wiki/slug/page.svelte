<script>
  import { router } from 'tinro';
  import { contentDatabase } from '@db';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onDestroy } from 'svelte';
  import Frontmatter from './frontmatter/frontmatter.svelte';
  import MarkdownRenderer from '@ui/markdownRenderer.svelte';
  
  let wikiEntry = null;
  
  // Get current path and extract slug
  $: currentPath = $router.path;
  $: slug = currentPath.replace('/wiki/', '');
  
  // Find wiki entry in content database
  $: wikiEntry = slug && slug !== 'wiki' 
    ? contentDatabase.entries.find(entry => 
        entry.category === 'wiki' && entry.slug === slug
      )
    : null;
  
  // Set up navigation when wiki entry is loaded
  $: if (wikiEntry && wikiEntry.navigation) {
    // Convert navigation items to simple strings for the navigation store
    const navItems = wikiEntry.navigation.map(item => 
      typeof item === 'string' ? item : item.title
    );
    setNavigationItems(navItems, currentPath);
  }
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

{#if wikiEntry}
  <Frontmatter entry={wikiEntry} />
  
  {#if wikiEntry.blocks}
    <MarkdownRenderer blocks={wikiEntry.blocks} />
  {:else}
    <!-- Fallback for old HTML format -->
    <div class="prose prose-neutral dark:prose-invert max-w-none">
      {@html wikiEntry.html}
    </div>
  {/if}
{:else if slug && slug !== 'wiki'}
  <div>
    <p>No wiki article found for: {slug}</p>
  </div>
{:else}
  <div>
    <p>Loading...</p>
  </div>
{/if}