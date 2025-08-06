<script>
  import { ExternalLink, CheckCircle, XCircle, AlertCircle, FlaskConical } from 'lucide-svelte';
  
  export let tests = '';
  export let testResults = null;
</script>

<div>
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-xl font-semibold text-neutral-900 dark:text-white">
      Tests
    </h2>
    {#if tests && testResults && testResults.results && testResults.results.length > 0}
      <a 
        href={tests}
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 px-3 py-1.5 text-xs font-medium
               text-neutral-700 dark:text-neutral-300
               bg-neutral-100 dark:bg-neutral-800
               hover:bg-neutral-200 dark:hover:bg-neutral-700
               border border-neutral-200 dark:border-neutral-700
               rounded-lg transition-colors"
      >
        Open in Regex101
        <ExternalLink class="w-3.5 h-3.5" />
      </a>
    {/if}
  </div>
  
  {#if tests}
    <div class="space-y-4">
      
      <!-- Test Results (if available) -->
      {#if testResults && testResults.results}
        <div class="bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <div class="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
            <div class="flex items-center justify-between">
              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Test Results
                </span>
                <span class="text-xs text-neutral-500 hidden sm:inline">
                  (.NET regex engine with /gmi flags)
                </span>
              </div>
              <div class="flex items-center gap-3">
                <!-- Mobile: just icons with numbers -->
                <div class="flex items-center gap-1 sm:hidden">
                  <span class="text-xs font-medium text-green-600 dark:text-green-400">
                    {testResults.passed}
                  </span>
                  <CheckCircle class="w-3.5 h-3.5 text-green-500" />
                </div>
                {#if testResults.failed > 0}
                  <div class="flex items-center gap-1 sm:hidden">
                    <span class="text-xs font-medium text-red-600 dark:text-red-400">
                      {testResults.failed}
                    </span>
                    <XCircle class="w-3.5 h-3.5 text-red-500" />
                  </div>
                {/if}
                
                <!-- Desktop: with "passed"/"failed" text -->
                <div class="hidden sm:flex items-center gap-1.5">
                  <CheckCircle class="w-3.5 h-3.5 text-green-500" />
                  <span class="text-xs font-medium text-green-600 dark:text-green-400">
                    {testResults.passed} passed
                  </span>
                </div>
                {#if testResults.failed > 0}
                  <div class="hidden sm:flex items-center gap-1.5">
                    <XCircle class="w-3.5 h-3.5 text-red-500" />
                    <span class="text-xs font-medium text-red-600 dark:text-red-400">
                      {testResults.failed} failed
                    </span>
                  </div>
                {/if}
              </div>
            </div>
          </div>
          
          <div class="divide-y divide-neutral-200 dark:divide-neutral-700">
            {#each testResults.results as test}
              <div class="px-4 py-3">
                <div class="flex items-start gap-3">
                  <div class="mt-0.5 flex-shrink-0">
                    {#if test.passed}
                      <CheckCircle class="w-4 h-4 text-green-500" />
                    {:else}
                      <XCircle class="w-4 h-4 text-red-500" />
                    {/if}
                  </div>
                  <div class="flex-1 min-w-0 space-y-2">
                    <div class="overflow-x-auto">
                      <code class="inline-block text-xs font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                        {test.testString}
                      </code>
                    </div>
                    {#if test.description}
                      <p class="text-xs text-neutral-600 dark:text-neutral-400">
                        {test.description}
                      </p>
                    {/if}
                    <div class="flex flex-col sm:flex-row gap-1 sm:gap-3 text-xs">
                      <span class="text-neutral-500">
                        Expected: <span class="font-medium">{test.criteria === 'DOES_MATCH' ? 'Match' : 'No Match'}</span>
                      </span>
                      <span class="text-neutral-500">
                        Result: <span class="font-medium {test.matches ? 'text-green-600 dark:text-green-400' : 'text-neutral-600 dark:text-neutral-400'}">
                          {test.matches ? 'Matched' : 'No Match'}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else}
        <div class="bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
          <div class="flex items-center gap-2 mb-3">
            <AlertCircle class="w-4 h-4 text-neutral-500" />
            <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Test Results
            </span>
          </div>
          <p class="text-xs text-neutral-600 dark:text-neutral-400">
            Test results will be displayed here when available. Tests are run against the .NET regex engine with /gmi flags.
          </p>
        </div>
      {/if}
    </div>
  {:else}
    <!-- Empty state -->
    <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-8 text-center">
      <FlaskConical class="w-12 h-12 text-neutral-400 mx-auto mb-3" />
      <p class="text-neutral-600 dark:text-neutral-400">
        No tests available
      </p>
      <p class="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
        Add a regex101 link to enable testing
      </p>
    </div>
  {/if}
</div>