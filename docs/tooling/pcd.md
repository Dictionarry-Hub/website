# PCD Pipeline

Build-time pipeline that fetches PCD repositories, compiles their SQL operations, and outputs
structured JSON for the website to consume.

## Source

```
tooling/pcd/
├── index.ts        # Entry point, orchestrates fetch -> compile -> extract
├── config.json     # Database registry
├── fetch.ts        # GitHub tarball download and extraction
├── build.ts        # In-memory SQLite compilation
├── extract.ts      # Entity extraction via SQL queries
└── types.ts        # Pipeline-internal types
```

## Config

`tooling/pcd/config.json` defines which databases to compile. Array order determines display order
in the sidebar. First entry is the default.

```json
{
  "schema": { "repo": "Dictionarry-Hub/schema" },
  "databases": [
    { "id": "dictionarry", "name": "Dictionarry", "repo": "Dictionarry-Hub/database", "branch": "v2" }
  ]
}
```

Each entry has:

| Field    | Purpose                                              |
| -------- | ---------------------------------------------------- |
| `id`     | URL slug and output filename                         |
| `name`   | Display name in the UI                               |
| `repo`   | GitHub `owner/repo`                                  |
| `branch` | Git ref to fetch                                     |

## Pipeline Flow

```
pnpm compile:pcd
  1. Read config.json
  2. For each database:
     a. Fetch tarball from GitHub API
     b. Read pcd.json manifest from extracted files
     c. Resolve schema version from manifest dependencies
     d. Fetch schema tarball (cached if same version as previous database)
     e. Create in-memory SQLite with foreign keys enabled
     f. Execute schema ops in numeric filename order
     g. Execute base ops in numeric filename order
     h. Extract all entity data via SQL queries
     i. Write {id}.json to src/lib/data/pcd/
  3. Write index.json (nav-only data for sidebar)
  4. Clean up temp directories
```

## Fetching

Repos are fetched as tarballs via the GitHub API
(`https://api.github.com/repos/{owner}/{repo}/tarball/{ref}`). No git required at build time.
Schema tarballs are cached within a pipeline run since multiple databases typically pin the same
schema version.

## Schema Resolution

Each PCD manifest pins its schema via a full GitHub URL key and exact version value:

```json
{ "dependencies": { "https://github.com/Dictionarry-Hub/schema": "1.1.0" } }
```

The pipeline parses the repo from the URL and fetches the tarball at the version tag.

## Compilation

Uses `better-sqlite3` (native, synchronous). Creates an in-memory database, executes schema ops
(DDL + seed data), then base ops (entity content). Ops are SQL files in an `ops/` folder, sorted by
numeric filename prefix (`0.schema.sql` before `1.languages.sql` before `10.something.sql`).

No custom SQLite functions are needed. Exported PCD ops use plain SQL with name-based WHERE clauses.

## Extraction

After compilation, the pipeline queries the SQLite database for each entity type with appropriate
joins (e.g., custom formats with their conditions and condition-type data, quality profiles with
scoring and quality lists). Results are shaped into the `CompiledDatabase` interface defined in
`src/lib/types/pcd.ts`.

## Output

All output goes to `src/lib/data/pcd/` (gitignored).

**Per-database JSON** (`{id}.json`): Full entity data typed as `CompiledDatabase`. One file per
database. These are consumed by `+page.server.ts` load functions for entity detail pages.

**Nav index** (`index.json`): Entity names only, keyed by database ID. Consumed by
`+layout.server.ts` to populate the sidebar. Kept separate to avoid shipping full entity data to
every page.

## Shared Types

`src/lib/types/pcd.ts` defines the compiled data shape, used by both the pipeline and the SvelteKit
app. Key interfaces:

- `CompiledDatabase` - top-level container with metadata and all entity collections
- `CustomFormat` - name, description, tags, conditions (with discriminated union for condition data)
- `QualityProfile` - name, scoring, quality list with groups, languages
- `RegularExpression` - name, pattern, description, tags
- `DelayProfile` - protocol, delays, bypass settings
- `NamingConfig`, `MediaSettings`, `QualityDefinitionConfig` - media management entities

## Adding a Database

1. Add an entry to `tooling/pcd/config.json`
2. Run `pnpm compile:pcd` to verify it compiles
3. The database appears in the sidebar dropdown and nav automatically
