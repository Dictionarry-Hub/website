<script>
  import { contentDatabase } from '@db';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { Film, Tv, ToggleLeft } from 'lucide-svelte';

  // Find the misc settings data
  $: miscData = contentDatabase.entries.find(e => e.slug === 'misc' && e.type === 'media-management')?.data;

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
    const settingNames = {
      'propersRepacks': 'Prefer Propers & Repacks',
      'enableMediaInfo': 'Enable MediaInfo'
    };
    return settingNames[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }

  function getSettingDescription(key) {
    const descriptions = {
      'propersRepacks': 'Uses Radarr/Sonarr logic to prefer releases marked as propers and repacks. This overwrites custom format scores and should typically be disabled.',
      'enableMediaInfo': 'Required to analyze media files and extract information such as HDR, audio codecs, etc. for renaming purposes.'
    };
    return descriptions[key] || '';
  }
</script>

<div>
  <div class="mb-12">
    <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Miscellaneous Settings</h1>
    
    {#if miscData}
      {#each Object.entries(miscData) as [service, settings]}
        <section id={service.toLowerCase()} class="mb-8">
          <div class="flex flex-col md:flex-row md:items-start gap-4 mb-6">
            <h2 class="text-2xl font-bold text-neutral-900 dark:text-white md:w-1/4">
              {service.charAt(0).toUpperCase() + service.slice(1)}
            </h2>
            
            <div class="flex flex-wrap gap-2 md:w-3/4 md:justify-end">
              <span class="px-3 py-1 bg-white dark:bg-neutral-900 
                           border border-neutral-300/70 dark:border-neutral-700/50 
                           rounded-full text-xs font-medium flex items-center gap-1.5">
                {#if service.toLowerCase() === 'radarr'}
                  <Film class="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
                  <span class="text-neutral-700 dark:text-neutral-300">Movies</span>
                {:else}
                  <Tv class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span class="text-neutral-700 dark:text-neutral-300">Series</span>
                {/if}
              </span>
            </div>
          </div>

          <div class="space-y-4">
            {#each Object.entries(settings) as [key, value]}
              <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <ToggleLeft class="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                    <h3 class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {formatSettingName(key)}
                    </h3>
                  </div>
                  {#if typeof value === 'boolean'}
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium {
                      value 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }">
                      {value ? 'Enabled' : 'Disabled'}
                    </span>
                  {:else}
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400">
                      {value}
                    </span>
                  {/if}
                </div>
                {#if getSettingDescription(key)}
                  <p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {getSettingDescription(key)}
                  </p>
                {/if}
              </div>
            {/each}
          </div>
        </section>
      {/each}
    {:else}
      <div class="text-center py-12">
        <p class="text-neutral-500 dark:text-neutral-400">Miscellaneous settings not found.</p>
      </div>
    {/if}
  </div>
</div>