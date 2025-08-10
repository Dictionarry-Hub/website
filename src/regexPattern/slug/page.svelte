<script>
  import Seo from '@shared/components/seo.svelte';
  import { router } from 'tinro';
  import { contentDatabase } from '@db';
  import { getSeoData } from '@shared/constants/seoData';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import Overview from './overview/overview.svelte';
  import Pattern from './pattern/pattern.svelte';
  import Tests from './tests/tests.svelte';
  import References from './references/references.svelte';
  import Utterances from '@shared/ui/utterances.svelte';
  import Changelog from '@shared/ui/changelog.svelte';
  
  let regexEntry = null;
  
  // Get current path and extract slug
  $: currentPath = $router.path;
  $: slug = currentPath.replace('/regex-pattern/', '').replace(/\/$/, '');
  
  // Find regex pattern in content database
  $: regexEntry = slug && slug !== 'regex-pattern' 
    ? contentDatabase.entries.find(entry => 
        entry.type === 'regex-pattern' && entry.slug === slug
      )
    : null;
  
  // Extract all data directly without nesting
  $: name = regexEntry?.data?.name || '';
  $: description = regexEntry?.data?.description || '';
  $: tags = regexEntry?.data?.tags || [];
  $: pattern = regexEntry?.data?.pattern || '';
  $: tests = regexEntry?.data?.tests || '';
  $: testResults = regexEntry?.data?.testResults || null;
  $: regex101 = regexEntry?.data?.regex101 || null;
  $: referencedBy = regexEntry?.data?.referencedBy || [];
  $: commitLog = regexEntry?.commitLog || null;

  $: seo = {
    title: name,
    description: getSeoData('/regex-pattern').description
  };
  
  // Debug: Log what data we're getting
  $: if (referencedBy.length > 0) {
    console.log('Referenced by data:', referencedBy);
  }
  
  // Set up navigation when regex pattern is loaded
  $: if (regexEntry) {
    const navItems = ['Overview', 'Pattern', 'Tests'];
    if (referencedBy.length > 0) {
      navItems.push('Referenced By');
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
  {#if regexEntry}
    <!-- Overview Section with full-width background -->
    <section id="overview">
      <Overview {name} {description} {tags} />
    </section>
    
    <!-- Rest of content with normal padding -->
    <div>
      <!-- Pattern Section -->
      <section id="pattern" class="mb-12">
        <Pattern {pattern} />
      </section>
      
      <!-- Tests Section -->
      <section id="tests" class="mb-12">
        <Tests {tests} {testResults} {regex101} />
      </section>
      
      <!-- Referenced By Section -->
      {#if referencedBy.length > 0}
        <section id="referenced-by" class="mb-12">
          <References {referencedBy} />
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
            <Utterances issueTerm={`🔍 Regex Pattern: ${name}`} />
          {/key}
        </section>
      {/if}
    </div>
  {:else if slug && slug !== 'regex-pattern'}
    <div>
      <p>No regex pattern found for slug: {slug}</p>
    </div>
  {:else}
    <div>
      <p>Loading...</p>
    </div>
  {/if}
</div>