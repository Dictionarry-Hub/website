<script>
  import { onMount, onDestroy } from 'svelte';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import FeaturedCarousel from './featured/carousel.svelte';
  import WikiList from './list/list.svelte';
  import { contentDatabase } from '@db';

  const wikiEntries = contentDatabase.entries.filter(entry => entry.category === 'wiki');
  const featuredEntries = wikiEntries.filter(entry => entry.frontmatter?.featured);

  onMount(() => {
    const navItems = [];
    if (featuredEntries.length > 0) {
      navItems.push('Featured Articles');
    }
    navItems.push('All Articles');
    setNavigationItems(navItems, '/wiki');
  });

  onDestroy(() => {
    clearNavigation();
  });
</script>

<div>
  <!-- Page Header -->
  <div class="mb-8">
    <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Wiki</h1>
    <p class="mt-2 text-base text-neutral-600 dark:text-neutral-400">
      Guides & documentation to help you get the most out of your Dictionarry experience (but mostly ramblings from Santiago).
    </p>
  </div>

  <!-- Featured Section -->
  {#if featuredEntries.length > 0}
    <section id="featured-articles" class="mb-12">
      <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Featured Articles</h2>
      <FeaturedCarousel entries={featuredEntries} />
    </section>
  {/if}

  <!-- All Articles Section -->
  <section id="all-articles">
    <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-4">All Articles</h2>
    <WikiList entries={wikiEntries} />
  </section>
</div>
