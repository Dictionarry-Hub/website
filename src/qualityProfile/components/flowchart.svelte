<script>
  import { flowchartStore } from '@shared/stores/flowchart';
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  import FlowchartItem from './flowchartItem.svelte';
  import { flowchartColumns, flowchartEdges } from '@shared/constants/flowchartOptions';
  
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
    
    // Check if previous column has a selection that allows this item
    const prevColumnIndex = columnIndex - 1;
    const prevSelection = state.selections[prevColumnIndex + 1];
    if (!prevSelection) return false;
    
    const prevColId = flowchartColumns[prevColumnIndex].id;
    const currentColId = flowchartColumns[columnIndex].id;
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
  <div class="flex flex-col md:flex-row md:items-start gap-4 mb-4">
    <h2 class="text-2xl font-bold text-neutral-900 dark:text-white md:w-1/4">
      Find Your Perfect Profile
    </h2>
  </div>
  
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
            {#if !isPortrait}
              <!-- Column header for horizontal mode -->
              <div class="absolute -top-4 left-1/2 -translate-x-1/2">
                <span class="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {column.name}
                </span>
              </div>
            {/if}
            <div class="flex h-full {isPortrait ? 'flex-row justify-center items-center gap-1' : 'flex-col items-center justify-evenly gap-3 pt-6'}">
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