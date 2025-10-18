# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, grouped by feature modules under `src/modules/*`. Shared shadcn/ui primitives live in `src/components/`, hooks in `src/hooks/`, and Zustand slices in `src/store/`. GraphQL types/codegen output sits in `src/types/gql/`, while server utilities are under `src/server/` and static assets in `public/`. Tests sit beside their targets.

## Build, Test, and Development Commands
Run `yarn dev` to start the Next.js app on port 5001; never auto-start it for the user. `yarn build` compiles for production and `yarn start` serves the built bundle. Use `yarn lint` for ESLint checks and `yarn format` for Prettier. Execute `yarn test` or `yarn test path/to/file.spec.tsx` for Jest suites. Keep GraphQL typings fresh with `yarn generate` or watch updates via `yarn generate:watch`.

## Coding Style & Naming Conventions
TypeScript strict mode, two-space indentation, LF endings, no semicolons, and single quotes are the defaults. Imports are ordered with `eslint-plugin-simple-import-sort`; prefer `import type` when importing only types. Preserve the `.cont.tsx` (data/logic) and `.comp.tsx` (pure UI) split. Constants stay `UPPER_CASE`, Tailwind classes drive styling, and add `data-testid` selectors when tests need stable hooks.

## Design System & Forms
New UI should use shadcn/ui + Radix primitives. When touching legacy HeadlessUI code, replace it with shadcn/ui equivalents. Forms migrate toward Zod schemas; maintainers may leave existing Yup logic untouched unless editing those areas. Keep React Hook Form patterns consistent and reuse shared form components where available.

## Modal & UI Patterns
Use the global modal store (`useModalGlobalStore`) and slots (`sheet`, `dialog1`, `dialog2`). Always pass a `title`, wire `onSubmit`/`onClose`, and size dialogs appropriately. Sheets suit side panels or multi-step flows, while dialog2 nests inside dialog1 when necessary. Clean up listeners or timers in modal teardown callbacks.

## Testing Guidelines
Jest with Testing Library covers unit and integration tests. Name suites `*.spec.ts(x)` next to the implementation and focus on behavior visible to end users. Store shared mocks under colocated `__mocks__` directories. Before opening a PR, confirm `yarn lint` and `yarn test` succeed and extend coverage when business logic changes.

## Commit & Pull Request Guidelines
Follow the commit prefixes used in history (`feat:`, `fix:`, `chore:`, `refactor:`) and keep messages scoped and descriptive. Pull requests should summarize the change, list verification steps, call out follow-ups, and attach UI screenshots or clips when relevant. Link issues or specs to give reviewers context and request review only after automated checks pass.
