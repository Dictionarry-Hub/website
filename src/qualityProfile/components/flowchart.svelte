<script>
  import { flowchartStore } from '@shared/stores/flowchart';
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  
  let state;
  let containerRef;
  let buttonRefs = {};
  let svgPaths = [];
  let isPortrait = false;
  
  flowchartStore.subscribe(value => {
    state = value;
  });
  
  function handleButtonClick(column, button) {
    flowchartStore.selectButton(column, button);
  }
  
  function getButtonRef(column, button) {
    return `button-${column}-${button}`;
  }
  
  function checkOrientation() {
    isPortrait = window.innerHeight > window.innerWidth;
    updatePaths();
  }
  
  function calculatePath(fromCol, fromButton, toCol, toButton) {
    const fromRef = buttonRefs[getButtonRef(fromCol, fromButton)];
    const toRef = buttonRefs[getButtonRef(toCol, toButton)];
    
    if (!fromRef || !toRef || !containerRef) return '';
    
    const containerRect = containerRef.getBoundingClientRect();
    const fromRect = fromRef.getBoundingClientRect();
    const toRect = toRef.getBoundingClientRect();
    
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
      {#each [1, 2, 3, 4, 5] as column}
        {#if column <= state.currentColumn}
          <div class="p-4 {column < state.currentColumn ? (isPortrait ? 'border-b' : 'border-r') : ''} border-neutral-200 dark:border-neutral-700">
            <div class="flex {isPortrait ? 'flex-row justify-center space-x-3' : 'flex-col items-center space-y-3'}">
              {#each [1, 2, 3] as button}
                <button
                  bind:this={buttonRefs[getButtonRef(column, button)]}
                  class="relative {isPortrait ? 'h-12 max-h-[60%]' : 'w-32 max-w-[60%]'} px-4 py-3 text-sm font-medium rounded-lg border transition-all z-10
                    {state.selections[column] === button 
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white' 
                      : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300/70 dark:border-neutral-700/50 hover:border-neutral-400 dark:hover:border-neutral-600'}"
                  on:click={() => handleButtonClick(column, button)}
                >
                  c{column}b{button}
                </button>
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