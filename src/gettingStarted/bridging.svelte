<script>
  import Seo from '@shared/ui/seo.svelte';
  import { router } from 'tinro';
  import { getSeoData } from '@shared/constants/seoData';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import PageNavigation from '@shared/ui/pageNavigation.svelte';
  import VideoPlayer from '@shared/ui/videoPlayer.svelte';

  const seo = getSeoData($router.path);
  
  onMount(() => {
    setNavigationItems([
      'Overview'
    ], '/profilarr-setup/bridging');
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

<div >
  <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Bridging</h1>
  
  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="overview">Overview</h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Bridging connects Profilarr to your Radarr and Sonarr instances, enabling it to sync custom formats and quality profiles from your linked database.
  </p>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    The process is straightforward; similar to adding instances in tools like Prowlarr:
  </p>
  
  <ol class="list-decimal list-inside space-y-2 mt-4 text-neutral-700 dark:text-neutral-300">
    <li>Enter your Radarr or Sonarr URL</li>
    <li>Provide the API key</li>
    <li>Define your sync parameters</li>
  </ol>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    After bridging, you can sync configurations from your linked database to your instances.
  </p>
  
  <VideoPlayer 
    src="/video/profilarr_setup/bridge.mp4"
    description="The video below shows adding a Radarr instance to Profilarr:"
  />

  <PageNavigation 
    previous={{path: '/profilarr-setup/linking', title: 'Linking', description: 'Connect to configuration sources'}}
    next={{path: '/profilarr-setup/syncing', title: 'Syncing', description: 'Push configurations to your instances'}}
  />
</div>