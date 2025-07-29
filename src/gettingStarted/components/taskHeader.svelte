<script>
  export let number;
  export let title;
  export let subtitle;
</script>

<div class="flex space-x-3 items-center">
  <div class="flex-shrink-0 w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
    <span class="text-neutral-900 dark:text-white font-bold text-sm">{number}</span>
  </div>
  <div>
    <h3 class="font-semibold text-neutral-900 dark:text-white">{title}</h3>
    <p class="text-neutral-700 dark:text-neutral-300">
      {@html subtitle}
    </p>
  </div>
</div>