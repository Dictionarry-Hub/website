<script>
  import Toolbar from './toolbar/toolbar.svelte';
  import Formats from './formats.svelte';
  import { PanelBottomOpen, TrendingUp, CopyPlus } from 'lucide-svelte';
  
  export let custom_formats = [];
  export let minCustomFormatScore = 0;
  export let upgradeUntilScore = null;
  export let minScoreIncrement = null;
  
  let searchTerm = '';
  let selectedGroups = [];
  let customTags = [];
  let minValue = null;
  let maxValue = null;
  
  // Calculate min and max scores from custom formats
  $: scoreRange = (() => {
    if (custom_formats.length === 0) return { min: -100000, max: 100000 };
    const scores = custom_formats.map(f => f.score);
    return {
      min: Math.min(...scores),
      max: Math.max(...scores)
    };
  })();
  
  // Reset min/max values when score range changes (new profile loaded)
  $: {
    minValue = scoreRange.min;
    maxValue = scoreRange.max;
  }
  
  // Calculate unique tag count
  $: uniqueTagCount = (() => {
    const allTags = new Set();
    custom_formats.forEach(format => {
      format.tags.forEach(tag => allTags.add(tag));
    });
    return allTags.size;
  })();
  
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
    'Source': ['Source'],
    'Indexer Flags': ['Flag']
  };
  
  // Filter custom formats based on search term and score range
  $: filteredFormats = custom_formats.filter(format => {
    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matchesSearch = format.name.toLowerCase().includes(search) ||
                          format.tags.some(tag => tag.toLowerCase().includes(search));
      if (!matchesSearch) return false;
    }
    
    // Filter by score range
    if (format.score < minValue || format.score > maxValue) return false;
    
    return true;
  });
  
  // Group formats based on selected groups
  $: groupedFormats = (() => {
    const groups = {};
    const uncategorized = [];
    
    // If "All Groups" is selected or no groups selected, return ungrouped
    if (selectedGroups.includes('All Groups') || selectedGroups.length === 0) {
      return {};
    }
    
    filteredFormats.forEach(format => {
      let belongsToGroup = false;
      
      // Check each selected group
      selectedGroups.forEach(groupName => {
        const groupTags = tagToGroupMapping[groupName] || [];
        let hasMatchingTag = false;
        
        // Check if it's a custom tag
        if (customTags.includes(groupName)) {
          // For custom tags, do case-insensitive comparison
          hasMatchingTag = format.tags.some(tag => 
            tag.toLowerCase().includes(groupName.toLowerCase())
          );
        } else {
          // For predefined groups, use the existing logic
          hasMatchingTag = format.tags.some(tag => 
            groupTags.some(groupTag => tag.includes(groupTag))
          );
        }
        
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
    selectedGroups = event.detail.selectedGroups;
    customTags = event.detail.customTags;
  }
  
  function handleValueChange(event) {
    minValue = event.detail.min;
    maxValue = event.detail.max;
  }
</script>

<div>
  <!-- Header Section -->
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Custom Formats</h2>
    
    <div class="flex items-center gap-2 flex-wrap justify-end">
      <span class="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300/70 dark:border-neutral-700/50 rounded-full text-xs font-medium flex items-center gap-1.5">
        <PanelBottomOpen class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span class="text-neutral-700 dark:text-neutral-300">Min: {minCustomFormatScore}</span>
      </span>
      
      {#if upgradeUntilScore !== null}
        <span class="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300/70 dark:border-neutral-700/50 rounded-full text-xs font-medium flex items-center gap-1.5">
          <TrendingUp class="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
          <span class="text-neutral-700 dark:text-neutral-300">Until: {upgradeUntilScore}</span>
        </span>
      {/if}
      
      {#if minScoreIncrement !== null}
        <span class="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300/70 dark:border-neutral-700/50 rounded-full text-xs font-medium flex items-center gap-1.5">
          <CopyPlus class="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
          <span class="text-neutral-700 dark:text-neutral-300">Increment: {minScoreIncrement}</span>
        </span>
      {/if}
      
      <span class="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300/70 dark:border-neutral-700/50 rounded-full text-xs font-medium flex items-center gap-1.5">
        <svg class="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        <span class="text-neutral-700 dark:text-neutral-300">{custom_formats.length} Formats</span>
      </span>
    </div>
  </div>
  
  <Toolbar 
    on:search={handleSearch} 
    on:groupChange={handleGroupChange}
    on:valueChange={handleValueChange}
    rangeMin={scoreRange.min}
    rangeMax={scoreRange.max}
    {minValue}
    {maxValue}
  />
  
  <Formats 
    {filteredFormats}
    {selectedGroups}
    {groupedFormats}
  />
</div>