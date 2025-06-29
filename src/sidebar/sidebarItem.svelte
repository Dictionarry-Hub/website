<script>
  export let href = '';
  export let label = '';
  export let isActive = false;
</script>

<a 
  {href}
  class="block px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors {isActive ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium' : ''}"
>
  {label}
</a>