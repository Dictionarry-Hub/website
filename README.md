
# website 3.0
Documentation for Dictionarry's [Database](https://github.com/Dictionarry-Hub)

## Getting Started

This website is built with Svelte and statically generated from a Profilarr Compliant Database. Getting Started pages are hardcoded (since they need functionality not possible through markdown).

### Prerequisites
- Node.js 20+
- npm

### Installation
```bash
git clone <repo-url>
cd website
npm install
```

### Development

1. Fetch the database content:
```bash
npm run db:stable  # Use stable database
# OR
npm run db:dev     # Use development database
```

2. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Database Sources

The site pulls content from a database repository using a script (`scripts/db.ts`). 

```bash
tsx scripts/db.ts --repo <github-repo-url> --branch <branch-name>

# Examples:
tsx scripts/db.ts --repo https://github.com/Dictionarry-Hub/database --branch stable
tsx scripts/db.ts --repo https://github.com/xshatterx/database --branch main
```
### Building for Production

```bash
npm run db:stable *# Fetch database*
npm run build *# Build static site*
```

The static site will be generated in the `dist/` directory.
