<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import Overview from './components/qualityProfileOverview.svelte';
  import Flowchart from './components/flowchart.svelte';
  import { flowchartStore } from '@shared/stores/flowchart';
  import { flowchartColumns } from '@shared/constants/flowchartOptions';
  import Tooltip from '@shared/ui/tooltip.svelte';
  import { Link2, Clock, HelpCircle } from 'lucide-svelte';
  
  let recommendedProfile = null;
  let profileUrl = null;
  
  // Map selections to profile names
  function getRecommendedProfile(selections) {
    if (!selections[1] || !selections[2]) return null;
    
    const resolution = flowchartColumns[0].items[selections[1] - 1]?.label;
    const compression = flowchartColumns[1].items[selections[2] - 1]?.label;
    const focus = selections[3] ? flowchartColumns[2].items[selections[3] - 1]?.label : null;
    const codec = selections[4] ? flowchartColumns[3].items[selections[4] - 1]?.label : null;
    const hdr = selections[5] ? flowchartColumns[4].items[selections[5] - 1]?.label : null;
    
    // SD profiles
    if (resolution === 'SD') {
      if (compression === 'Lossless') {
        return { name: 'SD Remux', url: null, status: 'Coming Soon' };
      }
      if (compression === 'Compressed' && focus === 'Quality') {
        return { name: 'SD Quality', url: null, status: 'Coming Soon' };
      }
    }
    
    // 720p profiles
    if (resolution === '720p' && compression === 'Compressed' && focus === 'Quality') {
      return { name: '720p Quality', url: '/quality-profile/720p-quality', status: 'Available' };
    }
    
    // 1080p profiles
    if (resolution === '1080p') {
      if (compression === 'Lossless') {
        return { name: '1080p Remux', url: '/quality-profile/1080p-remux', status: 'Available' };
      }
      if (compression === 'Compressed') {
        if (focus === 'Quality') {
          if (codec === 'h265' && hdr === 'HDR') {
            return { name: '1080p Quality (HDR)', url: '/quality-profile/1080p-quality-hdr', status: 'Available' };
          }
          return { name: '1080p Quality', url: '/quality-profile/1080p-quality', status: 'Available' };
        }
        if (focus === 'Balanced') {
          return { name: '1080p Balanced', url: '/quality-profile/1080p-balanced', status: 'Available' };
        }
        if (focus === 'Efficient') {
          return { name: '1080p Efficient', url: null, status: 'Coming Soon' };
        }
      }
    }
    
    // 2160p profiles
    if (resolution === '2160p') {
      if (compression === 'Lossless') {
        return { name: '2160p Remux', url: '/quality-profile/2160p-remux', status: 'Available' };
      }
      if (compression === 'Compressed') {
        if (focus === 'Quality') {
          return { name: '2160p Quality', url: '/quality-profile/2160p-quality', status: 'Available' };
        }
        if (focus === 'Balanced') {
          return { name: '2160p Balanced', url: '/quality-profile/2160p-balanced', status: 'Available' };
        }
      }
    }
    
    return null;
  }
  
  // Subscribe to flowchart changes
  $: {
    // Only show recommendation when all selections are complete
    if ($flowchartStore.selections[5]) {
      const profile = getRecommendedProfile($flowchartStore.selections);
      recommendedProfile = profile;
    } else {
      recommendedProfile = null;
    }
  }
  
  onMount(() => {
    const navItems = ['Overview', 'Profile Wizard'];
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
    <!-- Profile Wizard Section -->
    <section id="profile-wizard" class="mb-12">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8 mb-6">
        <div class="col-span-1 lg:col-span-3">
          <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-1">
            🧙 Profile Wizard
          </h2>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            Select your preferences to find the ideal quality profile for your content<span class="hidden lg:inline">. Hover over column headers for more information</span>
          </p>
        </div>
        <div class="flex col-span-1 lg:col-span-2 items-center lg:justify-end">
          {#if recommendedProfile}
              {#if recommendedProfile.url}
                <a 
                  href={recommendedProfile.url} 
                  class="group relative flex items-center gap-3 px-4 py-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all w-full lg:w-auto"
                >
                  <div class="flex-1">
                    <div class="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-0.5">Recommended Profile</div>
                    <div class="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {recommendedProfile.name}
                    </div>
                  </div>
                  <div class="w-8 h-8 bg-white dark:bg-neutral-700 rounded-full flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                    <Link2 class="w-4 h-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div class="absolute inset-0 rounded-lg ring-1 ring-blue-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </a>
              {:else}
                <div class="relative flex items-center gap-3 px-4 py-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700 w-full lg:w-auto">
                  <div class="flex-1">
                    <div class="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-0.5">Recommended Profile</div>
                    <div class="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                      {recommendedProfile.name}
                    </div>
                  </div>
                  <Tooltip text="This profile is coming soon" position="left">
                    <div class="w-8 h-8 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center cursor-help">
                      <Clock class="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                  </Tooltip>
                </div>
              {/if}
          {:else}
            <div class="relative flex items-center gap-3 px-4 py-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700 opacity-60 w-full lg:w-auto">
              <div class="flex-1">
                <div class="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-0.5">Recommended Profile</div>
                <div class="text-sm font-medium text-neutral-400 dark:text-neutral-500">
                  Complete your selection
                </div>
              </div>
              <div class="w-8 h-8 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                <HelpCircle class="w-4 h-4 text-neutral-400" />
              </div>
            </div>
          {/if}
        </div>
      </div>
      <Flowchart />
    </section>
  </div>
</div>