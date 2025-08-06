<script>
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import CarouselCard from './carouselCard.svelte';
  
  export let entries = [];
  
  let currentIndex = 0;
  let carousel;
  let startX = 0;
  let isDragging = false;
  let isMobile = false;
  
  const slidePosition = tweened(0, {
    duration: 600,
    easing: cubicOut
  });
  
  $: maxIndex = Math.max(0, entries.length - 1);
  $: slidePosition.set(currentIndex * 100);
  
  onMount(() => {
    isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      isMobile = window.innerWidth < 768;
    });
  });
  
  function next() {
    currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
  }
  
  function previous() {
    currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
  }
  
  function goToSlide(index) {
    currentIndex = index;
  }
  
  function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
  }
  
  function handleTouchMove(e) {
    if (!isDragging) return;
    e.preventDefault();
  }
  
  function handleTouchEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        next();
      } else {
        previous();
      }
    }
  }
</script>

<div class="relative" bind:this={carousel}>
  {#if entries.length > 0}
    <div 
      class="relative overflow-hidden rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 touch-pan-y"
      on:touchstart={handleTouchStart}
      on:touchmove={handleTouchMove}
      on:touchend={handleTouchEnd}
    >
      <div class="flex" style="transform: translateX(-{$slidePosition}%)">
        {#each entries as entry}
          <div class="w-full flex-shrink-0">
            <CarouselCard {entry} {isMobile} />
          </div>
        {/each}
      </div>
      
      <!-- Navigation buttons - hide on mobile -->
      {#if entries.length > 1 && !isMobile}
        <button
          on:click={previous}
          class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 hover:bg-white dark:hover:bg-neutral-800 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} class="text-neutral-700 dark:text-neutral-300" />
        </button>
        
        <button
          on:click={next}
          class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 hover:bg-white dark:hover:bg-neutral-800 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={20} class="text-neutral-700 dark:text-neutral-300" />
        </button>
      {/if}
    </div>
    
    <!-- Dots indicator -->
    {#if entries.length > 1}
      <div class="flex justify-center gap-2 mt-4">
        {#each entries as _, index}
          <button
            on:click={() => goToSlide(index)}
            class="w-2 h-2 rounded-full transition-all duration-500 ease-out {index === currentIndex ? 'w-8 bg-blue-600 dark:bg-blue-400' : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500'}"
            aria-label="Go to slide {index + 1}"
          />
        {/each}
      </div>
    {/if}
  {:else}
    <div class="text-center py-12 text-neutral-500 dark:text-neutral-400">
      No featured entries available
    </div>
  {/if}
</div>