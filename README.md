# ELI-PANDA

### (ELI oPerations And maiNtenance DAtabase)

The premise that good maintenance practices are fundamental to success is beyond question. In accordance with IMPULSE Project requirements, ELI facilities had an obligation to create a joint spare parts database. The essential intention behind this requirement had several purposes, such as: to build up a relevant database in order to minimize possible downtime for user experiments, to determine which spare parts must be stocked in advance, and to make cost-effective maintenance decisions.

This repository contains the main frontend web application built with [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), and [NextAuth](https://next-auth.js.org/).

## Prerequisites

- Node.js 22+ (see `.nvmrc`)
- Yarn (npm/pnpm are blocked by the `preinstall` check)

## Getting Started

1. Install dependencies:

```bash
yarn install
```

2. Create `.env` from `env-example` in the project root.

With default `env-example` values, the app runs on port `5001` against the mock server (`src/pages/api/mock-server`).

3. Run the development server:

```bash
yarn dev
```

Open [http://localhost:5001](http://localhost:5001) in your browser.

## Scripts

The following commands are available in `package.json`:

- `yarn dev` - start Next.js development server on port 5001
- `yarn build` - create production build
- `yarn start` - start production server on port 5001
- `yarn lint` - run Next.js lint and ESLint (with autofix)
- `yarn type-check` - run TypeScript type checks without output
- `yarn format` - format codebase with Prettier
- `yarn generate` - run GraphQL code generation
- `yarn generate:watch` - run GraphQL codegen in watch mode
- `yarn test` - run TypeScript check for tests and Jest suite
- `yarn e2e` - run Playwright E2E tests
- `yarn e2e:headed` - run E2E tests with headed browser
- `yarn e2e:ui` - run E2E tests in Playwright UI mode
- `yarn e2e:report` - open Playwright HTML report
- `yarn e2e:install` - install Playwright Chromium browser

For E2E architecture and mocking details, see `e2e/README.md`.

## Husky Git Hooks

- Husky is installed automatically via the `prepare` script during `yarn install`.
- The pre-push hook (`.husky/pre-push`) runs:
    - `yarn test`
    - `yarn e2e`
- If the hook fails, the push is blocked until tests pass.
- If Playwright browser binaries are missing, run `yarn e2e:install`.

## Backend for This UI

The UI accesses data through the ELI PANDA API.

More information is in the API repository README:
[https://github.com/eli-eric/eli-panda-api/tree/main](https://github.com/eli-eric/eli-panda-api/tree/main)

## Documentation

Documentation lives in [`docs/`](./docs/) and is published to the GitHub Pages wiki on merge to `dev`.

- [`docs/Home.md`](./docs/Home.md) — wiki landing page (entry point).
- [`docs/user-guide/`](./docs/user-guide/README.md) — end-user documentation, one folder per module with a `README.md` overview and per-workflow pages under `workflows/`. See [`docs/user-guide/_template/`](./docs/user-guide/_template/) for the templates.
- [`docs/technical/`](./docs/technical/README.md) — engineering reference: [`app-architecture.md`](./docs/technical/app-architecture.md), [`authentication.md`](./docs/technical/authentication.md), [`permissions-model.md`](./docs/technical/permissions-model.md), [`deployment-runbook.md`](./docs/technical/deployment-runbook.md), [`local-development.md`](./docs/technical/local-development.md), plus per-feature pages (e.g. [`systems-family/`](./docs/technical/systems-family/README.md), [`catalogue-and-items.md`](./docs/technical/catalogue-and-items.md), [`orders-and-order-items.md`](./docs/technical/orders-and-order-items.md)).
- [`docs/CONTEXT.md`](./docs/CONTEXT.md) — cross-cutting domain glossary. Authoritative names; per-feature pages own long definitions.
- [`docs/adr/`](./docs/adr/) — Architecture Decision Records. Append-only; copy [`0000-template.md`](./docs/adr/0000-template.md) to create one.
- [`docs/implementation-plans/`](./docs/implementation-plans/) — historical implementation plans for larger features.

### Updating docs when you ship a feature

Two repo skills automate the recurring patterns. Trigger them from Claude Code (the agent will read the SKILL.md and apply the procedure):

| When you ship… | Run this skill | What it does |
|---|---|---|
| A user-visible change (new workflow, dialog, button, validation, permission shift, or a "Coming soon" item is now real) | [`/update-user-guide`](./.agents/skills/update-user-guide/SKILL.md) | Adds or updates the right page under `docs/user-guide/<module>/`, refreshes the persona table and *Common workflows* links, drops fulfilled "Coming soon" bullets. |
| A code-visible change (new public hook/store/mutation, module layout shift, resolved Open question, decision worth recording) | [`/update-technical-docs`](./.agents/skills/update-technical-docs/SKILL.md) | Updates the matching `docs/technical/<area>.md` (query/mutation tables, module map, flow sections), keeps `docs/CONTEXT.md` aligned, and prompts for an ADR when the decision is load-bearing. |

Most features ship both surfaces — run both skills in the same PR so user and engineering docs land together. See each skill's SKILL.md for the full checklist and authoring conventions.
