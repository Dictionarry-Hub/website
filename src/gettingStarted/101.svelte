<script>
  import Seo from '@shared/ui/seo.svelte';
  import { router } from 'tinro';
  import { getSeoData } from '@shared/constants/seoData';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import PageNavigation from '@shared/ui/pageNavigation.svelte';
  import TaskHeader from './components/taskHeader.svelte';
  import VideoPlayer from '@shared/ui/videoPlayer.svelte';

  const seo = getSeoData($router.path);
  
  let videoPlayer1;
  let videoPlayer2;
  let videoPlayer3;
  
  onMount(() => {
    setNavigationItems([
      'Link',
      'Bridge', 
      'Sync'
    ], '/profilarr-setup/101');
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
  <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Profilarr 101</h1>
  
  <p class="text-neutral-700 dark:text-neutral-300">
    Profilarr is a configuration management tool that performs 3 key tasks:
  </p>
  
  <div class="space-y-6 mt-6">
    <div id="link">
      <VideoPlayer
        bind:this={videoPlayer1}
        src="/video/profilarr_setup/link.mp4"
      >
        <TaskHeader
          slot="header"
          number="1"
          title="Link"
          subtitle="It <em>links</em> to a configuration source of your choice."
        />
      </VideoPlayer>
    </div>
    
    <div id="bridge">
      <VideoPlayer
        bind:this={videoPlayer2}
        src="/video/profilarr_setup/bridge.mp4"
      >
        <TaskHeader
          slot="header"
          number="2"
          title="Bridge"
          subtitle="It <em>bridges</em> to your Radarr/Sonarr instances."
        />
      </VideoPlayer>
    </div>
    
    <div id="sync">
      <VideoPlayer
        bind:this={videoPlayer3}
        src="/video/profilarr_setup/sync.mp4"
      >
        <TaskHeader
          slot="header"
          number="3"
          title="Sync"
          subtitle="It <em>syncs</em> configurations from your source to Radarr/Sonarr."
        />
      </VideoPlayer>
    </div>
  </div>

  <div class="mt-12">
    <p class="text-neutral-700 dark:text-neutral-300">
      The following sections cover each step in detail, but what you see above is the entire workflow. No configuration files, no manual API calls, no JSON editing. Just link, bridge, and sync.
    </p>
  </div>

  <PageNavigation 
    previous={{path: '/profilarr-setup/installation', title: 'Installation', description: 'Docker setup guide'}}
    next={{path: '/profilarr-setup/linking', title: 'Linking', description: 'Connect to configuration sources in detail'}}
  />
</div>