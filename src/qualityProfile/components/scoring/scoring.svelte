<script>
  import Toolbar from './toolbar/toolbar.svelte';
  
  export let custom_formats = [];
  
  let searchTerm = '';
  let selectedGroups = [];
  
  // Tag to group mapping
  const tagToGroupMapping = {
    'Audio': ['Audio', 'Dolby'],
    'HDR': ['HDR', 'Colour Grade'],
    'Release Groups': ['Release Groups', 'UnWanted', 'Release Group'],
    'Streaming Services': ['Streaming Service', 'WEB-DL'],
    'Codecs': ['Codec', 'Bleeding Edge'],
    'Storage': ['Storage', 'Lossless', '2160p'],
    'Release Group Tiers': ['Release Group Tier', 'GPPi'],
    'Resolution': ['Resolution', 'Ultra High Definition', '4K', '1080p', '720p', 'SD'],
    'Source': ['Source']
  };
  
  // Filter custom formats based on search term
  $: filteredFormats = custom_formats.filter(format => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    return format.name.toLowerCase().includes(search) ||
           format.tags.some(tag => tag.toLowerCase().includes(search));
  });
  
  // Group formats based on selected groups
  $: groupedFormats = (() => {
    const groups = {};
    const uncategorized = [];
    
    filteredFormats.forEach(format => {
      let belongsToGroup = false;
      
      // Check each selected group
      selectedGroups.forEach(groupName => {
        const groupTags = tagToGroupMapping[groupName] || [];
        const hasMatchingTag = format.tags.some(tag => 
          groupTags.some(groupTag => tag.includes(groupTag))
        );
        
        if (hasMatchingTag) {
          belongsToGroup = true;
          if (!groups[groupName]) {
            groups[groupName] = [];
          }
          groups[groupName].push(format);
        }
      });
      
      // If no group matched, add to uncategorized
      if (!belongsToGroup) {
        uncategorized.push(format);
      }
    });
    
    // Add uncategorized if there are any
    if (uncategorized.length > 0) {
      groups['Uncategorized'] = uncategorized;
    }
    
    return groups;
  })();
  
  function handleSearch(event) {
    searchTerm = event.detail;
  }
  
  function handleGroupChange(event) {
    selectedGroups = event.detail;
  }
</script>

<div>
  <h2 class="text-2xl font-bold mb-4">Scoring</h2>
  
  <Toolbar on:search={handleSearch} on:groupChange={handleGroupChange} />
  
  {#if selectedGroups.length === 0}
    <!-- Show ungrouped table when no groups selected -->
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-neutral-200">
            <th class="text-left p-2">Custom Format</th>
            <th class="text-left p-2">Score</th>
            <th class="text-left p-2">Tags</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredFormats as format}
            <tr class="border-b border-neutral-100 hover:bg-neutral-50">
              <td class="p-2">{format.name}</td>
              <td class="p-2">{format.score}</td>
              <td class="p-2">
                <div class="flex flex-wrap gap-1">
                  {#each format.tags as tag}
                    <span class="px-2 py-1 text-xs bg-neutral-100 rounded">{tag}</span>
                  {/each}
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <!-- Show grouped view -->
    {#each Object.entries(groupedFormats) as [groupName, formats]}
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2 text-neutral-700 dark:text-neutral-300">{groupName}</h3>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b border-neutral-200">
                <th class="text-left p-2">Custom Format</th>
                <th class="text-left p-2">Score</th>
                <th class="text-left p-2">Tags</th>
              </tr>
            </thead>
            <tbody>
              {#each formats as format}
                <tr class="border-b border-neutral-100 hover:bg-neutral-50">
                  <td class="p-2">{format.name}</td>
                  <td class="p-2">{format.score}</td>
                  <td class="p-2">
                    <div class="flex flex-wrap gap-1">
                      {#each format.tags as tag}
                        <span class="px-2 py-1 text-xs bg-neutral-100 rounded">{tag}</span>
                      {/each}
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/each}
  {/if}
</div>