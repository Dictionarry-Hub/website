<script>
  import { router } from 'tinro';
  import { contentDatabase } from '@db';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onDestroy } from 'svelte';
  import Frontmatter from './frontmatter/frontmatter.svelte';
  import MarkdownRenderer from '@ui/markdownRenderer.svelte';
  import Utterances from '@shared/ui/utterances.svelte';
  
  let devlogEntry = null;
  
  // Get current path and extract slug
  $: currentPath = $router.path;
  $: slug = currentPath.replace('/devlogs/', '');
  
  // Find devlog entry in content database
  $: devlogEntry = slug && slug !== 'devlogs' 
    ? contentDatabase.entries.find(entry => 
        entry.category === 'devlogs' && entry.slug === slug
      )
    : null;
  
  // Set up navigation when devlog entry is loaded
  $: if (devlogEntry && devlogEntry.navigation) {
    // Convert navigation items to simple strings for the navigation store
    const navItems = devlogEntry.navigation.map(item => 
      typeof item === 'string' ? item : item.title
    );
    // Add Discussion to navigation
    navItems.push('Discussion');
    setNavigationItems(navItems, currentPath);
  }
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

{#if devlogEntry}
  <Frontmatter entry={devlogEntry} />
  
  {#if devlogEntry.blocks}
    <MarkdownRenderer blocks={devlogEntry.blocks} />
  {:else}
    <!-- Fallback for old HTML format -->
    <div class="prose prose-neutral dark:prose-invert max-w-none">
      {@html devlogEntry.html}
    </div>
  {/if}
  
  <!-- Discussion Section -->
  <section id="discussion" class="mt-12 pt-12 border-t border-neutral-200 dark:border-neutral-700">
    <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Discussion</h2>
    {#key devlogEntry.title}
      <Utterances issueTerm={`📝 Devlog: ${devlogEntry.title}`} />
    {/key}
  </section>
{:else if slug && slug !== 'devlogs'}
  <div>
    <p>No devlog entry found for: {slug}</p>
  </div>
{:else}
  <div>
    <p>Loading...</p>
  </div>
{/if}