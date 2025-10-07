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
- Cypress: `yarn cy:open` (UI) or `yarn cy:run` (headless)
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

## Design System Migration

The codebase is currently migrating from HeadlessUI to shadcn/ui + Radix UI components:

### Current State

- **New components**: Use shadcn/ui components (Dialog, Sheet, Button, Card, etc.)
- **Legacy components**: Some HeadlessUI components still exist but are being phased out
- **Forms**: Mix of Yup validation (legacy) and Zod validation (new features)

### Migration Guidelines

- **Prefer shadcn/ui**: Always use shadcn/ui components for new features
- **Replace when editing**: When modifying existing components, replace HeadlessUI with shadcn/ui equivalents
- **Modal system**: Use the global modal system with shadcn/ui Dialog and Sheet components
- **Form validation**: Use Zod for new forms, migrate Yup schemas when editing existing forms
- **Consistent patterns**: Follow established shadcn/ui patterns for accessibility and styling

## Architecture Overview

This is a Next.js 14 application serving as the frontend for ELI PANDA (oPerations And maiNtenance DAtabase), a maintenance management system for scientific facilities.

### Core Technologies

- **Frontend**: Next.js 14 with React 19, TypeScript
- **Architecture**: Hybrid - Page Router (main) + App Router (new features)
- **Styling**: Tailwind CSS v4 with shadcn/ui components (migrating from HeadlessUI)
- **Authentication**: NextAuth.js with Azure AD integration
- **Database**: Neo4j (Graph Database) accessed via GraphQL API
- **Data Fetching**: TanStack Query v5 + Apollo GraphQL Server
- **Forms**: React Hook Form with Yup validation (some Zod in newer features)
- **State Management**: Zustand
- **Tables**: TanStack Table with custom PandaTable implementations
- **File Storage**: MinIO (S3-compatible object storage)
- **Testing**: Jest + Testing Library, Cypress for E2E

### Project Structure

- **Feature-based modules** in `/src/modules/` - Each domain (systems, catalogue, orders, etc.) has its own module
- **Reusable UI components** in `/src/components/` - Shared components and shadcn/ui components
- **Custom hooks** in `/src/hooks/` - Organized by category (fetch, form, graphql, etc.)
- **Global state** in `/src/store/` - Zustand stores for app-wide state
- **GraphQL integration** in `/src/types/gql/` - Generated types and operations
- **Server-side code** in `/src/server/` - Apollo server setup and file handling

### Key Patterns

- **Container/Component separation**: `.cont.tsx` files handle logic and data fetching, `.comp.tsx` files are pure UI
- **Module organization**: Each feature module contains components, hooks, types, and store if needed
- **Form handling**: Consistent use of React Hook Form with Yup schemas (migrating to Zod)
- **GraphQL operations**: Generated types with codegen, custom hooks for queries/mutations
- **Table implementations**: Custom PandaTable components with filtering, sorting, and pagination
- **Modal management**: Global modal system using Zustand store with shadcn/ui Dialog and Sheet components

## Modal System Usage

The application uses a centralized modal system with `ModalProvider` and `useModalGlobalStore` for managing overlays.

### Modal Types Available

- **Sheet**: Side panel modal (mobile-first, responsive width)
- **Dialog1**: Primary modal dialog
- **Dialog2**: Secondary modal dialog (for nested modals)

### Basic Modal Usage

```typescript
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

const MyComponent = () => {
  const { openModal, closeModal } = useModalGlobalStore()

  const handleOpenModal = () => {
    openModal('dialog1', {
      component: MyModalContent,
      props: {
        title: 'Modal Title',
        description: 'Modal description',
        size: 'lg', // 'sm' | 'md' | 'lg' | 'xl' | 'full'
        someData: 'example'
      },
      onSubmit: (data) => {
        console.log('Modal submitted:', data)
        closeModal('dialog1')
      },
      onClose: () => {
        console.log('Modal closed')
      }
    })
  }

  return <Button onClick={handleOpenModal}>Open Modal</Button>
}
```

### Modal Component Pattern

```typescript
interface MyModalContentProps {
  title?: string
  description?: string
  someData?: string
  onSubmit?: (data: any) => void
  onClose?: () => void
  parentTriggerFn?: (...args: any[]) => void
}

const MyModalContent: React.FC<MyModalContentProps> = ({
  someData,
  onSubmit,
  onClose
}) => {
  const handleSubmit = (formData: any) => {
    // Process form data
    onSubmit?.(formData)
  }

  return (
    <div className="space-y-4">
      {/* Modal content */}
      <Button onClick={() => handleSubmit(data)}>Submit</Button>
      <Button variant="outline" onClick={onClose}>Cancel</Button>
    </div>
  )
}
```

### Sheet vs Dialog Usage

- **Sheet**: Use for forms, filters, detailed views on mobile
- **Dialog1**: Use for confirmations, simple forms, primary actions
- **Dialog2**: Use for nested modals, secondary actions triggered from Dialog1

### Modal Best Practices

- Always provide `title` in props for accessibility
- Handle both `onSubmit` and `onClose` callbacks
- Use appropriate `size` prop for content
- For nested modals, use Dialog2 when Dialog1 is already open
- Clean up any subscriptions or timers in `onClose`
