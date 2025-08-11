<script>
  import { router } from 'tinro';
  
  let isHovering = false;
  
  function handleClick() {
    router.goto('/');
  }
</script>

<button 
  class="flex items-center space-x-3 rounded-lg px-2 py-1 -mx-2 -my-1 focus:outline-none cursor-pointer group"
  on:click={handleClick}
  on:mouseenter={() => isHovering = true}
  on:mouseleave={() => isHovering = false}
>
  <img 
    src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4d2.png" 
    alt="📒" 
    class="w-7 h-7 flex-shrink-0 transition-transform"
    class:animate-book={isHovering}
  />
  <h1 class="hidden xl:block text-xl font-bold text-neutral-700 dark:text-neutral-300 whitespace-nowrap header-font transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
    dictionarry
  </h1>
</button>

<style>
  @keyframes book-bounce {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    25% {
      transform: translateY(-2px) rotate(-3deg);
    }
    75% {
      transform: translateY(-2px) rotate(3deg);
    }
  }
  
  .animate-book {
    animation: book-bounce 1.5s ease-in-out infinite;
  }
</style>