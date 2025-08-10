<script lang="ts">
  export let title: string;
  export let description: string;
  export let image: string | undefined = undefined;
  export let url: string; // This will be the path, e.g., /welcome

  const siteName = 'Dictionarry';
  const baseUrl = 'https://dictionarry.dev';

  $: fullTitle = title ? (title === siteName ? siteName : `${title} | ${siteName}`) : siteName;
  
  $: canonicalUrl = new URL(url || '/', baseUrl).href;

  $: imageUrl = image ? new URL(image, baseUrl).href : new URL('/logo.svg', baseUrl).href;

</script>

<svelte:head>
  <!-- Standard SEO -->
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={imageUrl} />
  <meta property="og:site_name" content={siteName} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={canonicalUrl} />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={imageUrl} />
</svelte:head>