<script>
  import { onMount } from 'svelte';
  import { setNavigationItems } from '@shared/stores/navigation';
  import { FileText, BarChart3, Settings } from 'lucide-svelte';

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

<div>
  <div class="mb-6">
    <h1 id="overview" class="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Media Management Settings</h1>
    <p class="text-neutral-600 dark:text-neutral-400">
      Additional configuration settings that work alongside quality profiles and custom formats to control how your media is organized, named, and processed.
    </p>
  </div>

  <div class="space-y-6">
    <section class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-600 transition-colors cursor-pointer group" on:click={() => window.location.hash='#/media-management/naming'}>
    <div class="p-6">
      <div class="flex items-start gap-4">
        <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <FileText class="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div class="flex-1">
          <h2 id="naming" class="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">Naming</h2>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
            Naming settings control how your media files are renamed and organized in your library. These configurations determine the file structure, naming patterns, and folder organization.
          </p>
          <ul class="space-y-1 text-xs text-neutral-500 dark:text-neutral-500">
            <li class="flex items-center gap-2">
              <span class="text-blue-600 dark:text-blue-400">•</span>
              <span>Better matching in Plex, Jellyfin, and other media servers</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-blue-600 dark:text-blue-400">•</span>
              <span>Ensures you can reimport files back into Radarr/Sonarr</span>
            </li>
          </ul>
          <div class="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
            <span>Our default naming schemes are based on </span>
            <a 
              href="https://trash-guides.info/Radarr/Radarr-recommended-naming-scheme/#recommended-naming-scheme" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-blue-600 dark:text-blue-400 hover:underline"
              on:click|stopPropagation
            >
              TRaSH Guides
            </a>
            <span> recommendations, customizable in Profilarr.</span>
          </div>
        </div>
      </div>
    </div>
    </section>

    <section class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-orange-400 dark:hover:border-orange-600 transition-colors cursor-pointer group" on:click={() => window.location.hash='#/media-management/qualitydefinitions'}>
    <div class="p-6">
      <div class="flex items-start gap-4">
        <div class="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
          <BarChart3 class="w-5 h-5 text-orange-600 dark:text-orange-400" />
        </div>
        <div class="flex-1">
          <h2 id="quality-definitions" class="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400">Quality Definitions</h2>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
            Quality definitions control file size limits for different video qualities like 720p, 1080p, and 4K. In Dictionarry, these settings are less important because custom formats handle most of the quality filtering work.
          </p>
          <ul class="space-y-1 text-xs text-neutral-500 dark:text-neutral-500">
            <li class="flex items-center gap-2">
              <span class="text-orange-600 dark:text-orange-400">•</span>
              <span>Set min/max/recommended file sizes for each quality level</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </section>

    <section class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-green-400 dark:hover:border-green-600 transition-colors cursor-pointer group" on:click={() => window.location.hash='#/media-management/misc'}>
    <div class="p-6">
      <div class="flex items-start gap-4">
        <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <Settings class="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div class="flex-1">
          <h2 id="miscellaneous-settings" class="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400">Miscellaneous Settings</h2>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            Basic configuration settings needed for custom formats and naming to work properly.
          </p>
        </div>
      </div>
    </div>
    </section>
  </div>

  <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-8">
    <div class="flex items-start gap-3">
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