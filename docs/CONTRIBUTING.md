# Contributing

This guide covers how to submit changes. For the branching model and deployment, see
[DEVELOPMENT.md](DEVELOPMENT.md).

## Table of Contents

- [Getting Started](#getting-started)
- [Making a Change](#making-a-change)
    - [Starting Your Branch](#starting-your-branch)
    - [Staying Up to Date](#staying-up-to-date)
    - [Submitting a Pull Request](#submitting-a-pull-request)
    - [PR Scope](#pr-scope)
- [Guidelines](#guidelines)
    - [Naming](#naming)
    - [Code Conventions](#code-conventions)
    - [AI-Generated Content](#ai-generated-content)

## Getting Started

### Prerequisites

| Tool                           | Version | Description               |
| ------------------------------ | ------- | ------------------------- |
| [Git](https://git-scm.com/)    | 2.x+    | Version control           |
| [Node.js](https://nodejs.org/) | 22.13+  | Runtime for build tooling |
| [pnpm](https://pnpm.io/)       | 11+     | Package manager           |

```bash
git clone https://github.com/Dictionarry-Hub/website.git
cd website
pnpm install
pnpm dev
```

### Editor Setup

VS Code is recommended. Open the project and accept the suggested extensions when prompted.
Formatting and indentation are enforced via `.editorconfig` and `.vscode/settings.json`.

## Making a Change

### Starting Your Branch

Branch off `develop` with a descriptive name:

```bash
git checkout develop
git pull
git checkout -b feat/search-page
```

### Staying Up to Date

Rebase onto `develop` to pick up changes:

```bash
git fetch origin
git rebase origin/develop
```

If there are conflicts, resolve them and continue:

```bash
git add <resolved-file>
git rebase --continue
```

After rebasing, force push:

```bash
git push --force-with-lease
```

### Submitting a Pull Request

Rebase one final time, then open a PR on GitHub targeting `develop`.

The PR title is the commit message. PRs are squash merged, so the title becomes the single commit on
`develop`. It must follow conventional commit format:

```
feat: add search page
fix: broken link in getting started guide
docs: update v2 dev log
```

### PR Scope

One change per PR. If you spot something small while working (a typo, a broken link) and it's in
content you're already touching, include it. If you'd describe the PR as doing two things, split it.

Content-only changes (wording, formatting, new articles) are always fine to bundle in a single PR.

## Guidelines

### Naming

**Branches:**

| Prefix      | Use                   | Example                    |
| ----------- | --------------------- | -------------------------- |
| `feat/`     | New features          | `feat/search-page`         |
| `fix/`      | Bug fixes             | `fix/broken-nav-link`      |
| `refactor/` | Code restructuring    | `refactor/layout-system`   |
| `chore/`    | Maintenance, deps, CI | `chore/update-deps`        |
| `docs/`     | Content changes       | `docs/add-getting-started` |
| `style/`    | Visual / CSS changes  | `style/code-block-theme`   |

**Commits:** [Conventional Commits](https://www.conventionalcommits.org/). Imperative tense: what
the commit does when applied, not what you did.

```
feat: add search page
fix: meta tags missing on wiki pages
docs: add dev log for v3 migration
```

### Code Conventions

- TypeScript for all code. No `any` (enforced by ESLint).
- Tailwind for styling. No Typography plugin.
- Formatting is handled by Prettier on save. Don't fight it.
- Data fetching happens in `+page.server.ts` at build time, not client-side.

### AI-Generated Content

All writing on this site must be your own. AI-assisted drafting, rephrasing, or generation of
content is not permitted. This applies everywhere, but we care most about dev logs and wiki
articles. The whole point of those is that a person sat down and wrote something. An LLM
regurgitating a summary of what happened defeats the purpose entirely. These are first-person
accounts and original writing. If you didn't write it, don't submit it.

For code contributions, AI tools may be used as assistants, but the code must be yours. You are
responsible for every line, the reasoning behind it, and the ability to explain it. PR descriptions
and review replies must reflect your own understanding. Maintainers may close PRs that appear to be
unreviewed generated output.
