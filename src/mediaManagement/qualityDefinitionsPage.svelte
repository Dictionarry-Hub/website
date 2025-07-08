<script>
  import { routes } from '../generated/routes';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { Film, Tv } from 'lucide-svelte';
  import Chart from 'chart.js/auto';

  // Find the quality definitions data
  $: qualityDefinitionsData = routes.find(r => r.slug === 'qualitydefinitions' && r.type === 'media-management')?.data;

  onMount(() => {
    setNavigationItems([
      'Radarr',
      'Sonarr'
    ], '#/media-management/qualitydefinitions');
  });

  onDestroy(() => {
    clearNavigation();
  });

  function getScale(service) {
    return service.toLowerCase() === 'radarr' ? 2000 : 1000;
  }

  function formatFileSize(mb) {
    if (mb >= 1000) {
      return `${(mb / 1000).toFixed(1)}GB`;
    }
    return `${mb}MB`;
  }

  function getDotPositions(values, scale) {
    let minPos = (values.min / scale) * 100;
    let prefPos = (values.preferred / scale) * 100;
    let maxPos = (values.max / scale) * 100;
    
    const minGap = 2; // minimum gap between dots in %
    
    // Force order: min always leftmost, max always rightmost
    if (prefPos < minPos + minGap) {
      prefPos = minPos + minGap;
    }
    if (maxPos < prefPos + minGap) {
      maxPos = prefPos + minGap;
    }
    
    // Cap at 100%
    if (maxPos > 100) {
      maxPos = 100;
      prefPos = Math.min(prefPos, 100 - minGap);
      minPos = Math.min(minPos, prefPos - minGap);
    }
    
    return { minPos, prefPos, maxPos };
  }

  function chartAction(canvas, { quality, values, scale }) {
    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Range'],
        datasets: [{
          label: 'Min',
          data: [values.min],
          backgroundColor: 'rgba(239, 68, 68, 0.5)',
          borderColor: 'rgb(239, 68, 68)',
          borderWidth: 1
        }, {
          label: 'Preferred',
          data: [values.preferred],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1
        }, {
          label: 'Max',
          data: [values.max],
          backgroundColor: 'rgba(34, 197, 94, 0.5)',
          borderColor: 'rgb(34, 197, 94)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            display: false
          },
          y: {
            max: scale,
            min: 0,
            ticks: {
              callback: function(value) {
                return formatFileSize(value);
              }
            }
          }
        }
      }
    });

    return {
      destroy() {
        chart.destroy();
      }
    };
  }
</script>

<div class="p-6 max-w-4xl mx-auto">
  <div class="space-y-4 mb-8">
    <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Quality Definitions</h1>
    <p class="text-neutral-600 dark:text-neutral-400">
      File size limits for different video qualities in Radarr and Sonarr.
    </p>
  </div>

  {#if qualityDefinitionsData?.qualityDefinitions}
    <div class="space-y-8">
      {#each Object.entries(qualityDefinitionsData.qualityDefinitions) as [service, qualities]}
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
          
          <div class="overflow-x-auto">
            <table class="w-full table-fixed">
              <thead>
                <tr class="border-b border-neutral-200 dark:border-neutral-700">
                  <th class="w-1/3 px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Quality
                  </th>
                  <th class="w-2/3 px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Range
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-200 dark:divide-neutral-700">
                {#each Object.entries(qualities) as [quality, values]}
                  <tr class="hover:bg-neutral-50 dark:hover:bg-neutral-700/50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {quality}
                    </td>
                    <td class="px-6 py-4">
                      <div class="w-full max-w-sm space-y-2">
                        {#each [getDotPositions(values, getScale(service))] as positions}
                          <div class="relative h-4">
                            <div class="absolute top-1 h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                            <div 
                              class="absolute w-3 h-3 bg-red-500 rounded-full transform -translate-x-1.5 -translate-y-1/2 hover:scale-125 transition-transform cursor-pointer"
                              style="left: {positions.minPos}%; top: 50%;"
                              title="Min: {formatFileSize(values.min)}"
                            ></div>
                            <div 
                              class="absolute w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1.5 -translate-y-1/2 hover:scale-125 transition-transform cursor-pointer"
                              style="left: {positions.prefPos}%; top: 50%;"
                              title="Preferred: {formatFileSize(values.preferred)}"
                            ></div>
                            <div 
                              class="absolute w-3 h-3 bg-green-500 rounded-full transform -translate-x-1.5 -translate-y-1/2 hover:scale-125 transition-transform cursor-pointer"
                              style="left: {positions.maxPos}%; top: 50%;"
                              title="Max: {formatFileSize(values.max)}"
                            ></div>
                          </div>
                        {/each}
                        <div class="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                          <span>Min: <span class="text-red-500">{formatFileSize(values.min)}</span></span>
                          <span>Preferred: <span class="text-blue-500">{formatFileSize(values.preferred)}</span></span>
                          <span>Max: <span class="text-green-500">{formatFileSize(values.max)}</span></span>
                        </div>
                      </div>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </section>
      {/each}
    </div>
  {:else}
    <div class="text-center py-12">
      <p class="text-neutral-500 dark:text-neutral-400">Quality definitions not found.</p>
    </div>
  {/if}
</div>