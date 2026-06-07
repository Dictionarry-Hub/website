# SEO

Notes on how the site handles SEO through static generation.

## Pre-rendering

The entire site is pre-rendered via adapter-static. A single layout file enables this globally:

```ts
// src/routes/+layout.server.ts
export const prerender = true;
```

All data fetching and transformation happens in `+page.server.ts` load functions. These run at build
time, not in the browser. The output is plain HTML with all content baked in. No JavaScript is
required for crawlers to see the content.

The rule: if a crawler needs to see it, it goes in the server load function. Anything in `onMount`
or client-side fetch is invisible to crawlers.

## Dynamic Routes

Routes with parameters (e.g. `/wiki/[slug]`) need SvelteKit to know which pages to generate. Two
options:

- If the pages are linked from a pre-rendered index page, SvelteKit's crawler discovers them
  automatically.
- If not linked from anywhere, export an `entries()` function in `+page.server.ts` that returns all
  valid parameter values.

## Meta Tags

Every page needs proper meta tags via `<svelte:head>`:

- `<title>`
- `<meta name="description">`
- `<meta property="og:title">`
- `<meta property="og:description">`

For mdsvex content, frontmatter provides the title and description. The layout component should
handle rendering the `<svelte:head>` block automatically so content authors only write frontmatter.

## Enforcement

Two strategies for catching SEO issues before they ship:

- **Lighthouse CI**: runs in GitHub Actions after the build step. Audits the built static site for
  SEO, accessibility, and performance. Score thresholds fail the build if a page drops below the
  minimum.
- **Custom linters**: targeted checks for project-specific rules (every page has an `og:image`, no
  empty `<h1>`, required frontmatter fields). Faster feedback than Lighthouse and can enforce rules
  Lighthouse doesn't cover.

Neither is implemented yet. Will be added once the site has content pages.
