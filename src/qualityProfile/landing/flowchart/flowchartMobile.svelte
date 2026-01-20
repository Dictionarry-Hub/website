<script>
  import { flowchartStore } from '@shared/stores/flowchart';
  import { flowchartColumns, getAvailableOptions, getMatchingProfile } from '@shared/constants/flowchartOptions';
  import { ChevronLeft, RotateCcw, Info, Link2, Clock, HelpCircle, ChevronDown, ChevronRight } from 'lucide-svelte';
  import * as icons from 'lucide-svelte';
  import InfoTooltip from '@shared/ui/infoTooltip.svelte';
  import Tooltip from '@shared/ui/tooltip.svelte';
  
  export let getRecommendedProfile = () => null;
  
  let state;
  
  flowchartStore.subscribe(value => {
    state = value;
  });
  
  function handleButtonClick(columnIndex, itemIndex) {
    flowchartStore.selectButton(columnIndex + 1, itemIndex + 1);
  }
  
  function goBack() {
    // Find the last selected column and unselect it
    for (let i = 5; i >= 1; i--) {
      if (state.selections[i]) {
        flowchartStore.selectButton(i, state.selections[i]);
        break;
      }
    }
  }
  
  function reset() {
    flowchartStore.reset();
  }
  
  $: isItemEnabled = (columnIndex, itemIndex) => {
    // First column is always enabled
    if (columnIndex === 0) return true;

    // Get available options for this column based on current selections
    const availableOptions = getAvailableOptions(state.selections, columnIndex + 1);
    const itemLabel = flowchartColumns[columnIndex].items[itemIndex].label;
    
    return availableOptions.includes(itemLabel);
  }
  
  // Get current active column (the one being selected)
  $: activeColumnIndex = state.currentColumn - 1;
  
  // Get selected items for breadcrumb trail
  $: selectedItems = Object.entries(state.selections).map(([col, itemIndex]) => {
    const colIndex = parseInt(col) - 1;
    const column = flowchartColumns[colIndex];
    const item = column?.items[itemIndex - 1];
    return {
      columnName: column?.name,
      itemLabel: item?.label,
      columnIndex: colIndex
    };
  });
  
  $: currentColumn = flowchartColumns[activeColumnIndex];
  $: hasSelections = Object.keys(state.selections).length > 0;
  $: recommendedProfile = state?.selections?.[5] ? getMatchingProfile(state.selections) : null;
  
  let isExpanded = false;
</script>

