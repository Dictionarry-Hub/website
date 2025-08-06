<script>
  import { onMount } from 'svelte';
  import { theme } from '@shared/stores/theme';
  
  export let issueTerm = '';
  export let repo = 'Dictionarry-Hub/gist';
  
  let utterancesContainer;
  let utterancesFrame;
  
  // Watch theme changes and update Utterances
  $: if (utterancesFrame) {
    const utterancesTheme = $theme ? 'github-dark' : 'github-light';
    const message = {
      type: 'set-theme',
      theme: utterancesTheme
    };
    utterancesFrame.contentWindow.postMessage(message, 'https://utteranc.es');
  }
  
  onMount(() => {
    // Use theme store to get current theme
    const utterancesTheme = $theme ? 'github-dark' : 'github-light';
    
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('repo', repo);
    script.setAttribute('issue-term', issueTerm);
    script.setAttribute('theme', utterancesTheme);
    script.setAttribute('crossorigin', 'anonymous');
    
    utterancesContainer.appendChild(script);
    
    // Watch for the iframe to be added so we can get a reference to it
    const checkInterval = setInterval(() => {
      const iframe = utterancesContainer.querySelector('iframe.utterances-frame');
      if (iframe) {
        utterancesFrame = iframe;
        clearInterval(checkInterval);
      }
    }, 100);
    
    // Clear interval after 10 seconds if not found
    setTimeout(() => clearInterval(checkInterval), 10000);
    
    return () => {
      // Cleanup on component destroy
      while (utterancesContainer?.firstChild) {
        utterancesContainer.removeChild(utterancesContainer.firstChild);
      }
    };
  });
</script>

<div class="utterances-wrapper mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 relative">
  <!-- Loading spinner positioned behind the utterances container -->
  <div class="flex items-center justify-center min-h-[200px]">
    <svg class="animate-spin h-5 w-5 mr-3 text-neutral-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span class="text-neutral-500 dark:text-neutral-400">Loading discussions...</span>
  </div>
  
  <!-- Utterances container positioned absolutely on top -->
  <div bind:this={utterancesContainer} class="utterances-container absolute top-6 left-0 right-0">
  </div>
</div>

<style>
  :global(.utterances) {
    max-width: 100% !important;
  }
  
  :global(.utterances-frame) {
    width: 100% !important;
  }
</style>