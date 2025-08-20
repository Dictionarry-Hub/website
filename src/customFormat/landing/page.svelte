<script>
  import Seo from "@shared/ui/seo.svelte";
  import { router } from "tinro";
  import { getSeoData } from "@shared/constants/seoData";
  import { setNavigationItems, clearNavigation } from "@shared/stores/navigation";
  import { onMount, onDestroy } from "svelte";
  import { contentDatabase } from "@db";
  import { Layers, Heart } from "lucide-svelte";
  import MasterList from "./masterList/masterList.svelte";

  const seo = getSeoData($router.path);
  
  // Get total format count
  $: totalFormats = contentDatabase.entries.filter(e => e.type === 'custom-format').length;

  onMount(() => {
    const navItems = [
      "Overview",
      {
        title: "Master List",
        children: [
          "Audio",
          "HDR / Color Grade",
          "Release Groups",
          "Release Group Tiers",
          "Streaming Services",
          "Codecs",
          "Storage",
          "Resolution",
          "Source",
          "Indexer Flags",
          "Edition",
          "Enhancements",
          "Languages"
        ]
      },
      "Credits"
    ];
    setNavigationItems(navItems, "/custom-format");
  });

  onDestroy(() => {
    clearNavigation();
  });
</script>

<Seo title={seo.title} description={seo.description} image={seo.image} url={$router.path} />

<div>
  <!-- Overview Section -->
  <section id="overview" class="mb-12">
    <div class="flex flex-col md:flex-row md:items-start gap-4 mb-6">
      <h1 class="text-2xl font-bold text-neutral-900 dark:text-white md:w-1/4">
        Custom Formats
      </h1>
      
      <div class="flex flex-wrap gap-2 md:w-3/4 md:justify-end">
        <span class="px-3 py-1 bg-white dark:bg-neutral-900 
                     border border-neutral-300/70 dark:border-neutral-700/50 
                     rounded-full text-xs font-medium flex items-center gap-1.5">
          <Layers class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span class="text-neutral-700 dark:text-neutral-300">{totalFormats} formats</span>
        </span>
      </div>
    </div>
    
    <div class="border-t border-neutral-200 dark:border-neutral-700/60 pt-6">
      <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed">
        Custom formats are rules that identify specific characteristics in release names. They combine one or more
        conditions to match releases, allowing you to score and prioritize them based on your preferences.
      </p>
    </div>
  </section>

  <!-- Master List Section -->
  <section id="master-list" class="mb-12">
    <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Master List</h2>
    <MasterList />
  </section>

  <!-- Credits Section -->
  <section id="credits" class="mb-12 pb-12">
    <div class="flex items-center gap-2 mb-3">
      <Heart class="w-5 h-5 text-red-500 dark:text-red-400" />
      <h2 class="text-lg font-semibold text-neutral-900 dark:text-white">Credits</h2>
    </div>
    <p class="text-neutral-600 dark:text-neutral-300">
      These custom formats build on the excellent work done by <a
        href="https://trash-guides.info"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 dark:text-blue-400 hover:underline font-medium">TRaSH Guides</a
      >, adapted and expanded for Profilarr workflows. Full credit for their foundational work goes entirely to them.
    </p>
  </section>
</div>
