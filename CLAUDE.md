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

## Dynamic Modal System V2 (NEW)

**⚠️ Migration in Progress**: The application is transitioning to a new dynamic modal system that supports unlimited modals with automatic z-index management.

### Key Improvements

- **Unlimited Modals**: Open as many sheets and dialogs as needed simultaneously
- **Automatic Z-Index Management**: Each modal automatically gets the correct z-index based on open order (FIFO)
- **Custom IDs**: Use custom IDs for easy modal management or let the system auto-generate them
- **Type-Aware Rendering**: Sheet vs Dialog components rendered correctly based on type
- **No Z-Index Conflicts**: Fixes issues where sheets appeared behind dialogs

### Core Components

- **`useDynamicModalStore`**: New Zustand store with Map-based architecture
- **`DynamicModalProvider`**: Dynamic modal renderer (runs alongside old `ModalProvider`)
- **Updated `sheet.tsx` and `dialog.tsx`**: Support inline z-index styles

### Migration Strategy

**Old System (Legacy)**:
```typescript
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

const { openModal, closeModal } = useModalGlobalStore()

// Fixed slots: 'sheet', 'dialog1', 'dialog2', 'dialog3'
openModal('dialog2', {
  component: MyComponent,
  props: { title: 'My Modal' }
})

closeModal('dialog2')
```

**New System (V2)**:
```typescript
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

const { openModal, closeModal } = useDynamicModalStore()

// Option A: Auto-generated ID
const modalId = openModal('dialog', {
  component: MyComponent,
  props: { title: 'My Modal' }
})
closeModal(modalId) // Use returned ID

// Option B: Custom ID (recommended for reusable modals)
openModal('dialog', {
  id: 'my-custom-modal',
  component: MyComponent,
  props: { title: 'My Modal' }
})
closeModal('my-custom-modal')
```

### Example: Nested Modals with Proper Layering

```typescript
// Open spare assignment wizard
const wizardId = openModal('dialog', {
  id: 'spare-wizard',
  component: SpareWizardComponent,
  props: { title: 'Assign Spare Part', size: 'xl' }
})
// Z-index: 50 (overlay), 51 (content)

// Inside wizard, open filter sheet
const filterId = openModal('sheet', {
  id: 'system-filters',
  component: FilterComponent,
  props: { title: 'Filter Systems', side: 'left' }
})
// Z-index: 52 (overlay), 53 (content) ← Automatically higher!

// Filter sheet is correctly rendered above the wizard dialog
```

### Z-Index Calculation

```
Base Z-Index: 50
For each modal in order:
- Overlay: baseZIndex + (modalIndex * 2)
- Content: baseZIndex + (modalIndex * 2) + 1

Example with 3 open modals:
Modal 1: overlay=50, content=51
Modal 2: overlay=52, content=53
Modal 3: overlay=54, content=55 (top layer)
```

### Additional Functions

```typescript
// Bring existing modal to front
bringToFront('my-modal-id')

// Close all modals at once
closeAllModals()

// Get modal instance by ID
const modal = getModalById('my-modal-id')
```

### Migration Checklist for New Features

When creating new modals, use the V2 system:

1. Import `useDynamicModalStore` instead of `useModalGlobalStore`
2. Change `openModal('dialog2', ...)` to `openModal('dialog', { id: 'unique-id', ... })`
3. Store returned `modalId` or use custom ID for closing
4. Update `closeModal` to use the ID instead of slot name

**Example Files Using V2**:
- `useSpareDialog.ts` - Spare assignment wizard
- `useSystemsFilterSheetV2.ts` - System filters (V2 version)
- `SystemFilterButtonV2.tsx` - Filter button (V2 version)

## Form Wizard V3 Pattern

The application uses a declarative Form Wizard V3 system for multi-step forms with React Hook Form integration.

### Core Components

- **FormWizard**: Main wrapper component that manages wizard state and form context
- **WizardStep**: Individual step component with validation and conditional rendering

### When to Use Wizard V3

Use Form Wizard V3 for:

- Multi-step forms with 2+ steps
- Forms with conditional steps based on previous inputs
- Complex data entry workflows with validation per step
- Forms requiring step-by-step validation before submission

### Basic Wizard Structure

