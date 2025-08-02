<script>
  import { router } from 'tinro';
  import { ArrowLeft, ArrowRight } from 'lucide-svelte';

  export let pages = [];
  export let currentPagePath = '';
  export let previous = undefined;
  export let next = undefined;

  let currentIndex = -1;
  let previousPage = null;
  let nextPage = null;
  let currentPage = null;

  $: {
    // Use explicitly provided navigation if available
    if (previous !== undefined || next !== undefined) {
      previousPage = previous || null;
      nextPage = next || null;
    } else {
      // Fall back to auto-detection from pages array
      currentIndex = pages.findIndex(p => p.path === currentPagePath);
      if (currentIndex !== -1) {
        currentPage = pages[currentIndex];
        previousPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
        nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;
      }
    }
  }

  function navigateTo(path) {
    if (path) {
      router.goto(path);
    }
  }
</script>

<hr class="my-8 border-neutral-200 dark:border-neutral-700" />

<!-- Combined Navigation -->
<div class="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
  {#if previousPage}
    <!-- Previous Page -->
    <a href="#{previousPage.path}" class="group p-3 sm:p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors {!nextPage ? 'sm:col-span-2' : ''}">
      <div class="flex items-center gap-3 sm:gap-4">
        <ArrowLeft class="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600 dark:text-neutral-400 flex-shrink-0" />
        <div class="min-w-0">
          <h3 class="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">{previousPage.title}</h3>
          {#if previousPage.description}
            <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 line-clamp-2">{previousPage.description}</p>
          {/if}
        </div>
      </div>
    </a>
  {/if}
  
  {#if nextPage}
    <!-- Next Page -->
    <a href="#{nextPage.path}" class="group p-3 sm:p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors {!previousPage ? 'sm:col-span-2' : ''}">
      <div class="flex items-center justify-between gap-3 sm:gap-4">
        <div class="min-w-0">
          <h3 class="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">{nextPage.title}</h3>
          {#if nextPage.description}
            <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 line-clamp-2">{nextPage.description}</p>
          {/if}
        </div>
        <ArrowRight class="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600 dark:text-neutral-400 flex-shrink-0" />
      </div>
    </a>
  {/if}
</div>
