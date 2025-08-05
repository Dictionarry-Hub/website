<script>
  import { flowchartStore } from '@shared/stores/flowchart';
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  import FlowchartItem from './flowchartItem.svelte';
  import FlowchartMobile from './flowchartMobile.svelte';
  import { flowchartColumns, flowchartEdges } from '@shared/constants/flowchartOptions';
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
  
  $: recommendedProfile = state?.selections?.[5] ? getRecommendedProfile(state.selections) : null;
  
  function handleButtonClick(columnIndex, itemIndex) {
    flowchartStore.selectButton(columnIndex + 1, itemIndex + 1);
  }
  
  function getButtonRef(columnIndex, itemIndex) {
    return `button-${columnIndex}-${itemIndex}`;
  }
  
  function isItemEnabled(columnIndex, itemIndex) {
    // First column is always enabled
    if (columnIndex === 0) return true;

    const prevColumnIndex = columnIndex - 1;
    const prevSelection = state.selections[prevColumnIndex + 1];
    if (!prevSelection) return false;

    const currentColId = flowchartColumns[columnIndex].id;

    // Custom logic for the 'Focus' column (col3)
    if (currentColId === 'col3') {
      const resolutionSelection = state.selections[1]; // col1: Resolution
      const compressionSelection = state.selections[2]; // col2: Compression

      // If compression is Lossless (index 0), only Quality (index 0) is enabled
      if (compressionSelection === 1) {
        return itemIndex === 0;
      }

      // If compression is Compressed (index 1)
      if (compressionSelection === 2) {
        // SD (index 0) or 720p (index 1) + Compressed -> only Quality (index 0) is enabled
        if (resolutionSelection === 1 || resolutionSelection === 2) {
          return itemIndex === 0; // Quality
        }

        // 1080p (index 2) + Compressed -> all are enabled
        if (resolutionSelection === 3) {
          return true; // Quality, Balanced, Efficient
        }

        // 2160p (index 3) + Compressed -> Quality (index 0) and Balanced (index 1) are enabled
        if (resolutionSelection === 4) {
          return itemIndex === 0 || itemIndex === 1; // Quality, Balanced
        }
      }

      // Default to disabled if no rule matches
      return false;
    }

    // Custom logic for the 'Codec' column (col4)
    if (currentColId === 'col4') {
      const resolutionSelection = state.selections[1]; // col1: Resolution
      const compressionSelection = state.selections[2]; // col2: Compression
      const focusSelection = state.selections[3]; // col3: Focus

      // Everything 2160p only gets h265
      if (resolutionSelection === 4) {
        return itemIndex === 0; // h265 only
      }

      // Everything SD and 720p gets h264
      if (resolutionSelection === 1 || resolutionSelection === 2) {
        return itemIndex === 1; // h264 only
      }

      // 1080p logic
      if (resolutionSelection === 3) {
        // 1080p quality compressed gets h265 and h264
        if (compressionSelection === 2 && focusSelection === 1) {
          return true; // Both h265 and h264
        }
        // 1080p quality lossless gets h264
        if (compressionSelection === 1 && focusSelection === 1) {
          return itemIndex === 1; // h264 only
        }
        // 1080p balanced gets h264
        if (focusSelection === 2) {
          return itemIndex === 1; // h264 only
        }
        // 1080p efficient gets h265
        if (focusSelection === 3) {
          return itemIndex === 0; // h265 only
        }
      }

      // Default to disabled if no rule matches
      return false;
    }

    // Custom logic for the 'HDR' column (col5)
    if (currentColId === 'col5') {
      const resolutionSelection = state.selections[1]; // col1: Resolution
      const focusSelection = state.selections[3]; // col3: Focus
      const codecSelection = state.selections[4]; // col4: Codec

      // h264 only gets SDR
      if (codecSelection === 2) {
        return itemIndex === 1; // SDR only
      }

      // h265 logic
      if (codecSelection === 1) {
        // 1080p efficient h265 only gets SDR
        if (resolutionSelection === 3 && focusSelection === 3) {
          return itemIndex === 1; // SDR only
        }
        // All other h265 only gets HDR (no SDR)
        return itemIndex === 0; // HDR only
      }

      // Default to disabled if no rule matches
      return false;
    }

    // Default logic for all other columns
    const prevColId = flowchartColumns[prevColumnIndex].id;
    const edgeKey = `${prevColId}:${prevSelection - 1}`;
    const allowedConnections = flowchartEdges[edgeKey] || [];

    return allowedConnections.includes(`${currentColId}:${itemIndex}`);
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
    
    // Horizontal layout only for desktop
    const fromX = fromRect.right - containerRect.left;
    const fromY = fromRect.top + fromRect.height / 2 - containerRect.top;
    const toX = toRect.left - containerRect.left;
    const toY = toRect.top + toRect.height / 2 - containerRect.top;
    
    // Add horizontal line extensions
    const lineExtension = 10;
    const startX = fromX - lineExtension;
    const endX = toX + lineExtension;
    
    // Calculate control points for bezier curve
    const distance = toX - fromX;
    const controlOffset = distance * 0.4;
    
    // Path with horizontal line extensions
    return `M ${startX} ${fromY} L ${fromX} ${fromY} C ${fromX + controlOffset} ${fromY}, ${toX - controlOffset} ${toY}, ${toX} ${toY} L ${endX} ${toY}`;
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
          {#if recommendedProfile.url}
            <a 
              href={recommendedProfile.url} 
              class="group relative flex items-center gap-3 px-4 py-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all w-full lg:w-auto"
            >
              <div class="flex-1">
                <div class="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-0.5">Recommended Profile</div>
                <div class="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {recommendedProfile.name}
                </div>
              </div>
              <div class="w-8 h-8 bg-white dark:bg-neutral-700 rounded-full flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                <Link2 class="w-4 h-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </div>
              <div class="absolute inset-0 rounded-lg ring-1 ring-blue-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
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
      <div class="relative grid {state.currentColumn === 1 ? 'grid-cols-1' : state.currentColumn === 2 ? 'grid-cols-2' : state.currentColumn === 3 ? 'grid-cols-3' : state.currentColumn === 4 ? 'grid-cols-4' : 'grid-cols-5'}">
        {#each flowchartColumns as column, columnIndex}
          {#if columnIndex + 1 <= state.currentColumn}
            <div class="relative p-4 h-full {columnIndex + 1 < state.currentColumn ? 'border-r' : ''} border-neutral-200 dark:border-neutral-700">
              <!-- Column header -->
              <div class="absolute -top-4 left-1/2 -translate-x-1/2">
                {#if column.description}
                  <InfoTooltip content={column.description} position="top">
                    <span class="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 cursor-help">
                      {column.name}
                    </span>
                  </InfoTooltip>
                {:else}
                  <span class="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {column.name}
                  </span>
                {/if}
              </div>
              <div class="flex h-full flex-col items-center justify-evenly gap-3 pt-6">
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
          {/if}
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