<div class="bg-white dark:bg-neutral-900 min-h-[400px]">
  <!-- Mobile header -->
  <div class="mb-6">
    <!-- Top row: Title -->
    <div class="mb-2">
      <h2 class="text-lg font-semibold text-neutral-900 dark:text-white">🧙 Profile Wizard</h2>
    </div>
    
    <!-- Profile Wizard description -->
    <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
      Select your preferences to find the ideal quality profile
    </p>
    
    <!-- Current column info - full width expandable -->
    {#if currentColumn && !state.selections[5]}
      {@const columnIcons = {
        'Resolution': 'Square',
        'Compression': 'Package',
        'Focus': 'Target',
        'Codec': 'Code',
        'HDR': 'Monitor'
      }}
      {@const IconComponent = icons[columnIcons[currentColumn.name]] || icons.Layers}
      <div class="bg-neutral-50 dark:bg-neutral-800/50 border-2 border-neutral-300 dark:border-neutral-700 rounded-lg">
        <button 
          on:click={() => isExpanded = !isExpanded}
          class="flex items-center justify-between w-full cursor-pointer p-4"
        >
          <div class="flex items-center gap-3 flex-1 justify-center">
            <svelte:component this={IconComponent} class="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            <span class="font-semibold text-base text-neutral-900 dark:text-white">{currentColumn.name}</span>
          </div>
          <ChevronDown class="w-5 h-5 text-neutral-600 dark:text-neutral-400 transition-transform duration-200 {isExpanded ? '' : '-rotate-90'} ml-4" />
        </button>
        {#if isExpanded && currentColumn.description}
          <div class="border-t border-neutral-200 dark:border-neutral-700 px-4 pb-4 pt-4">
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              {currentColumn.description}
            </p>
          </div>
        {/if}
      </div>
    {/if}
  </div>
  
  <!-- Progress breadcrumbs -->
  {#if selectedItems.length > 0}
    <div class="flex items-center gap-1 mb-4 overflow-x-auto pb-2">
      {#each selectedItems as selection, index}
        <div class="flex items-center gap-1 animate-in slide-in-from-left duration-300">
          <div class="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full text-[11px] font-medium text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
            {selection.itemLabel}
          </div>
          {#if index < selectedItems.length - 1}
            <ChevronLeft class="w-3 h-3 text-neutral-400 dark:text-neutral-500 rotate-180 flex-shrink-0" />
          {/if}
        </div>
      {/each}
    </div>
  {/if}
  
  <!-- Current column options -->
  {#if currentColumn && activeColumnIndex < flowchartColumns.length && !state.selections[5]}
    {#key JSON.stringify(state.selections)}
      <div class="grid grid-cols-1 gap-3">
        {#each currentColumn.items as item, itemIndex}
          <div class="option-animate" style="animation-delay: {itemIndex * 60}ms">
          <button
            class="w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left
              {state.selections[activeColumnIndex + 1] === itemIndex + 1
                ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100 shadow-md'
                : isItemEnabled(activeColumnIndex, itemIndex)
                  ? 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-[0.98]'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 border-neutral-200 dark:border-neutral-700 opacity-50 cursor-not-allowed'}"
            on:click={() => handleButtonClick(activeColumnIndex, itemIndex)}
            disabled={!isItemEnabled(activeColumnIndex, itemIndex)}
          >
            {#if item.icon}
              {@const Icon = icons[item.icon]}
              {#if Icon}
                <svelte:component this={Icon} class="w-5 h-5 flex-shrink-0" />
              {/if}
            {/if}
            <span class="font-medium text-base">{item.label}</span>
          </button>
        </div>
      {/each}
    </div>
    {/key}
  {/if}
  
  <!-- Action buttons -->
  {#if hasSelections}
    <div class="flex gap-3 mt-4">
      <button 
        on:click={goBack} 
        class="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-2 border-neutral-300 dark:border-neutral-700 rounded-lg hover:border-neutral-500 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
      >
        <ChevronLeft class="w-4 h-4" />
        Back
      </button>
      <button 
        on:click={reset} 
        class="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-2 border-neutral-300 dark:border-neutral-700 rounded-lg hover:border-neutral-500 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
      >
        <RotateCcw class="w-4 h-4" />
        Start Over
      </button>
    </div>
  {/if}
  
  <!-- Recommended Profile -->
  <div class="mt-6 mb-8">
    {#if recommendedProfile}
      {#if recommendedProfile.available && recommendedProfile.url}
        <a
          href={recommendedProfile.url}
          class="block w-full p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border-2 border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 dark:hover:border-neutral-500 transition-all"
        >
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Recommended Profile</div>
              <div class="text-base font-semibold text-neutral-900 dark:text-white">
                {recommendedProfile.name}
              </div>
            </div>
            <div class="w-10 h-10 bg-white dark:bg-neutral-700 rounded-full flex items-center justify-center">
              <Link2 class="w-5 h-5 text-neutral-400" />
            </div>
          </div>
        </a>
      {:else}
        <div class="w-full p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border-2 border-neutral-300 dark:border-neutral-700">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Recommended Profile</div>
              <div class="text-base font-semibold text-neutral-500 dark:text-neutral-400">
                {recommendedProfile.name}
              </div>
            </div>
            <Tooltip text="This profile is coming soon" position="left">
              <div class="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <Clock class="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </Tooltip>
          </div>
        </div>
      {/if}
    {:else}
      <div class="w-full p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border-2 border-neutral-300 dark:border-neutral-700 opacity-60">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Recommended Profile</div>
            <div class="text-base font-medium text-neutral-400 dark:text-neutral-500">
              Complete your selection
            </div>
          </div>
          <div class="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
            <HelpCircle class="w-5 h-5 text-neutral-400" />
          </div>
        </div>
      </div>
    {/if}
  </div>
  
  
</div>

<style>
  @keyframes slide-in-from-left {
    from {
      transform: translateX(-10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slide-in-from-right {
    from {
      transform: translateX(10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes option-appear {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .animate-in {
    animation-fill-mode: both;
  }
  
  .slide-in-from-left {
    animation: slide-in-from-left 0.3s ease-out;
  }
  
  .slide-in-from-right {
    animation: slide-in-from-right 0.3s ease-out;
  }
  
  .fade-in {
    animation: fade-in 0.3s ease-out;
  }
  
  .option-animate {
    animation: option-appear 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
</style>