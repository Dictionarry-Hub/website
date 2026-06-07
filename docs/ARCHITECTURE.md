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

_Subsection docs will be added as implementation progresses._
