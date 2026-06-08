# Content

Notes on the site's content layers and how data flows into pages.

## Content Types

The site has three content layers:

### Profilarr Documentation

Setup guides and user-facing documentation. Written as mdsvex markdown. Authored by hand.

### PCD Entity Browser

Browsable reference pages for PCD entities: quality profiles, custom formats, regular expressions,
delay profiles, and media management configs (naming, media settings, quality definitions). These
pages are generated at build time from PCD repositories.

Users select a database (e.g. Dictionarry, TRaSH, Dumpstarr) and browse its entities by type. The
database is part of the URL path (`/pcd/[database]/[entity-type]/[name]`) so every page is
independently crawlable.

Seven entity types are browsable:

| Entity Type         | Route segment         | Arr-specific |
| ------------------- | --------------------- | ------------ |
| Quality Profiles    | `quality-profiles`    | No           |
| Custom Formats      | `custom-formats`      | No           |
| Regular Expressions | `regex`               | No           |
| Delay Profiles      | `delay-profiles`      | No           |
| Naming              | `naming`              | Yes          |
| Media Settings      | `media-settings`      | Yes          |
| Quality Definitions | `quality-definitions` | Yes          |

Arr-specific entities include the arr type in the URL: `/pcd/[database]/naming/[arrType]/[name]`.

### Dev Logs and Wiki Articles

Site-specific content written as mdsvex markdown. Dev logs cover releases and development progress.
Wiki articles cover broader topics.

Dev log frontmatter includes title, slug, blurb, author, created date, and tags. Wiki article
frontmatter structure to be defined.

## PCD Pipeline

The PCD pipeline is a pre-build step (`pnpm compile:pcd`) that fetches PCD repositories, compiles
their SQL operations into SQLite, and extracts entity state as JSON. For implementation details, see
[tooling/pcd.md](../tooling/pcd.md).

The pipeline outputs two things:

1. **Per-database JSON** (`src/lib/data/pcd/{id}.json`) containing full entity data, typed as
   `CompiledDatabase` from `src/lib/types/pcd.ts`. Consumed by `+page.server.ts` load functions.

2. **Nav index** (`src/lib/data/pcd/index.json`) containing entity names per database. Consumed by
   `+layout.server.ts` to populate the sidebar navigation.

Both outputs are gitignored. The build command is `pnpm compile:pcd && pnpm build`.

## Database Selection

The active database is determined by the URL when on PCD routes. A database selector dropdown in the
navbar lets users switch databases, which navigates to the equivalent page for the new database.

On non-PCD pages, the selector updates a localStorage preference. Visiting `/pcd/` redirects to
`/pcd/{preference}/` based on the stored value (defaulting to the first database in the config).

The database store lives at `src/lib/client/ui/database/database.svelte.ts` and follows the same
pattern as the theme store.
