<script>
  import { flowchartStore } from '@shared/stores/flowchart';
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  import FlowchartItem from './flowchartItem.svelte';
  import { flowchartColumns, flowchartEdges } from '@shared/constants/flowchartOptions';
  import InfoTooltip from '@shared/ui/infoTooltip.svelte';
  import ColumnInfoTooltip from '@shared/ui/columnInfoTooltip.svelte';
  import { Info } from 'lucide-svelte';
  
  let state;
  let containerRef;
  let buttonRefs = {};
  let svgPaths = [];
  let isPortrait = false;
  
  flowchartStore.subscribe(value => {
    state = value;
  });
  
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
  
  function checkOrientation() {
    isPortrait = window.innerHeight > window.innerWidth;
    updatePaths();
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
    
    if (isPortrait) {
      // Vertical layout - curves go from bottom to top
      const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
      const fromY = fromRect.bottom - containerRect.top;
      const toX = toRect.left + toRect.width / 2 - containerRect.left;
      const toY = toRect.top - containerRect.top;
      
      // Add vertical line extensions
      const lineExtension = 10;
      const startY = fromY - lineExtension;
      const endY = toY + lineExtension;
      
      // Calculate control points for vertical bezier curve
      const distance = toY - fromY;
      const controlOffset = distance * 0.4;
      
      // Path with vertical line extensions
      return `M ${fromX} ${startY} L ${fromX} ${fromY} C ${fromX} ${fromY + controlOffset}, ${toX} ${toY - controlOffset}, ${toX} ${toY} L ${toX} ${endY}`;
    } else {
      // Horizontal layout - curves go from left to right
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
  }
  
  function updatePaths() {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      const paths = [];
      
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
      
      svgPaths = paths;
    }, 10);
  }
  
  onMount(() => {
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
  });
  
  onDestroy(() => {
    window.removeEventListener('resize', checkOrientation);
    window.removeEventListener('orientationchange', checkOrientation);
  });
  
  afterUpdate(() => {
    updatePaths();
  });
</script>

<div>
  <!-- Header -->
  
  <div class="border-t border-neutral-200 dark:border-neutral-700 mb-6"></div>
  
  <!-- Flowchart Columns/Rows -->
  <div class="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg" bind:this={containerRef}>
    <!-- Button Grid -->
    <div class="relative grid {isPortrait 
      ? (state.currentColumn === 1 ? 'grid-rows-1' : state.currentColumn === 2 ? 'grid-rows-2' : state.currentColumn === 3 ? 'grid-rows-3' : state.currentColumn === 4 ? 'grid-rows-4' : 'grid-rows-5')
      : (state.currentColumn === 1 ? 'grid-cols-1' : state.currentColumn === 2 ? 'grid-cols-2' : state.currentColumn === 3 ? 'grid-cols-3' : state.currentColumn === 4 ? 'grid-cols-4' : 'grid-cols-5')}">
      {#each flowchartColumns as column, columnIndex}
        {#if columnIndex + 1 <= state.currentColumn}
          <div class="relative {isPortrait ? 'p-2 py-6' : 'p-4 h-full'} {columnIndex + 1 < state.currentColumn ? (isPortrait ? 'border-b' : 'border-r') : ''} border-neutral-200 dark:border-neutral-700">
            {#if isPortrait && column.description}
              <!-- Info icon for portrait mode -->
              <div class="absolute right-2 top-1/2 -translate-y-1/2 z-10">
                <ColumnInfoTooltip title={column.name} content={column.description} position="top">
                  <button class="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-700 transition-colors touch-manipulation">
                    <Info class="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
                  </button>
                </ColumnInfoTooltip>
              </div>
            {/if}

            {#if !isPortrait}
              <!-- Column header for horizontal mode -->
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
            {/if}
            <div class="flex h-full {isPortrait ? 'flex-row justify-center items-center gap-1 pr-10' : 'flex-col items-center justify-evenly gap-3 pt-6'}">
              {#each column.items as item, itemIndex}
                <div bind:this={buttonRefs[getButtonRef(columnIndex, itemIndex)]}>
                  <FlowchartItem
                    label={item.label}
                    icon={item.icon}
                    isSelected={state.selections[columnIndex + 1] === itemIndex + 1}
                    {isPortrait}
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
</div>