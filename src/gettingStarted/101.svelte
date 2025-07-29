<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import PageNavigation from '@shared/ui/pageNavigation.svelte';
  import TaskHeader from './components/taskHeader.svelte';
  import Plyr from 'plyr';
  import 'plyr/dist/plyr.css';
  
  let player;
  let videoElement;
  let videoElement2;
  let videoElement3;
  
  let isPlaying1 = true;
  let isPlaying2 = true;
  let isPlaying3 = true;
  
  onMount(() => {
    setNavigationItems([
      'Link',
      'Bridge', 
      'Sync'
    ], '#/profilarr-setup/101');
    
    // Initialize Plyr with minimal controls
    if (videoElement) {
      player = new Plyr(videoElement, {
        controls: ['play-large'],
        loop: { active: true },
        clickToPlay: true,
        autoplay: true,
        muted: true,
        hideControls: false,
        resetOnEnd: true
      });
    }
  });
  
  onDestroy(() => {
    clearNavigation();
    if (player) {
      player.destroy();
    }
  });
  
  function toggleVideo(num) {
    const video = num === 1 ? videoElement : num === 2 ? videoElement2 : videoElement3;
    if (video) {
      if (video.paused) {
        video.play();
        if (num === 1) isPlaying1 = true;
        else if (num === 2) isPlaying2 = true;
        else isPlaying3 = true;
      } else {
        video.pause();
        if (num === 1) isPlaying1 = false;
        else if (num === 2) isPlaying2 = false;
        else isPlaying3 = false;
      }
    }
  }
  
  function restartVideo(num) {
    const video = num === 1 ? videoElement : num === 2 ? videoElement2 : videoElement3;
    if (video) {
      video.currentTime = 0;
      video.play();
      if (num === 1) isPlaying1 = true;
      else if (num === 2) isPlaying2 = true;
      else isPlaying3 = true;
    }
  }
</script>

<div class="p-6 max-w-4xl mx-auto">
  <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Profilarr 101</h1>
  
  <p class="text-neutral-700 dark:text-neutral-300">
    Profilarr is a configuration management tool that performs 3 key tasks:
  </p>
  
  <div class="space-y-6 mt-6">
    <div id="link">
      <TaskHeader
        number="1"
        title="Link"
        subtitle="It <em>links</em> to a configuration source of your choice."
        showControls={true}
        isPlaying={isPlaying1}
        onToggle={() => toggleVideo(1)}
        onRestart={() => restartVideo(1)}
      />
      <div class="mt-4 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <video
          bind:this={videoElement}
          on:click={() => toggleVideo(1)}
          autoplay
          muted
          loop
          playsinline
          class="w-full cursor-pointer"
        >
          <source src="/video/profilarr_setup/link.mp4" type="video/mp4">
        </video>
      </div>
    </div>
    
    <div id="bridge">
      <TaskHeader
        number="2"
        title="Bridge"
        subtitle="It <em>bridges</em> to your Radarr/Sonarr instances."
        showControls={true}
        isPlaying={isPlaying2}
        onToggle={() => toggleVideo(2)}
        onRestart={() => restartVideo(2)}
      />
      <div class="mt-4 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <video
          bind:this={videoElement2}
          on:click={() => toggleVideo(2)}
          autoplay
          muted
          loop
          playsinline
          class="w-full cursor-pointer"
        >
          <source src="/video/profilarr_setup/bridge.mp4" type="video/mp4">
        </video>
      </div>
    </div>
    
    <div id="sync">
      <TaskHeader
        number="3"
        title="Sync"
        subtitle="It <em>syncs</em> configurations from your source to Radarr/Sonarr."
        showControls={true}
        isPlaying={isPlaying3}
        onToggle={() => toggleVideo(3)}
        onRestart={() => restartVideo(3)}
      />
      <div class="mt-4 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <video
          bind:this={videoElement3}
          on:click={() => toggleVideo(3)}
          autoplay
          muted
          loop
          playsinline
          class="w-full cursor-pointer"
        >
          <source src="/video/profilarr_setup/sync.mp4" type="video/mp4">
        </video>
      </div>
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