<script>
  import Header from './components/header.svelte';
  import Search from './components/search.svelte';
  import Extras from './components/extras.svelte';
</script>

<nav class="bg-neutral-50 border-b border-neutral-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <Header />
      <Search />
      <Extras />
    </div>
  </div>
</nav>