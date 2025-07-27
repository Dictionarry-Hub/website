<script>
  import StepNavigation from '@shared/stepNavigation.svelte';
  import { Navigation } from 'lucide-svelte';
  
  const steps = [
    'Step 1',
    'Step 2', 
    'Step 3'
  ];
  
  let currentStep = 0;
  
  function handleStepChange(newStep) {
    currentStep = newStep;
  }
</script>

<div class="flex">
  <div class="flex-1">
    <div class="p-6 max-w-4xl mx-auto">
      {#if currentStep === 0}
        <section>
          <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Step 1</h2>
          <p class="text-neutral-700 dark:text-neutral-300 mb-4">
            This is placeholder content for Step 1.
          </p>
        </section>
      {:else if currentStep === 1}
        <section>
          <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Step 2</h2>
          <p class="text-neutral-700 dark:text-neutral-300 mb-4">
            This is placeholder content for Step 2.
          </p>
        </section>
      {:else if currentStep === 2}
        <section>
          <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Step 3</h2>
          <p class="text-neutral-700 dark:text-neutral-300 mb-4">
            This is placeholder content for Step 3.
          </p>
        </section>
      {/if}
      
      <StepNavigation {steps} {currentStep} onStepChange={handleStepChange} />
    </div>
  </div>
  
  <!-- Custom sidebar navigation -->
  <aside class="sticky top-16 w-80 h-[calc(100vh-4rem)] bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-700 overflow-y-auto">
    <div class="p-4">
      <div class="mb-4">
        <div class="flex items-center space-x-2">
          <Navigation class="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          <span class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Navigation
          </span>
        </div>
      </div>
      <div class="space-y-1">
        <div class="mb-3">
          <a 
            href="#"
            on:click|preventDefault
            class="block px-2 py-1 text-sm font-medium text-neutral-600 dark:text-neutral-400"
          >
            Profilarr Setup
          </a>
          <div class="ml-4 mt-1 space-y-0.5">
            {#each steps as step, i}
              <a 
                href="#"
                on:click|preventDefault={() => handleStepChange(i)}
                class="block px-2 py-1 text-sm rounded transition-colors {currentStep === i ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'}"
              >
                {step}
              </a>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </aside>
</div>