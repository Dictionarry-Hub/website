<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import Overview from './overview/overview.svelte';
  import Flowchart from './flowchart/flowchart.svelte';
  import { flowchartColumns } from '@shared/constants/flowchartOptions';
  
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
    <div>
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
  </section>
  
  <!-- Rest of content with normal padding -->
  <div >
    <!-- Profile Wizard Section - empty for navigation anchor -->
    <section id="profile-wizard">
      <Flowchart {getRecommendedProfile} />
    </section>
  </div>
</div>