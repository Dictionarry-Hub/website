<script>
  import { createEventDispatcher } from 'svelte';
  import Dropdown from '@ui/dropdown.svelte';
  import NumberInput from '@ui/numberInput.svelte';
  import { clickOutside } from '@shared/utils/clickOutside.js';
  import { Activity } from 'lucide-svelte';
  
  export let minValue = 0;
  export let maxValue = 0;
  export let rangeMin = 0;
  export let rangeMax = 0;
  
  const dispatch = createEventDispatcher();
  
  let valueOpen = false;
  let localMinValue = minValue;
  let localMaxValue = maxValue;
  
  // Update local values when props change
  $: localMinValue = minValue;
  $: localMaxValue = maxValue;
  
  // Ensure min and max are at least 1 apart
  function handleMinChange() {
    if (localMinValue >= localMaxValue) {
      localMinValue = localMaxValue - 1;
    }
    if (localMinValue < rangeMin) {
      localMinValue = rangeMin;
    }
    dispatch('change', { min: localMinValue, max: localMaxValue });
  }
  
  function handleMaxChange() {
    if (localMaxValue <= localMinValue) {
      localMaxValue = localMinValue + 1;
    }
    if (localMaxValue > rangeMax) {
      localMaxValue = rangeMax;
    }
    dispatch('change', { min: localMinValue, max: localMaxValue });
  }
</script>

<div 
  class="relative"
  role="button"
  tabindex="0"
  on:mouseenter={() => valueOpen = true}
  on:mouseleave={() => valueOpen = false}
  use:clickOutside={() => valueOpen = false}
>
  <button 
    class="flex items-center justify-center px-3 h-10 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 border-l-0 rounded-r-md text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
    on:click={() => valueOpen = !valueOpen}
  >
    <span class="sr-only">Value</span>
    <Activity class="w-4 h-4 transition-all duration-200 {valueOpen ? 'scale-110' : ''}" />
  </button>
  
  <!-- Value Dropdown -->
  <Dropdown bind:isOpen={valueOpen} position="right" width="w-96">
    <div class="p-4 space-y-4">
      <!-- Min Value Slider -->
      <div class="space-y-2">
        <label class="text-xs font-medium text-neutral-600 dark:text-neutral-400">Min Score</label>
        <div class="flex items-center gap-3">
          <input
            type="range"
            bind:value={localMinValue}
            on:input={handleMinChange}
            min={rangeMin}
            max={rangeMax - 1}
            class="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer"
          />
          <NumberInput
            bind:value={localMinValue}
            on:input={handleMinChange}
            min={rangeMin}
            max={rangeMax - 1}
            width="w-20"
          />
        </div>
      </div>
      
      <!-- Max Value Slider -->
      <div class="space-y-2">
        <label class="text-xs font-medium text-neutral-600 dark:text-neutral-400">Max Score</label>
        <div class="flex items-center gap-3">
          <input
            type="range"
            bind:value={localMaxValue}
            on:input={handleMaxChange}
            min={rangeMin + 1}
            max={rangeMax}
            class="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer"
          />
          <NumberInput
            bind:value={localMaxValue}
            on:input={handleMaxChange}
            min={rangeMin + 1}
            max={rangeMax}
            width="w-20"
          />
        </div>
      </div>
    </div>
  </Dropdown>
</div>

<style>
  /* Custom slider styling */
  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #3b82f6;
    cursor: pointer;
    border-radius: 50%;
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #3b82f6;
    cursor: pointer;
    border-radius: 50%;
    border: none;
  }
</style>