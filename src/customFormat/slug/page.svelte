<script>
  import { router } from 'tinro';
  import { contentDatabase } from '@db';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import Overview from './overview/overview.svelte';
  import Conditions from './conditions/conditions.svelte';
  import Utterances from '@shared/ui/utterances.svelte';
  import Changelog from '@shared/ui/changelog.svelte';
  
  let formatEntry = null;
  
  // Get current path and extract slug
  $: currentPath = $router.path;
  $: slug = currentPath.replace('/custom-format/', '');
  
  // Find format in content database
  $: formatEntry = slug && slug !== 'custom-format' 
    ? contentDatabase.entries.find(entry => 
        entry.type === 'custom-format' && entry.slug === slug
      )
    : null;
  
  // Extract all data directly without nesting
  $: name = formatEntry?.data?.name || '';
  $: description = formatEntry?.data?.description || '';
  $: tags = formatEntry?.data?.tags || [];
  $: conditions = formatEntry?.data?.conditions || [];
  $: tests = formatEntry?.data?.tests || [];
  $: commitLog = formatEntry?.commitLog || null;
  
  // Set up navigation when format is loaded
  $: if (formatEntry) {
    const navItems = ['Overview', 'Conditions', 'Tests', 'Related Formats', 'Changelog', 'Discussion'];
    setNavigationItems(navItems, currentPath);
  }
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div>
  {#if formatEntry}
    <!-- Overview Section with full-width background -->
    <section id="overview">
      <Overview {name} {description} {tags} />
    </section>
    
    <!-- Rest of content with normal padding -->
    <div >
      <!-- Conditions Section -->
      <section id="conditions" class="mb-12">
        <Conditions {conditions} />
      </section>
      
      <!-- Tests Section -->
      <section id="tests" class="mb-12">
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Tests</h2>
        <p class="text-neutral-600 dark:text-neutral-400">Tests section coming soon...</p>
      </section>
      
      <!-- Related Formats Section -->
      <section id="related-formats" class="mb-12">
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Related Formats</h2>
        <p class="text-neutral-600 dark:text-neutral-400">Related formats section coming soon...</p>
      </section>
      
      <!-- Changelog Section -->
      <section id="changelog" class="mb-12">
        <Changelog {commitLog} />
      </section>
      
      <!-- Discussion Section -->
      {#if name}
        <section id="discussion" class="mb-12 pb-12">
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Discussion</h2>
          {#key name}
            <Utterances issueTerm={`🎨 Custom Format: ${name}`} />
          {/key}
        </section>
      {/if}
    </div>
  {:else if slug && slug !== 'custom-format'}
    <div >
      <p>No custom format found for slug: {slug}</p>
    </div>
  {:else}
    <div >
      <p>Loading...</p>
    </div>
  {/if}
</div>