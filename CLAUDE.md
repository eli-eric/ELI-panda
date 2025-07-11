# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

- Development: `yarn dev` (port 5001)
- Build: `yarn build`
- Production: `yarn start` (port 5001)
- Lint: `yarn lint`
- Format: `yarn format`
- Test: `yarn test` (unit tests)
- Test a single file: `yarn test path/to/test.spec.tsx`
- Cypress: `yarn cy:open` (UI) or `yarn cy:run` (headless)
- GraphQL codegen: `yarn generate` or `yarn generate:watch`

## Code Style

- TypeScript with strict mode
- No semicolons, single quotes
- Import ordering with simple-import-sort
- Prefer import type for type imports
- React hooks rules strictly enforced
- Constants use UPPER_CASE naming
- LF line endings, 2 space indentation
- Component files: `.comp.tsx` for pure components, `.cont.tsx` for containers
- Tailwind for styling
- Use data-testid for test selectors

## Project Structure

- Feature-based organization in `/src/modules`
- Reusable components in `/src/components`
- Custom hooks in `/src/hooks`
- Global state with Zustand in `/src/store`
- Form state with React Hook Form + Yup validation
- Data fetching with TanStack Query
- Tables with TanStack Table
