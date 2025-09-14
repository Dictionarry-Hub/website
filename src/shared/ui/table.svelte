<script>
  import { onMount } from 'svelte';
  import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-svelte';
  import { router } from 'tinro';
  
  export let headers = [];
  export let data = [];
  export let defaultSort = null;
  export let defaultDirection = 'asc';
  
  let sortColumn = defaultSort;
  let sortDirection = defaultDirection;
  let sortedData = [...data];
  
  $: {
    sortedData = [...data];
    if (sortColumn) {
      sortData();
    }
  }
  
  onMount(() => {
    if (defaultSort) {
      sortData();
    }
  });
  
  function handleSort(column) {
    if (sortColumn === column) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn = column;
      sortDirection = 'asc';
    }
    sortData();
  }
  
  function sortData() {
    const header = headers.find(h => h.key === sortColumn);
    if (!header) return;
    
    sortedData = [...sortedData].sort((a, b) => {
      let aVal = getValue(a, sortColumn);
      let bVal = getValue(b, sortColumn);
      
      if (header.type === 'date') {
        aVal = aVal ? new Date(aVal) : new Date(0);
        bVal = bVal ? new Date(bVal) : new Date(0);
      } else if (header.type === 'number') {
        aVal = Number(aVal) || 0;
        bVal = Number(bVal) || 0;
      } else {
        aVal = String(aVal || '').toLowerCase();
        bVal = String(bVal || '').toLowerCase();
      }
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  function getValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  }
  
  function formatValue(value, type, format) {
    if (value === null || value === undefined) return '';
    
    if (type === 'date' && value) {
      const date = new Date(value);
      if (format) {
        return format(date);
      }
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    if (format) {
      return format(value);
    }
    
    return value;
  }
</script>

<div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
  <!-- Mobile view -->
  <div class="md:hidden">
    <table class="w-full">
      <tbody>
        {#each sortedData as row}
          <tr class="border-b border-neutral-200 dark:border-neutral-700 last:border-b-0">
            <td class="p-4">
              {#each headers as header}
                <div class="flex justify-between items-start py-1">
                  <span class="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase">{header.label}:</span>
                  <div class="text-right ml-2">
                    {#if header.render}
                      {@html header.render(row)}
                    {:else if header.link}
                      <a 
                        href={getValue(row, header.link)} 
                        class="font-medium text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {formatValue(getValue(row, header.key), header.type, header.format)}
                      </a>
                    {:else}
                      <span class="text-sm text-neutral-700 dark:text-neutral-300">
                        {formatValue(getValue(row, header.key), header.type, header.format)}
                      </span>
                    {/if}
                  </div>
                </div>
              {/each}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  
  <!-- Desktop view -->
  <div class="hidden md:block overflow-x-auto">
    <table class="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
      <thead class="bg-neutral-50 dark:bg-neutral-800">
        <tr>
          {#each headers as header}
            <th 
              scope="col" 
              class="text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider {header.sortable !== false ? 'cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700' : ''}"
              on:click={() => header.sortable !== false && handleSort(header.key)}
            >
              <div class="px-6 py-3 flex items-center gap-2">
                <span class="{header.sortable !== false ? 'hover:text-neutral-700 dark:hover:text-neutral-100' : ''}">{header.label}</span>
                {#if header.sortable !== false}
                  {#if sortColumn === header.key}
                    {#if sortDirection === 'asc'}
                      <ChevronUp size={14} class="text-blue-600 dark:text-blue-400" />
                    {:else}
                      <ChevronDown size={14} class="text-blue-600 dark:text-blue-400" />
                    {/if}
                  {:else}
                    <ChevronsUpDown size={14} class="opacity-40" />
                  {/if}
                {/if}
              </div>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody class="divide-y divide-neutral-200 dark:divide-neutral-700">
        {#each sortedData as row}
          <tr class="hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors cursor-pointer group" on:click={() => row.url && router.goto(row.url)}>
            {#each headers as header}
              <td class="text-sm {header.className || ''}">
                {#if header.render}
                  <div class="px-6 py-4">
                    {@html header.render(row)}
                  </div>
                {:else if header.link}
                  <a 
                    href={getValue(row, header.link)} 
                    class="block px-6 py-4 font-medium text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {formatValue(getValue(row, header.key), header.type, header.format)}
                  </a>
                {:else}
                  <div class="px-6 py-4 text-neutral-500 dark:text-neutral-400">
                    {formatValue(getValue(row, header.key), header.type, header.format)}
                  </div>
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>