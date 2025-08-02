<script>
  import { router } from 'tinro';
  import { contentDatabase } from '../generated/contentDatabase';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import Overview from './components/overview.svelte';
  import Scoring from './components/scoring/scoring.svelte';
  
  let profileEntry = null;
  
  // Get current path and extract slug
  $: currentPath = $router.path;
  $: slug = currentPath.replace('/quality-profile/', '');
  
  // Find profile in content database
  $: profileEntry = slug && slug !== 'quality-profile' 
    ? contentDatabase.entries.find(entry => 
        entry.type === 'quality-profile' && entry.slug === slug
      )
    : null;
  
  // Extract all data directly without nesting
  $: name = profileEntry?.data?.name || '';
  $: description = profileEntry?.data?.description || '';
  $: tags = profileEntry?.data?.tags || [];
  $: upgradesAllowed = profileEntry?.data?.upgradesAllowed || false;
  $: minCustomFormatScore = profileEntry?.data?.minCustomFormatScore || 0;
  $: upgradeUntilScore = profileEntry?.data?.upgradeUntilScore || null;
  $: minScoreIncrement = profileEntry?.data?.minScoreIncrement || null;
  $: custom_formats = profileEntry?.data?.custom_formats || [];
  $: qualities = profileEntry?.data?.qualities || [];
  $: upgrade_until = profileEntry?.data?.upgrade_until || null;
  $: language = profileEntry?.data?.language || null;
  
  // Set up navigation when profile is loaded
  $: if (profileEntry) {
    const navItems = ['Overview', 'Scoring', 'Qualities'];
    if (language) {
      navItems.push('Languages');
    }
    setNavigationItems(navItems, currentPath);
  }
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div>
  {#if profileEntry}
    <!-- Overview Section with full-width background -->
    <section id="overview">
      <Overview {name} {description} {tags} />
    </section>
    
    <!-- Rest of content with normal padding -->
    <div class="p-6 max-w-4xl mx-auto">
      <!-- Scoring Section -->
      <section id="scoring" class="mb-12">
        <Scoring {custom_formats} />
      </section>
      
      <!-- Qualities Section -->
      <section id="qualities" class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Qualities</h2>
        <!-- Quality groups will go here -->
      </section>
      
      <!-- Languages Section (conditional) -->
      {#if language}
        <section id="languages" class="mb-12">
          <h2 class="text-2xl font-bold mb-4">Languages</h2>
          <!-- Language settings will go here -->
        </section>
      {/if}
    </div>
  {:else if slug && slug !== 'quality-profile'}
    <div class="p-6 max-w-4xl mx-auto">
      <p>No profile found for slug: {slug}</p>
    </div>
  {:else}
    <div class="p-6 max-w-4xl mx-auto">
      <p>Loading...</p>
    </div>
  {/if}
</div>