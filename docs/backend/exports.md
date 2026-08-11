# Entity Exports

Design for machine-readable PCD entity artifacts and application-specific exports.

## Boundaries

YAML artifacts are informational views of compiled PCD entities. They are not import contracts for
Profilarr, Radarr, or Sonarr. Each downstream application gets a separate serializer so changes made
for readability cannot silently change an application payload.

Like Markdown artifacts, every format has one canonical prerendered endpoint. Copy and download
actions consume that endpoint rather than serializing data in the browser.

## YAML Module

Shared YAML code lives in `src/lib/shared/utils/yaml/`:

- `stringify.ts` owns deterministic encoding with the `yaml` package.
- `pcd.ts` owns typed entity serializers.
- `index.ts` is the public export surface.

Serializers preserve structured machine values and source collection order. The shared encoder uses
YAML 1.2, two-space indentation, literal multiline strings, and disables line folding.

## Custom Formats

Custom formats are available at `/pcd/{database}/custom-formats/{slug}.yaml`. The artifact contains
the database and schema versions, entity metadata, conditions, and optional tests.

Condition values remain typed mappings. Release-title, release-group, and edition conditions retain
their regular-expression name and include the absolute HTML URL when the referenced entity resolves.
The matching value on the HTML entity page links to the same regex. The regex pattern is not
embedded.

## Page Actions Menu

`PageActionsMenu` combines machine-readable page formats and AI actions in one dropdown. Custom
format pages provide Copy as YAML, Download as YAML, Copy page as Markdown, and View as Markdown
under Page formats. Open in Claude and Open in ChatGPT remain under AI actions. Copy feedback
temporarily replaces the menu trigger with a success or failure state. Future Radarr, Sonarr, and
Profilarr actions will use separate JSON artifact routes through the same menu. A rich/YAML page
mode may be added separately when the entity page UI is designed.

## Enforcement

The `require-yaml-artifact` custom lint rule checks build output for missing artifacts. Entity types
opt in through `tooling/lint/yaml-artifacts.json`; custom formats are currently required. For each
supported PCD detail page, the rule requires a sibling `.yaml` file. Index pages and entity types
without YAML serializers are ignored.
