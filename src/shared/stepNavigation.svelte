<script>
  export let steps = [];
  export let currentStep = 0;
  export let onStepChange = () => {};
  
  $: currentStepName = steps[currentStep] || '';
  $: hasPrevious = currentStep > 0;
  $: hasNext = currentStep < steps.length - 1;
  
  function goToPrevious() {
    if (hasPrevious) {
      const newStep = currentStep - 1;
      onStepChange(newStep);
      // Update URL with section parameter
      const stepName = steps[newStep].toLowerCase().replace(/\s+/g, '-');
      const currentHash = window.location.hash.split('?')[0];
      window.location.hash = `${currentHash}?section=${stepName}`;
    }
  }
  
  function goToNext() {
    if (hasNext) {
      const newStep = currentStep + 1;
      onStepChange(newStep);
      // Update URL with section parameter
      const stepName = steps[newStep].toLowerCase().replace(/\s+/g, '-');
      const currentHash = window.location.hash.split('?')[0];
      window.location.hash = `${currentHash}?section=${stepName}`;
    }
  }
</script>

<div class="flex items-center justify-between mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-700">
  <button 
    on:click={goToPrevious}
    disabled={!hasPrevious}
    class="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  >
    ← Back
  </button>
  
  <span class="text-sm text-neutral-600 dark:text-neutral-400">
    {currentStepName}
  </span>
  
  <button 
    on:click={goToNext}
    disabled={!hasNext}
    class="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  >
    Next →
  </button>
</div>