<script>
  import { router } from 'tinro';
  import { contentDatabase } from '@db';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import Overview from './overview/overview.svelte';
  import Scoring from './scoring/scoring.svelte';
  import Qualities from './qualities/qualities.svelte';
  import Utterances from '@shared/ui/utterances.svelte';
  
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
    const navItems = ['Overview', 'Custom Formats', 'Qualities', 'Discussion'];
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
      <Overview {name} {description} {tags} {language} />
    </section>
    
    <!-- Rest of content with normal padding -->
    <div >
      <!-- Custom Formats Section -->
      <section id="custom-formats" class="mb-12">
        <Scoring {custom_formats} {minCustomFormatScore} {upgradeUntilScore} {minScoreIncrement} />
      </section>
      
      <!-- Qualities Section -->
      <section id="qualities" class="mb-12">
        <Qualities {qualities} {upgrade_until} {upgradesAllowed} />
      </section>
      
      <!-- Discussion Section -->
      {#if name}
        <section id="discussion" class="mb-12 pb-12">
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Discussion</h2>
          {#key name}
            <Utterances issueTerm={`⚡ Quality Profile: ${name}`} />
          {/key}
        </section>
      {/if}
    </div>
  {:else if slug && slug !== 'quality-profile'}
    <div >
      <p>No profile found for slug: {slug}</p>
    </div>
  {:else}
    <div >
      <p>Loading...</p>
    </div>
  {/if}
</div>