```typescript
import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import type { UseFormReset } from 'react-hook-form'
import { FormWizard, WizardStep } from '@/modules/shared/form/wizardV3'
import { TABLE_IDS } from '@/types/constants/tableIds'

interface MyFormType {
  field1: string
  field2?: string
  // ... other fields
}

export const MyFormWizard = ({
  handleSubmit
}: {
  handleSubmit: (data: MyFormType, reset: UseFormReset<MyFormType>) => void
}) => {
  const { formatMessage: fm } = useIntl()

  // Step validation
  const validateStep1 = useCallback((data: MyFormType) => {
    return Boolean(data.field1)
  }, [])

  // Conditional step visibility
  const shouldShowStep2 = useCallback((data: MyFormType) => {
    return Boolean(data.field1)
  }, [])

  // Step completion handler (async operations, filters, etc.)
  const handleStep1Complete = useCallback(async (data: MyFormType) => {
    // Perform async operations after step completion
    console.log('Step 1 completed', data)
  }, [])

  return (
    <FormWizard<MyFormType> onSubmit={handleSubmit}>
      <WizardStep
        id="step1"
        title={fm({ id: 'messages.step1.title' })}
        validate={validateStep1}
        onStepComplete={handleStep1Complete}
      >
        {/* Step content */}
        <div>Step 1 content</div>
      </WizardStep>

      <WizardStep
        id="step2"
        title={fm({ id: 'messages.step2.title' })}
        shouldShow={shouldShowStep2}
      >
        {/* Step content */}
        <div>Step 2 content</div>
      </WizardStep>
    </FormWizard>
  )
}
```

### Wizard Best Practices

#### 1. **Use TABLE_IDS constant for table identifiers**

```typescript
import { TABLE_IDS } from '@/types/constants/tableIds'

// ✅ Good
const tableId = TABLE_IDS.SERVICE_LINE_ITEMS_SELECT

// ❌ Bad - hardcoded string
const tableId = 'items-select-table'
```

#### 2. **Memoize complex values to prevent re-renders**

```typescript
// ✅ Good - prevents child component re-renders
const serviceTypeData = useMemo(() => {
  return data ? { name: data.name, uid: data.uid } : undefined
}, [data?.name, data?.uid])

// ✅ Good - memoize array/object dependencies for useCallback
const categoryFilters = useMemo(() => {
  if (!data?.category) return null
  return [{ id: 'category', value: data.category }]
}, [data?.category])

// ❌ Bad - creates new object on every render
<MyComponent data={data ? { name: data.name, uid: data.uid } : undefined} />
```

#### 3. **Use fm() directly in title prop (don't memoize translations)**

```typescript
// ✅ Good - formatMessage is stable, call directly
<WizardStep
  id="step1"
  title={fm({ id: messages.step1.title })}
>

// ❌ Bad - unnecessary memoization
const stepTitles = useMemo(
  () => ({
    step1: fm({ id: messages.step1.title })
  }),
  [fm]
)
```

#### 4. **Validation and conditional rendering**

```typescript
// Validation - returns boolean
const validateStep = useCallback((data: FormType) => {
  return Boolean(data.requiredField)
}, [])

// Conditional step visibility - MUST use formData parameter
const shouldShowStep = useCallback((formData: FormType) => {
  return formData.someField === 'someValue'
}, [/* external dependencies if needed */])

// ⚠️ Special case: Need external data but keep signature for API consistency
const shouldShowStepWithExternal = useCallback((formData: FormType) => {
  // NOTE: Using closure over external data because it's not in formData
  // The formData parameter is kept for API consistency
  return externalData ? Boolean(externalData.property) : true
}, [externalData])

<WizardStep
  id="step1"
  validate={validateStep}
  shouldShow={shouldShowStep}
>
```

#### 5. **Step completion handlers for side effects**

```typescript
// Use onStepComplete for:
// - Applying filters
// - Fetching additional data
// - Clearing form fields
// - Analytics/tracking

const handleStepComplete = useCallback(
  async (data: FormType) => {
    if (categoryFilters) {
      setColumnFilters(categoryFilters)
    }
    // Other side effects
  },
  [categoryFilters, setColumnFilters]
)
```

#### 6. **Document unusual patterns with comments**

```typescript
// ✅ Good - explain why eslint-disable is needed
const data = useMemo(() => {
  return processData(input)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // Reason: We only track specific properties to prevent unnecessary re-renders
}, [input.specificProp])

// ✅ Good - explain closure over external data in shouldShow
const shouldShow = useCallback(
  (formData: FormType) => {
    // NOTE: Using closure over external API data because it's not in formData
    return apiData ? Boolean(apiData.property) : true
  },
  [apiData]
)
```

### Complete Real-World Examples

**Primary example**: `src/modules/orderItem/components/serviceLines/form/service-line-v3.wizz.tsx`

Key features demonstrated:

- ✅ Uses `TABLE_IDS` and `ITEM_USAGE_FILTERS` constants
- ✅ Memoizes complex objects (`categoryFilters`, `serviceTypeData`)
- ✅ Uses `fm()` directly in title props
- ✅ Proper useCallback with correct dependencies
- ✅ Step validation and conditional rendering
- ✅ Side effects in `onStepComplete`
- ✅ Documented eslint-disable and special cases

**Secondary example**: `src/modules/shared/system/use-spare/components/spare-assignment-wizard.cont.tsx`

- Shows proper usage of `shouldShow` with formData parameter
- Demonstrates error handling in onSubmit
