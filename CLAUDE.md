# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

- Development: `yarn dev` (port 5001)
- Build: `yarn build`
- Production: `yarn start` (port 5001)
- Lint: `yarn lint`
- Format: `yarn format`
- Test: `yarn test` (unit tests with Jest)
- Test a single file: `yarn test path/to/test.spec.tsx`
- GraphQL codegen: `yarn generate` or `yarn generate:watch`

**IMPORTANT**: NEVER run `yarn dev` or start the development server automatically. The user will start the dev server manually when needed.

## Code Style

- TypeScript with strict mode enabled
- No semicolons, single quotes
- Import ordering with simple-import-sort ESLint plugin
- Prefer `import type` for type-only imports
- React hooks rules strictly enforced
- Constants use UPPER_CASE naming
- LF line endings, 2 space indentation
- Component files: `.comp.tsx` for pure components, `.cont.tsx` for containers
- Tailwind CSS for styling with custom design system
- Use `data-testid` for test selectors

## Architecture Overview

Next.js 14 frontend for ELI PANDA - maintenance management system for scientific facilities. Uses TanStack Query + GraphQL (Neo4j), React Hook Form + Zod, Zustand, shadcn/ui, Tailwind CSS v4.

For project structure and module organization, see `architecture` skill.

## Key Patterns

- **Container/Component separation**: `.cont.tsx` files handle logic and data fetching, `.comp.tsx` files are pure UI
- **Module organization**: Each feature module contains components, hooks, types, and store if needed
- **Form handling**: React Hook Form with Zod validation schemas
- **GraphQL operations**: Generated types with codegen, custom hooks for queries/mutations
- **Table implementations**: Custom PandaTable components with filtering, sorting, and pagination
- **Modal management**: Dynamic modal system using `useDynamicModalStore` with shadcn/ui Dialog and Sheet components
- **Toast notifications for mutations**: Use `toast.promise` from sonner for all async mutations to show loading/success/error states

### Toast Pattern for Mutations

Always use `toast.promise` for mutations to provide consistent user feedback. See `toast-patterns` skill for detailed examples.

## Data Fetching Patterns

Use TanStack Query with `queryFetcher` and `queryMutate` utilities from `@/utils/fetcher`. See `data-fetching` skill for detailed patterns and examples.

## Clean Code Principles

- **Single Responsibility**: Components focus on presentation OR logic (container/component pattern). Functions do one thing. Hooks manage one aspect of state.
- **DRY**: Repeated logic → custom hooks. Repeated UI → shared components. Repeated conditions → predicates. Repeated constants → constants files.
- **Meaningful Names**: `getUserById`, `UserProfileCard`, `isEmpty`, `hasPermission`, `canEdit`. Avoid abbreviations except `fm` for `formatMessage`.
- **Small Functions**: Under 20 lines. Extract complex logic. Use early returns to reduce nesting.
- **Type Safety**: Strict mode. Avoid `any` (use `unknown`). Use type guards and predicates. Interfaces for shapes, types for unions.
- **Predicates for Logic**: Extract boolean conditions to named functions (`hasEditPermission`, `isResourceActive`).

