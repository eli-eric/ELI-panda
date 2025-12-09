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

This is a Next.js 14 application serving as the frontend for ELI PANDA (oPerations And maiNtenance DAtabase), a maintenance management system for scientific facilities.

### Core Technologies

- **Frontend**: Next.js 14 with React 19, TypeScript
- **Architecture**: Hybrid - Page Router (main) + App Router (new features)
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Authentication**: NextAuth.js with Azure AD integration
- **Database**: Neo4j (Graph Database) accessed via GraphQL API
- **Data Fetching**: TanStack Query v5 + Apollo GraphQL Server
- **Forms**: React Hook Form with Zod validation
- **State Management**: Zustand
- **Tables**: TanStack Table with custom PandaTable implementations
- **File Storage**: MinIO (S3-compatible object storage)
- **Testing**: Jest + Testing Library, Cypress for E2E

### Project Structure

```
/src
├── modules/              # Feature-based modules (domain-driven design)
│   ├── systems/         # System management features
│   ├── orders/          # Order management features
│   ├── catalogue/       # Catalogue features
│   ├── orderItem/       # Order item features
│   ├── systemItem/      # System item features
│   └── shared/          # Shared cross-domain features
│       ├── form/wizardV3/    # Multi-step form wizard
│       ├── system/           # System-related shared features
│       └── catalogue/        # Catalogue-related shared features
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── form/           # Form components
│   ├── overlays/       # Modal and slideover components
│   └── table/          # Table components
├── hooks/              # Custom React hooks
│   ├── fetch/          # Data fetching hooks
│   ├── form/           # Form-related hooks
│   ├── graphql/        # GraphQL query/mutation hooks
│   └── filter/         # Filter state hooks
├── store/              # Global Zustand stores
├── lib/                # Library utilities and helpers
│   ├── utils.ts        # General utilities (cn(), etc.)
│   └── predicates/     # Predicate functions
├── utils/              # General utility functions
├── types/              # Global type definitions
│   ├── constants/      # Global constants
│   └── gql/            # GraphQL generated types
└── server/             # Server-side code (Next.js API routes)
    ├── apollo/         # Apollo GraphQL server
    └── files/          # File handling (MinIO S3)
```

### Module Organization Pattern

Each feature module follows this structure:

```
/modules/{moduleName}/
├── components/           # React components
│   ├── {feature}/       # Feature subdirectories
│   ├── filters/         # Filter components
│   └── table/           # Table components
├── hooks/               # Custom hooks (queries, mutations)
├── types/               # Module-specific types
├── utils/               # Module-specific utilities
├── store/               # Module-specific Zustand stores (if needed)
├── {Name}.cont.tsx      # Container component (logic + data)
└── {Name}.comp.tsx      # Pure component (presentation)
```

## Key Patterns

- **Container/Component separation**: `.cont.tsx` files handle logic and data fetching, `.comp.tsx` files are pure UI
- **Module organization**: Each feature module contains components, hooks, types, and store if needed
- **Form handling**: React Hook Form with Zod validation schemas
- **GraphQL operations**: Generated types with codegen, custom hooks for queries/mutations
- **Table implementations**: Custom PandaTable components with filtering, sorting, and pagination
- **Modal management**: Dynamic modal system using `useDynamicModalStore` with shadcn/ui Dialog and Sheet components
- **Toast notifications for mutations**: Use `toast.promise` from sonner for all async mutations to show loading/success/error states

### Toast Pattern for Mutations

Always use `toast.promise` for mutations to provide consistent user feedback with loading, success, and error states:

```typescript
// Basic usage
toast.promise(createItem(data), {
  loading: 'Creating item...',
  success: 'Item created',
  error: 'Failed to create item'
})

// With callback on success (e.g., closing modal, navigation)
toast.promise(updateItem(data), {
  loading: 'Updating item...',
  success: () => {
    closeModal()
    return 'Item updated'
  },
  error: 'Failed to update item'
})

// With finally callback (e.g., resetting loading state)
toast.promise(deleteItem(uid), {
  loading: 'Removing item...',
  success: 'Item removed',
  error: 'Failed to remove item',
  finally: () => setIsDeleting(false)
})
```

**Note:** For validation errors (e.g., duplicate detection) that occur _before_ the mutation, use `toast.error()` directly:

```typescript
if (isDuplicate) {
  toast.error('This item already exists')
  return
}

toast.promise(addItem(data), { ... })
```

## Clean Code Principles

Follow these principles when writing code:

- **Single Responsibility Principle**: Each function, component, and module should have one clear purpose
  - Components should focus on presentation or logic, not both (use container/component pattern)
  - Functions should do one thing well
  - Hooks should manage one aspect of state or behavior

- **DRY (Don't Repeat Yourself)**: Extract reusable logic
  - Repeated logic → custom hooks
  - Repeated UI patterns → shared components
  - Repeated conditions → predicate functions
  - Repeated constants → constants files

- **Meaningful Names**: Use descriptive names that reveal intent
  - Functions: `getUserById`, `calculateTotal`, `validateEmail`
  - Components: `UserProfileCard`, `OrderSummary`, `SystemFilterSheet`
  - Predicates: `isEmpty`, `hasPermission`, `canEdit`, `shouldShowStep`
  - Avoid abbreviations unless widely understood (e.g., `fm` for `formatMessage`)

- **Small Functions**: Keep functions focused and concise
  - Aim for functions under 20 lines
  - Extract complex logic into helper functions
  - Use early returns to reduce nesting

- **Early Returns**: Use guard clauses to reduce nesting

  ```typescript
  // ✅ Good - early returns
  function processUser(user: User | null) {
    if (!user) return null
    if (!user.isActive) return null
    return user.profile
  }
  ```

- **Type Safety**: Leverage TypeScript for compile-time safety
  - Use strict mode
  - Avoid `any` - use `unknown` when type is truly unknown
  - Use type guards and predicates for runtime type narrowing
  - Prefer interfaces for object shapes, types for unions/intersections

- **Predicates for Logic**: Extract boolean conditions to named predicate functions
  ```typescript
  // ✅ Good - self-documenting
  if (hasEditPermission(user, resource) && isResourceActive(resource)) {
    // ...
  }
  ```

## Detailed Documentation

For detailed implementation guides, patterns, and examples, refer to these documentation files:

📖 **[Internationalization Guide](./.claude/i18n.md)**

- Message files and structure
- useIntl and FormattedMessage patterns
- Adding new translations
- Best practices and examples

📖 **[Design System Guide](./.claude/design-system.md)**

- shadcn/ui component usage
- Zod validation patterns
- Migration from HeadlessUI
- Tailwind CSS patterns
- Accessibility guidelines

📖 **[Predicates & Helper Functions](./.claude/predicates.md)**

- Organization by domain
- Common predicates (data, validation, type-guards, domain)
- Best practices and naming conventions
- Real-world examples

📖 **[Modal System Guide](./.claude/modals.md)**

- Dynamic modal system (useDynamicModalStore)
- Opening and closing modals
- Nested modals and z-index management
- Sheet vs Dialog usage
- Best practices and examples

📖 **[Form Wizard V3 Guide](./.claude/forms-wizard.md)**

- Multi-step form patterns
- FormWizard and WizardStep components
- Validation and conditional steps
- Best practices (memoization, useEffect guidance)
- Real-world examples

---

When working on features related to these topics, read the appropriate detailed documentation file for comprehensive guidance and examples.
