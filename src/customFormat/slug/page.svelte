<script>
  import Seo from '@shared/components/seo.svelte';
  import { router } from 'tinro';
  import { contentDatabase } from '@db';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import Overview from './overview/overview.svelte';
  import Conditions from './conditions/conditions.svelte';
  import ProfileReferences from './profileReferences/profileReferences.svelte';
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
  $: referencedBy = formatEntry?.data?.referencedBy || [];
  $: commitLog = formatEntry?.commitLog || null;

  $: seo = {
    title: name,
    description: description
  };
  
  // Set up navigation when format is loaded
  $: if (formatEntry) {
    const navItems = ['Overview', 'Conditions'];
    if (referencedBy.length > 0) {
      navItems.push('Used In Profiles');
    }
    navItems.push('Changelog', 'Discussion');
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
      
      <!-- Used In Profiles Section -->
      {#if referencedBy.length > 0}
        <section id="used-in-profiles" class="mb-12">
          <ProfileReferences {referencedBy} />
        </section>
      {/if}
      
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