# Architecture

Reference architecture for the Dictionarry documentation site. Each linked file covers one
subsystem. For contribution workflow, see [CONTRIBUTING.md](./CONTRIBUTING.md). For branching and
deployment, see [DEVELOPMENT.md](./DEVELOPMENT.md).

## Purpose

The Dictionarry documentation site serves as the public-facing home for Profilarr documentation, a
browsable reference for PCD entities, and a publishing platform for dev logs and wiki articles. The
site is fully static. Every page is pre-rendered at build time and served from GitHub Pages with no
runtime server.

## Tech Stack

| Layer           | Choice                   |
| --------------- | ------------------------ |
| Language        | TypeScript               |
| Runtime (build) | Node.js 22+              |
| Package manager | pnpm 11+                 |
| Framework       | SvelteKit (Svelte 5)     |
| Adapter         | @sveltejs/adapter-static |
| Markdown        | mdsvex                   |
| Styling         | Tailwind CSS 4           |
| Hosting         | GitHub Pages             |

## Architecture Sections

### Frontend

- [UI](./frontend/ui.md) - Component library, semantic tokens, theming
- [SEO](./frontend/seo.md) - Pre-rendering, meta tags, Lighthouse CI
- [Markdown](./frontend/markdown.md) - mdsvex configuration, component remapping, frontmatter

### Backend

- [Content](./backend/content.md) - Content layers: Profilarr docs, PCD browser, dev logs
- [Search](./backend/search.md) - Client-side fuzzy search, Elo ranking
- [LLM Consumption](./backend/llm.md) - Markdown artifacts, copy buttons, AI-consumable content

### Tooling

- [Linting](./tooling/lint.md) - ESLint, custom lint framework, project-specific rules
- [PCD Pipeline](./tooling/pcd.md) - Build-time PCD compilation, entity extraction, output format
- [API Pipeline](./tooling/api.md) - Build-time OpenAPI spec fetching for API reference docs
