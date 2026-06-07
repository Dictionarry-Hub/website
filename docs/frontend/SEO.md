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

All meta tags are rendered by the `SEO` component (`src/lib/client/ui/utils/SEO.svelte`). Every page
must use it. The component handles `<title>`, description, theme-color, Open Graph, and Twitter Card
tags via `<svelte:head>`.

```svelte
<SEO
	title="Installation"
	description="How to install Profilarr." />
```

| Prop          | Type     | Required | Default                      |
| ------------- | -------- | -------- | ---------------------------- |
| `title`       | `string` | yes      |                              |
| `description` | `string` | no       | Site-wide default            |
| `image`       | `string` | no       | GitHub-hosted `icon.png` URL |

`app.html` contains only structural head elements (charset, viewport, favicon links, manifest).
Social and SEO meta tags live exclusively in the `SEO` component to avoid duplicates.

The `og:image` and `twitter:image` must be absolute URLs.

For mdsvex content, frontmatter provides the title and description. The layout component should
handle rendering the `SEO` component automatically so content authors only write frontmatter.

## Lighthouse CI

Lighthouse CI (`@lhci/cli`) runs in the CI pipeline as part of `.github/workflows/ci.yml`. It builds
the site, serves the static output, and audits each configured URL. Configuration lives in
`lighthouserc.js`.

### What it checks

Lighthouse runs four audit categories:

| Category       | Threshold | Severity | Notes                               |
| -------------- | --------- | -------- | ----------------------------------- |
| SEO            | 100       | error    | All 8 SEO audits must pass          |
| Accessibility  | 90        | error    | Uses axe-core under the hood        |
| Best Practices | 90        | error    | Security, compatibility, UX hygiene |
| Performance    | 90        | warn     | CI runners have variable hardware   |

SEO audits specifically check: `<title>` exists, `<meta name="description">` exists, page is
crawlable (no `noindex`), `robots.txt` is valid, canonical is valid, hreflang is valid, link text is
descriptive, and links are crawlable (no `javascript:void(0)`).

### What it does not check

Lighthouse has no awareness of Open Graph tags, Twitter Card tags, structured data, cross-page
duplicate titles, heading structure for SEO purposes, or sitemap validity. These are handled by the
custom linter.

### Adding pages

When new routes are added, add their URLs to the `url` array in `lighthouserc.js`:

```js
url: [
  'http://localhost/',
  'http://localhost/docs/',
  'http://localhost/wiki/',
],
```

### Running locally

```bash
pnpm build && pnpm lighthouse
```

Requires Chrome or Chromium. On WSL2, use the CI pipeline instead (Chrome on Windows cannot
communicate with WSL2's network stack).

## Custom Linter

Targeted checks for project-specific rules that Lighthouse does not cover. Planned but not yet
implemented. Expected rules include:

- Every page has `og:title`, `og:description`, `og:image`
- No duplicate `<title>` values across pages
- Every page has exactly one `<h1>`
- Required frontmatter fields in mdsvex content
- Component structure rules (e.g. no raw HTML elements in route files)
