<script>
  import { onMount } from 'svelte';
  import { setNavigationItems } from '@shared/stores/navigation';

  onMount(() => {
    setNavigationItems([
      {
        title: 'Overview',
        children: [
          'Naming',
          'Quality Definitions', 
          'Miscellaneous Settings'
        ]
      }
    ]);
  });
</script>

<div class="max-w-4xl mx-auto p-6 space-y-8">
  <div class="space-y-4">
    <h1 id="overview" class="text-xl font-bold text-neutral-900 dark:text-white">Media Management Settings</h1>
    <p class="text-neutral-600 dark:text-neutral-400">
      Additional configuration settings that work alongside quality profiles and custom formats to control how your media is organized, named, and processed.
    </p>
  </div>

  <section class="bg-neutral-50 dark:bg-neutral-800 rounded-lg">
    <div class="flex items-center space-x-3 p-4 border-b border-neutral-200 dark:border-neutral-700">
      <div class="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
        <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
        </svg>
      </div>
      <h2 id="naming" class="text-lg font-semibold text-neutral-800 dark:text-neutral-200">Naming</h2>
    </div>
    
    <div class="p-6 space-y-4">
      <p class="text-neutral-700 dark:text-neutral-300">
        Naming settings control how your media files are renamed and organized in your library. These configurations determine the file structure, naming patterns, and folder organization.
      </p>
      
      <ul class="space-y-2 text-neutral-600 dark:text-neutral-400">
        <li class="flex items-center space-x-2">
          <span class="text-blue-600 dark:text-blue-400">•</span>
          <span>Better matching in Plex, Jellyfin, and other media servers</span>
        </li>
        <li class="flex items-center space-x-2">
          <span class="text-blue-600 dark:text-blue-400">•</span>
          <span>Ensures you can reimport files back into Radarr/Sonarr</span>
        </li>
      </ul>

      <div class="text-sm text-neutral-500 dark:text-neutral-400">
        <span>Our default naming schemes are based on </span>
        <a 
          href="https://trash-guides.info/Radarr/Radarr-recommended-naming-scheme/#recommended-naming-scheme" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-blue-600 dark:text-blue-400 hover:underline"
        >
          TRaSH Guides
        </a>
        <span> recommendations, customizable in Profilarr.</span>
      </div>
    </div>
  </section>

  <section class="bg-neutral-50 dark:bg-neutral-800 rounded-lg">
    <div class="flex items-center space-x-3 p-4 border-b border-neutral-200 dark:border-neutral-700">
      <div class="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
        <svg class="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      </div>
      <h2 id="quality-definitions" class="text-lg font-semibold text-neutral-800 dark:text-neutral-200">Quality Definitions</h2>
    </div>
    
    <div class="p-6 space-y-4">
      <p class="text-neutral-700 dark:text-neutral-300">
        Quality definitions control file size limits for different video qualities like 720p, 1080p, and 4K. In Dictionarry, these settings are less important because custom formats handle most of the quality filtering work.
      </p>
      
      <ul class="space-y-2 text-neutral-600 dark:text-neutral-400">
        <li class="flex items-center space-x-2">
          <span class="text-orange-600 dark:text-orange-400">•</span>
          <span>Set min/max/recommended file sizes for each quality level</span>
        </li>
      </ul>
    </div>
  </section>

  <section class="bg-neutral-50 dark:bg-neutral-800 rounded-lg">
    <div class="flex items-center space-x-3 p-4 border-b border-neutral-200 dark:border-neutral-700">
      <div class="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
        <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      </div>
      <h2 id="miscellaneous-settings" class="text-lg font-semibold text-neutral-800 dark:text-neutral-200">Miscellaneous Settings</h2>
    </div>
    
    <div class="p-6">
      <p class="text-neutral-700 dark:text-neutral-300">
        Basic configuration settings needed for custom formats and naming to work properly.
      </p>
    </div>
  </section>

  <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0">
        <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <div>
        <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">Getting Started</h3>
        <p class="text-sm text-blue-700 dark:text-blue-300 mt-1">
          Like custom formats and quality profiles, media management settings exist as versioned configurations in Profilarr. Connect to the Dictionarry database and sync them directly to your *arr applications.
        </p>
      </div>
    </div>
  </div>
</div>