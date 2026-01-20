<script>
  import { flowchartStore } from '@shared/stores/flowchart';
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  import FlowchartItem from './flowchartItem.svelte';
  import FlowchartMobile from './flowchartMobile.svelte';
  import { flowchartColumns, getAvailableOptions, getMatchingProfile } from '@shared/constants/flowchartOptions';
  import { calculateFlowchartPath } from '@shared/utils/flowchartPath';
  import InfoTooltip from '@shared/ui/infoTooltip.svelte';
  import Tooltip from '@shared/ui/tooltip.svelte';
  import { Link2, Clock, HelpCircle } from 'lucide-svelte';
  
  export let getRecommendedProfile = () => null;
  
  let state;
  let containerRef;
  let buttonRefs = {};
  let svgPaths = [];
  let potentialPaths = [];
  let hoveredButton = null;
  let isMobile = false;
  
  flowchartStore.subscribe(value => {
    state = value;
  });
  
  $: recommendedProfile = state?.selections?.[5] ? getMatchingProfile(state.selections) : null;
  
  function handleButtonClick(columnIndex, itemIndex) {
    flowchartStore.selectButton(columnIndex + 1, itemIndex + 1);
  }
  
  function getButtonRef(columnIndex, itemIndex) {
    return `button-${columnIndex}-${itemIndex}`;
  }
  
  $: isItemEnabled = (columnIndex, itemIndex) => {
    // First column is always enabled
    if (columnIndex === 0) return true;

    // Get available options for this column based on current selections
    const availableOptions = getAvailableOptions(state.selections, columnIndex + 1);
    const itemLabel = flowchartColumns[columnIndex].items[itemIndex].label;
    
    return availableOptions.includes(itemLabel);
  }
  
  function checkMobile() {
    isMobile = window.innerWidth < 1500; // Switch to mobile below 1500px
    if (!isMobile) {
      updatePaths();
    }
  }
  
  function calculatePath(fromCol, fromButton, toCol, toButton) {
    const fromRef = buttonRefs[getButtonRef(fromCol - 1, fromButton - 1)];
    const toRef = buttonRefs[getButtonRef(toCol - 1, toButton - 1)];
    
    if (!fromRef || !toRef || !containerRef) return '';
    
    const containerRect = containerRef.getBoundingClientRect();
    // Get the button element inside the wrapper div
    const fromButtonEl = fromRef.querySelector('button');
    const toButtonEl = toRef.querySelector('button');
    
    if (!fromButtonEl || !toButtonEl) return '';
    
    const fromRect = fromButtonEl.getBoundingClientRect();
    const toRect = toButtonEl.getBoundingClientRect();
    
    return calculateFlowchartPath({
      fromRect,
      toRect,
      containerRect
    });
  }
  
  function updatePaths() {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      const paths = [];
      const potential = [];
      
      // For each column with a selection
      for (let col = 1; col < state.currentColumn && col < 5; col++) {
        if (state.selections[col] && state.selections[col + 1]) {
          const pathData = calculatePath(col, state.selections[col], col + 1, state.selections[col + 1]);
          if (pathData) {
            paths.push({
              id: `path-${col}-${col + 1}`,
              d: pathData
            });
          }
        }
      }
      
      // Calculate potential paths for the next unselected column
      if (state.currentColumn > 1 && state.currentColumn <= 5) {
        const lastSelectedCol = state.currentColumn - 1;
        const lastSelection = state.selections[lastSelectedCol];
        
        if (lastSelection && !state.selections[state.currentColumn]) {
          // Get all enabled items in the current column
          const currentColIndex = state.currentColumn - 1;
          if (currentColIndex < flowchartColumns.length) {
            flowchartColumns[currentColIndex].items.forEach((item, itemIndex) => {
              if (isItemEnabled(currentColIndex, itemIndex)) {
                const pathData = calculatePath(lastSelectedCol, lastSelection, state.currentColumn, itemIndex + 1);
                if (pathData) {
                  potential.push({
                    id: `potential-${lastSelectedCol}-${state.currentColumn}-${itemIndex}`,
                    d: pathData,
                    toButton: `${currentColIndex}-${itemIndex}`
                  });
                }
              }
            });
          }
        }
      }
      
      svgPaths = paths;
      potentialPaths = potential;
    }, 10);
  }
  
  onMount(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
  });
  
  onDestroy(() => {
    window.removeEventListener('resize', checkMobile);
  });
  
  afterUpdate(() => {
    updatePaths();
  });
</script>

