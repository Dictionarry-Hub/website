<script>
  // Quality profile overview component
</script>

<div class="text-neutral-600 dark:text-neutral-300 leading-relaxed">
  <p class="mb-6">
    So, you're ready to use Profilarr to manage configurations, but what is the philosophy that makes the Dictionarry profiles work? It's built on two key ideas.
  </p>
  
  <h3 class="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
    1. Data-Driven Rankings
  </h3>
  <p class="mb-4">
    Instead of just guessing quality from a filename, Dictionarry uses historical data to rank release groups on their proven quality and efficiency.
  </p>
  <p class="mb-6">
    For example, two releases might appear identical (<code class="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm">Movie.1080p-groupA</code> vs <code class="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm">Movie.1080p-groupB</code>), but our data can identify that <code class="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm">groupA</code>'s encodes are consistently better. The profile uses this information to automatically prefer the release from <code class="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm">groupA</code>.
  </p>
  
  <h3 class="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
    2. Holistic Scoring
  </h3>
  <p class="mb-4">
    Scores for different attributes are designed to work together as a system, where their relationship to each other is more important than their individual value.
  </p>
  <p class="mb-6">
    For example, a profile might penalize the common x265 codec, requiring it to be paired with a highly-scored, trusted release group to be downloaded. This system creates a rule: "Only get x265 releases if they come from a source you trust."
  </p>
</div><!--  -->