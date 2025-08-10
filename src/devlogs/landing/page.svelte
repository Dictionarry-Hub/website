<script>
  import Seo from '@shared/components/seo.svelte';
  import { router } from 'tinro';
  import { getSeoData } from '@shared/constants/seoData';
  import { onMount, onDestroy } from 'svelte';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import FeaturedCard from './featured/featuredCard.svelte';
  import DevlogsList from './list/list.svelte';
  import { contentDatabase } from '@db';

  const seo = getSeoData($router.path);

  const devlogEntries = contentDatabase.entries
    .filter(entry => entry.category === 'devlogs')
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter?.created || 0);
      const dateB = new Date(b.frontmatter?.created || 0);
      return dateB - dateA; // Sort by date descending (newest first)
    });
  
  // Get the latest entry as featured
  const featuredEntry = devlogEntries[0];

  onMount(() => {
    const navItems = [];
    if (featuredEntry) {
      navItems.push('Latest Entry');
    }
    navItems.push('All Entries');
    setNavigationItems(navItems, '/devlogs');
  });

  onDestroy(() => {
    clearNavigation();
  });
</script>

<Seo
  title={seo.title}
  description={seo.description}
  image={seo.image}
  url={$router.path}
/>

<div>
  <!-- Page Header -->
  <div class="mb-8">
    <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Devlogs</h1>
    <p class="mt-2 text-base text-neutral-600 dark:text-neutral-400">
      Development updates, progress notes, and technical discussions about the Dictionarry project.
    </p>
  </div>

  <!-- Featured Section - Latest Entry -->
  {#if featuredEntry}
    <section id="latest-entry" class="mb-12">
      <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Latest Entry</h2>
      <FeaturedCard entry={featuredEntry} />
    </section>
  {/if}

  <!-- All Entries Section -->
  <section id="all-entries">
    <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-4">All Entries</h2>
    <DevlogsList entries={devlogEntries} />
  </section>
</div>