<div>
  {#if isMobile}
    <FlowchartMobile {getRecommendedProfile} />
  {:else}
    <!-- Desktop Flowchart -->
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8 mb-8">
      <div class="col-span-1 lg:col-span-3">
        <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-1">
          🧙 Profile Wizard
        </h2>
        <p class="text-sm text-neutral-600 dark:text-neutral-400">
          Select your preferences to find the ideal quality profile for your content<span class="hidden lg:inline">. Hover over column headers for more information</span>
        </p>
      </div>
      <div class="flex col-span-1 lg:col-span-2 items-center lg:justify-end">
        {#if recommendedProfile}
          {#if recommendedProfile.available && recommendedProfile.url}
            <a
              href={recommendedProfile.url}
              class="group relative flex items-center gap-3 px-4 py-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 w-full lg:w-auto"
            >
              <div class="flex-1">
                <div class="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-0.5">Recommended Profile</div>
                <div class="text-sm font-semibold text-neutral-900 dark:text-white">
                  {recommendedProfile.name}
                </div>
              </div>
              <div class="w-8 h-8 bg-white dark:bg-neutral-700 rounded-full flex items-center justify-center">
                <Link2 class="w-4 h-4 text-neutral-400" />
              </div>
            </a>
          {:else}
            <div class="relative flex items-center gap-3 px-4 py-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700 w-full lg:w-auto">
              <div class="flex-1">
                <div class="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-0.5">Recommended Profile</div>
                <div class="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                  {recommendedProfile.name}
                </div>
              </div>
              <Tooltip text="This profile is coming soon" position="left">
                <div class="w-8 h-8 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center cursor-help">
                  <Clock class="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
              </Tooltip>
            </div>
          {/if}
        {:else}
          <div class="relative flex items-center gap-3 px-4 py-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700 opacity-60 w-full lg:w-auto">
            <div class="flex-1">
              <div class="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-0.5">Recommended Profile</div>
              <div class="text-sm font-medium text-neutral-400 dark:text-neutral-500">
                Complete your selection
              </div>
            </div>
            <div class="w-8 h-8 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
              <HelpCircle class="w-4 h-4 text-neutral-400" />
            </div>
          </div>
        {/if}
      </div>
    </div>
    
    <div class="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg" bind:this={containerRef}>
      <!-- Button Grid -->
      <div class="relative grid grid-cols-5">
        {#each flowchartColumns as column, columnIndex}
          <div class="relative p-4 h-full min-h-[320px] {columnIndex < 4 ? 'border-r' : ''} border-neutral-200 dark:border-neutral-700 {columnIndex + 1 === state.currentColumn && state.currentColumn <= 5 && !state.selections[5] ? 'bg-neutral-50 dark:bg-neutral-800/30' : ''} {columnIndex === 0 && state.currentColumn === 1 && !state.selections[5] ? 'rounded-l-lg' : ''} {columnIndex === 4 && state.currentColumn === 5 && !state.selections[5] ? 'rounded-r-lg' : ''}">
            <!-- Column header -->
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
              {#if column.description}
                <InfoTooltip content={column.description} position="top">
                  <span class="px-3 py-1 bg-white dark:bg-neutral-900 border rounded text-[10px] font-mono uppercase tracking-wider cursor-help {columnIndex + 1 === state.currentColumn && !state.selections[5] ? 'border-neutral-400 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 font-bold' : columnIndex + 1 > state.currentColumn ? 'border-neutral-200 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500' : 'border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400'}">
                    {column.name}
                  </span>
                </InfoTooltip>
              {:else}
                <span class="px-3 py-1 bg-white dark:bg-neutral-900 border rounded text-[10px] font-mono uppercase tracking-wider {columnIndex + 1 === state.currentColumn && !state.selections[5] ? 'border-neutral-400 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 font-bold' : columnIndex + 1 > state.currentColumn ? 'border-neutral-200 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500' : 'border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400'}">
                  {column.name}
                </span>
              {/if}
            </div>
            <div class="flex h-full flex-col items-center justify-evenly gap-3 pt-6 {columnIndex + 1 > state.currentColumn ? 'opacity-30' : ''}">
              {#each column.items as item, itemIndex}
                <div 
                  bind:this={buttonRefs[getButtonRef(columnIndex, itemIndex)]}
                  on:mouseenter={() => hoveredButton = `${columnIndex}-${itemIndex}`}
                  on:mouseleave={() => hoveredButton = null}
                >
                  <FlowchartItem
                    label={item.label}
                    icon={item.icon}
                    isSelected={state.selections[columnIndex + 1] === itemIndex + 1}
                    isPortrait={false}
                    isEnabled={isItemEnabled(columnIndex, itemIndex)}
                    onClick={() => handleButtonClick(columnIndex, itemIndex)}
                  />
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    
    <!-- SVG Overlay for curves - positioned after buttons to ensure proper z-index -->
    <svg class="absolute inset-0 pointer-events-none" width="100%" height="100%">
      <!-- Potential paths (dotted) -->
      {#each potentialPaths as path}
        <path
          d={path.d}
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-dasharray="5,5"
          class="text-neutral-300 dark:text-neutral-600 transition-all duration-300 {hoveredButton === path.toButton ? 'pulse-line opacity-100' : 'opacity-40'}"
        />
      {/each}
      
      <!-- Selected paths (solid) -->
      {#each svgPaths as path}
        <path
          d={path.d}
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="text-neutral-400 dark:text-neutral-500"
        />
      {/each}
    </svg>
  </div>
  {/if}
</div>

<style>
  @keyframes pulse {
    0%, 100% {
      opacity: 0.2;
      stroke-width: 2;
    }
    50% {
      opacity: 1;
      stroke-width: 3;
    }
  }
  
  :global(.pulse-line) {
    animation: pulse 1.2s ease-in-out infinite;
  }
</style>