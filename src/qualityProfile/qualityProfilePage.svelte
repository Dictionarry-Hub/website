<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import Overview from './components/qualityProfileOverview.svelte';
  import Flowchart from './components/flowchart.svelte';
  
  onMount(() => {
    const navItems = ['Overview', 'Profile Finder'];
    setNavigationItems(navItems, '/quality-profile');
  });
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div>
  <!-- Overview Section with full-width background -->
  <section id="overview">
    <div class="py-8">
      <div class="max-w-4xl mx-auto px-6">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">
            ⚡ Quality Profiles
          </h1>
        </div>
        
        <!-- Overview -->
        <div class="border-t border-neutral-200 dark:border-neutral-700/60 pt-6 mb-8">
          <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
            Overview
          </h2>
          <Overview />
        </div>
      </div>
    </div>
  </section>
  
  <!-- Rest of content with normal padding -->
  <div class="p-6 max-w-4xl mx-auto">
    <!-- Profile Finder Section -->
    <section id="profile-finder" class="mb-12">
      <Flowchart />
    </section>
  </div>
</div>