# Content

Notes on the site's content layers and how data flows into pages.

## Content Types

The site has three content layers:

### Profilarr Documentation

Setup guides and user-facing documentation. Written as mdsvex markdown. Authored by hand.

### PCD Entity Browser

Browsable reference pages for PCD entities: quality profiles, custom formats, regular expressions,
delay profiles, and media management configs. These pages are auto-generated at build time from PCD
repositories.

Users can browse what's available across databases (e.g. all quality profiles in Dictionarry vs
TRaSH PCD).

### Dev Logs and Wiki Articles

Site-specific content written as mdsvex markdown. Dev logs cover releases and development progress.
Wiki articles cover broader topics.

Dev log frontmatter includes title, slug, blurb, author, created date, and tags. Wiki article
frontmatter structure to be defined.

## PCD Pipeline

A config file defines which PCD repositories to fetch at build time. Each entry includes at minimum
the repo URL, a display name, and a branch. Other metadata to be determined during implementation.

At build time, each repo is fetched, parsed, and its entities are rendered as static pages. The
route structure and page content are derived from the data. How this integrates with SvelteKit's
`+page.server.ts` load functions and `entries()` for route generation needs to be worked out.
