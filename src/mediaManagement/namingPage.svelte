<script>
  import { routes } from '../generated/routes';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { Film, Tv } from 'lucide-svelte';

  // Find the naming data
  $: namingData = routes.find(r => r.slug === 'naming' && r.type === 'media-management')?.data;

  onMount(() => {
    setNavigationItems([
      'Radarr',
      'Sonarr'
    ]);
  });

  onDestroy(() => {
    clearNavigation();
  });

  function formatYamlValue(value) {
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'number') {
      return value.toString();
    }
    return JSON.stringify(value, null, 2);
  }
</script>

<div class="p-6 max-w-4xl mx-auto">
  <div class="space-y-4 mb-8">
    <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Naming Settings</h1>
    <p class="text-neutral-600 dark:text-neutral-400">
      File and folder naming configuration for Radarr and Sonarr.
    </p>
  </div>

  {#if namingData}
    <div class="space-y-8">
      {#each Object.entries(namingData) as [section, config]}
        <section class="bg-neutral-50 dark:bg-neutral-800 rounded-lg">
          <div class="flex items-center space-x-3 p-4 border-b border-neutral-200 dark:border-neutral-700">
            {#if section.toLowerCase() === 'radarr'}
              <div class="p-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Film class="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            {:else if section.toLowerCase() === 'sonarr'}
              <div class="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Tv class="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            {/if}
            <h2 id="{section.toLowerCase()}" class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 capitalize">
              {section}
            </h2>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <tbody>
                {#each Object.entries(config) as [key, value]}
                  {#if value !== '' && value !== null && value !== undefined}
                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-700 dark:text-neutral-300 w-64">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </td>
                      <td class="px-6 py-4 text-xs font-mono">
                        <div class="bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 p-2 rounded overflow-x-auto">
                          {formatYamlValue(value)}
                        </div>
                      </td>
                    </tr>
                  {/if}
                {/each}
              </tbody>
            </table>
          </div>
        </section>
      {/each}
    </div>
  {:else}
    <div class="text-center py-12">
      <p class="text-neutral-500 dark:text-neutral-400">Naming configuration not found.</p>
    </div>
  {/if}
</div>