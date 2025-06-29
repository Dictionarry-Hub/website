<script>
  export let href = '';
  export let label = '';
  export let isActive = false;
  
  // Determine level based on indentation classes in parent
  $: isMainSection = label && (label.includes('👋') || label.includes('Profilarr Setup') || label.includes('Installation') || label.includes('Usage') || label.includes('Importing'));
  $: textSize = isMainSection ? 'text-sm font-medium' : 'text-sm';
</script>

<a 
  {href}
  class="block px-2 py-1 {textSize} rounded transition-colors {isActive ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 font-medium border-l-2 border-blue-500' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'}"
  on:click|preventDefault={() => {
    const targetId = href.replace('#section=', '');
    const element = document.getElementById(targetId);
    if (element) {
      // Calculate offset for navbar (64px + some padding)
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Update URL with section parameter, keeping current route
      const currentPath = window.location.hash.split('#section')[0] || '#/';
      window.history.replaceState(null, '', currentPath + href);
    }
  }}
>
  {label}
</a>