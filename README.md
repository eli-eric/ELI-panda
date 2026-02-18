# ELI-PANDA

### (ELI oPerations And maiNtenance DAtabase)

The premise that good maintenance practices are fundamental to success is beyond question. In accordance with IMPULSE Project requirements, ELI facilities had an obligation to create a joint spare parts database. The essential intention behind this requirement had several purposes, such as: to build up a relevant database in order to minimize possible downtime for user experiments, to determine which spare parts must be stocked in advance, and to make cost-effective maintenance decisions.

This repository contains the main frontend web application built with [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), and [NextAuth](https://next-auth.js.org/).

## Prerequisites

- Node.js 20+
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
