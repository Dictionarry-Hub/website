<script>
  import Seo from '@shared/components/seo.svelte';
  import { router } from 'tinro';
  import { contentDatabase } from '@db';
  import { getSeoData } from '@shared/constants/seoData';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onDestroy } from 'svelte';
  import Frontmatter from './frontmatter/frontmatter.svelte';
  import MarkdownRenderer from '@ui/markdownRenderer.svelte';
  import Utterances from '@shared/ui/utterances.svelte';
  
  let wikiEntry = null;

  $: seo = {
    title: wikiEntry?.title,
    description: getSeoData('/wiki').description // Use generic wiki description
  };
  
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
    // Add Discussion to navigation
    navItems.push('Discussion');
    setNavigationItems(navItems, currentPath);
  }
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<Seo
  title={seo.title}
  description={seo.description}
  image={null}
  url={$router.path}
/>

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
  
  <!-- Discussion Section -->
  <section id="discussion" class="mt-12 pt-12 border-t border-neutral-200 dark:border-neutral-700">
    <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Discussion</h2>
    {#key wikiEntry.title}
      <Utterances issueTerm={`📚 Wiki: ${wikiEntry.title}`} />
    {/key}
  </section>
{:else if slug && slug !== 'wiki'}
  <div>
    <p>No wiki article found for: {slug}</p>
  </div>
{:else}
  <div>
    <p>Loading...</p>
  </div>
{/if}