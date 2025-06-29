<script>
  import Header from './components/header.svelte';
  import Search from './components/search.svelte';
  import Extras from './components/extras.svelte';
</script>

<nav class="w-full bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
  <div class="w-full px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-3 items-center h-16">
      <div class="col-span-1">
        <Header />
      </div>
      <div class="col-span-1 flex justify-center">
        <Search />
      </div>
      <div class="col-span-1 flex justify-end">
        <Extras />
      </div>
    </div>
  </div>
</nav>