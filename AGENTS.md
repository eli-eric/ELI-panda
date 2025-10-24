# Repository Guidelines

## Project Structure & Module Organization
`src/modules/*` holds feature modules that pair UI, hooks, and GraphQL logic per domain. Shared primitives stay in `src/components/`, reusable hooks in `src/hooks/`, and Zustand slices in `src/store/`. GraphQL codegen artifacts live under `src/types/gql/`, server helpers under `src/server/`, and assets in `public/`. Tests reside beside their targets as `*.spec.ts(x)` files with optional local `__mocks__` folders.

## Build, Test, and Development Commands
Start Next.js on port 5001 with `yarn dev` only when the user requests it. Ship-ready bundles come from `yarn build`; serve them via `yarn start`. Lint with `yarn lint`, format with `yarn format`, and run Jest suites using `yarn test` or scope to one file (`yarn test path/to/file.spec.tsx`). Launch Cypress UI mode through `yarn cy:open` or headless runs via `yarn cy:run`. Regenerate GraphQL types with `yarn generate`; watch changes using `yarn generate:watch`.

## Coding Style & Naming Conventions
Strict TypeScript, two-space indentation, LF endings, single quotes, and no semicolons are enforced. `eslint-plugin-simple-import-sort` manages import order; prefer `import type` for type-only imports. Maintain the `.cont.tsx` container and `.comp.tsx` presenter split, keep constants `UPPER_CASE`, and rely on Tailwind utilities. Apply `data-testid` sparingly for resilient selectors.

## UI, Forms, and Modal Patterns
Adopt shadcn/ui + Radix primitives by default and replace HeadlessUI when editing legacy code. Coordinate overlays through `useModalGlobalStore` with slots `sheet`, `dialog1`, and `dialog2`, always supplying `title`, `onSubmit`, and `onClose`. Forms run through React Hook Form; prefer Zod for new schemas while leaving untouched Yup flows as-is.

## Architecture Overview
The app is a Next.js 14 + React 19 frontend for the ELI Panda maintenance platform. TanStack Query orchestrates client-side data, Apollo GraphQL fronts a Neo4j backend, and MinIO handles object storage. Zustand stores track global state, custom PandaTable components wrap TanStack Table, and NextAuth.js integrates Azure AD.

## Testing Guidelines
Use Jest with Testing Library for unit and integration coverage and Cypress for end-to-end paths. Keep tests co-located, assert observable behavior, and expand suites when logic changes. Always run `yarn lint` and `yarn test` before opening a PR; schedule Cypress where regressions are likely.

## Commit & Pull Request Guidelines
Commits follow prefixes like `feat:`, `fix:`, `chore:`, and `refactor:` with scoped messages. In PRs, summarize the change, list verification steps (`yarn lint`, `yarn test`, Cypress runs), link issues or specs, and attach UI evidence when visuals shift. Request review only after automated checks pass and note any deferred follow-ups.
