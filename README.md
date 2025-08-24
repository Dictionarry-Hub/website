
# website 3.0
Documentation for Dictionarry's [Database](https://github.com/Dictionarry-Hub)

## Getting Started

This website is built with Svelte and statically generated from a Profilarr Compliant Database. Getting Started pages are hardcoded (since they need functionality not possible through markdown).

### Prerequisites
- Node.js 20+
- npm

### Installation
```bash
git clone https://github.com/Dictionarry-Hub/website
cd website
npm install
```

### Development

1. Build the database content:
```bash
tsx scripts/db.ts --repo <github-repo-url> --branch <branch-name>
```

2. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Customizing for Your Own Content

Fork this codebase to create your own documentation site with custom content sources.

### Database Generation

The site content is generated from a Profilarr-compliant database structure. Use the database script to pull content from any GitHub repository:

```bash
tsx scripts/db.ts --repo <github-url> --branch <branch-name>
```

The script processes multiple content types from your repository:
- YAML files in `regex_patterns/`, `custom_formats/`, `profiles/`, and `media_management/`
- Automatically builds a searchable index and category structure

Additional options:
- `--cache`: Cache repository for faster rebuilds
- `--only <types>`: Process specific content types (regex, custom-formats, quality-profiles, media-management, markdown, static)
- `--token <token>`: Access private repositories

### Profile Wizard

Customize the quality profile selection wizard by editing `src/shared/constants/flowchartOptions.ts`:

- `flowchartColumns`: Define decision categories and their options
- `qualityProfiles`: Configure profiles with their selection paths and URLs

### Markdown Content

Add static markdown files directly to the public directory:
- `public/wiki/`: Wiki articles and documentation
- `public/devlogs/`: Development logs and updates
- `public/gettingStarted/`: Getting started guides and tutorials