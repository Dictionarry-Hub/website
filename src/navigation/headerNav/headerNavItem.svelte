<script>
  export let href = '';
  export let label = '';
  export let isActive = false;
  export let level = 0;
  
  // Simpler text sizing
  $: textStyle = level === 0 
    ? 'text-sm font-medium' 
    : 'text-xs';
    
  // Cleaner active state
  $: activeStyle = isActive 
    ? 'text-blue-600 dark:text-blue-400 font-medium' 
    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100';
    
  $: padding = 'px-2 py-1';
</script>

<a 
  {href}
  class="block {padding} {textStyle} rounded transition-colors {activeStyle}"
  on:click|preventDefault={() => {
    const targetId = href.replace('?section=', '');
    const element = document.getElementById(targetId);
    if (element) {
      const mainContent = document.querySelector('main');
      if (mainContent) {
        const mainContentRect = mainContent.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const scrollTop = mainContent.scrollTop;
        const targetScrollTop = scrollTop + elementRect.top - mainContentRect.top - 20;
        
        mainContent.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
      }
      
      // Update URL with section parameter
      const url = new URL(window.location);
      url.searchParams.set('section', targetId);
      window.history.replaceState(null, '', url.toString());
    }
  }}
>
  {label}
</a>