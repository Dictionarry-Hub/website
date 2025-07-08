<script>
  import { routes } from '../generated/routes';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { Film, Tv, Info } from 'lucide-svelte';
  import Tooltip from '@shared/ui/tooltip.svelte';

  // Find the misc settings data
  $: miscData = routes.find(r => r.slug === 'misc' && r.type === 'media-management')?.data;

  onMount(() => {
    setNavigationItems([
      'Radarr',
      'Sonarr'
    ], '#/media-management/misc');
  });

  onDestroy(() => {
    clearNavigation();
  });

  function formatSettingName(key) {
    // Special cases for specific settings
    if (key === 'propersRepacks') {
      return 'Prefer Propers & Repacks';
    }
    // Convert camelCase to Title Case
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }

  function formatSettingValue(value) {
    if (typeof value === 'boolean') {
      return value ? 'Enabled' : 'Disabled';
    }
    if (typeof value === 'string') {
      // Convert camelCase to readable format
      return value.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }
    return value;
  }

  function getSettingDescription(key) {
    const descriptions = {
      'propersRepacks': 'Uses Radarr/Sonarr logic to prefer releases marked as propers and repacks. This overwrites custom format scores and should typically be disabled.',
      'enableMediaInfo': 'Required to analyze media files and extract information such as HDR, audio codecs, etc. for renaming purposes.'
    };
    return descriptions[key] || 'Description for this setting';
  }
</script>

<div class="p-6 max-w-4xl mx-auto">
  <div class="space-y-4 mb-8">
    <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Miscellaneous Settings</h1>
    <p class="text-neutral-600 dark:text-neutral-400">
      Additional configuration settings for Radarr and Sonarr that control various aspects of media processing and management.
    </p>
  </div>

  {#if miscData}
    <div class="space-y-8">
      {#each Object.entries(miscData) as [service, settings]}
        <section class="bg-neutral-50 dark:bg-neutral-800 rounded-lg">
          <div class="flex items-center space-x-3 p-4 border-b border-neutral-200 dark:border-neutral-700">
            {#if service.toLowerCase() === 'radarr'}
              <div class="p-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Film class="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            {:else if service.toLowerCase() === 'sonarr'}
              <div class="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Tv class="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            {/if}
            <h2 id="{service.toLowerCase()}" class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 capitalize">
              {service}
            </h2>
          </div>
          
          <div class="p-6 space-y-4">
            {#each Object.entries(settings) as [key, value]}
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <h3 class="text-base font-medium text-neutral-900 dark:text-neutral-100">
                    {formatSettingName(key)}
                  </h3>
                  <Tooltip text={getSettingDescription(key)} position="top">
                    <Info class="w-4 h-4 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 cursor-help" />
                  </Tooltip>
                </div>
                <span class="px-3 py-1 text-sm font-medium rounded-full {
                  typeof value === 'boolean' && value ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  typeof value === 'boolean' && !value ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                  'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'
                }">
                  {formatSettingValue(value)}
                </span>
              </div>
            {/each}
          </div>
        </section>
      {/each}
    </div>
  {:else}
    <div class="text-center py-12">
      <p class="text-neutral-500 dark:text-neutral-400">Miscellaneous settings not found.</p>
    </div>
  {/if}
</div>