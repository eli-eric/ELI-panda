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

## Internationalization (i18n)

The application uses `react-intl` for internationalization with a custom message system.

### Message Files

- **Message definitions**: `/src/i18n/src/locale/en.ts` - Contains all translation strings
- **Message paths**: `/src/i18n/src/messages.ts` - Exports `message` object with type-safe paths

### Usage Pattern

There are two ways to use translations in components:

**Pattern 1: useIntl hook (preferred for dynamic content)**

```typescript
import { useIntl } from 'react-intl'
import { message } from '@/i18n/src/messages'

const MyComponent = () => {
  const { formatMessage: fm } = useIntl()

  // ✅ Correct - use message object for type-safe paths
  return <h1>{fm({ id: message.common.ui.appName })}</h1>

  // ❌ Incorrect - hardcoded strings are not type-safe
  return <h1>{fm({ id: 'common.ui.appName' })}</h1>
}
```

**Pattern 2: FormattedMessage component (preferred for static content)**

```typescript
import { FormattedMessage } from 'react-intl'
import { message } from '@/i18n/src/messages'

const MyComponent = () => {
  // ✅ Correct - declarative and type-safe
  return (
    <h1>
      <FormattedMessage id={message.common.ui.appName} />
    </h1>
  )

  // With values interpolation
  return (
    <p>
      <FormattedMessage
        id={message.common.greeting}
        values={{ name: 'User' }}
      />
    </p>
  )
}
```

### Adding New Translations

1. Add translation string to `/src/i18n/src/locale/en.ts`
2. Use via `message` object: `fm({ id: message.path.to.key })` or `<FormattedMessage id={message.path.to.key} />`
3. The `message` object mirrors the structure of the locale file

**Example:**

```typescript
// In /src/i18n/src/locale/en.ts
export const messages = {
  common: {
    globalSearch: {
      title: 'Global Search',
      placeholder: 'Type to search...'
    }
  }
}

// In your component
fm({ id: message.common.globalSearch.title })
```

## Design System

### Current State

The application has completed its migration to modern design patterns:

- **UI Components**: shadcn/ui components (Dialog, Sheet, Button, Card, etc.) - **Standard**
- **Legacy Components**: HeadlessUI components exist in older code - **Legacy only, do not use for new features**
- **Form Validation**: Zod validation - **Standard** (Yup is legacy)
- **Styling**: Tailwind CSS v4 with custom design system

### Guidelines

- **Always use shadcn/ui**: Use shadcn/ui components for all new features and components
- **Always use Zod**: Use Zod for all form validation in new features
- **Migrate when editing**: When modifying existing components, migrate HeadlessUI to shadcn/ui and Yup to Zod only if actively editing that code
- **Modal system**: Use the dynamic modal system (`useDynamicModalStore`) with shadcn/ui Dialog and Sheet components
- **Consistent patterns**: Follow established shadcn/ui patterns for accessibility and styling
- **Don't proactively migrate**: Only migrate legacy code when you're actively working on that specific feature

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

The application follows a feature-based architecture with clear separation of concerns:

#### Core Directories

- **`/src/modules/`** - Feature-based modules (domain-driven design)
  - Each domain (systems, orders, catalogue, etc.) has its own self-contained module
  - Module structure: `components/`, `hooks/`, `types/`, `utils/`, `store/` (if needed)
  - Examples: `systems/`, `orders/`, `catalogue/`, `orderItem/`, `systemItem/`
  - Special: `shared/` module contains reusable cross-domain features
    - `shared/form/wizardV3/` - Multi-step form wizard (recommended)
    - `shared/system/` - System-related shared features
    - `shared/catalogue/` - Catalogue-related shared features

- **`/src/components/`** - Reusable UI components
  - `ui/` - shadcn/ui components (Dialog, Sheet, Button, Card, etc.)
  - `form/` - Form components (inputs, controls, inline-edit)
  - `overlays/` - Modal and slideover components
  - `layout/` - Layout components (containers, grids)
  - `table/` - Table-related components
  - `navigation/` - Navigation components (breadcrumbs, menus)

- **`/src/hooks/`** - Custom React hooks organized by category
  - `fetch/` - Data fetching hooks
  - `form/` - Form-related hooks
  - `graphql/` - GraphQL query/mutation hooks
  - `filter/` - Filter state hooks

- **`/src/store/`** - Global Zustand stores
  - `useDynamicModalStore` - Dynamic modal management (unlimited modals)
  - `useDarkModeStore` - Theme state
  - `useTableStateStore` - Table UI state (pagination, sorting)
  - `useFormControlStore` - Form control state

- **`/src/lib/`** - Library utilities and helper functions
  - `utils.ts` - General utilities (cn(), truncateString())
  - `predicates/` - Domain-organized predicate functions
  - `environment/` - Environment variable helpers
  - `navigation/` - Navigation utilities

- **`/src/utils/`** - General utility functions
  - `formatters.tsx` - Formatting utilities (numbers, dates)
  - `fetcher.ts` - Data fetching utilities
  - `modalHelpers.ts` - Modal-related helpers

- **`/src/types/`** - Global type definitions
  - `constants/` - Global constants (TABLE_IDS, roles, paths, ITEM_USAGE_FILTERS)
  - `gql/` - GraphQL generated types (from codegen)
  - `responses/` - API response types

- **`/src/server/`** - Server-side code (Next.js API routes)
  - `apollo/` - Apollo GraphQL server setup
  - `files/` - File handling (upload, download, MinIO S3)

#### Module Organization Pattern

Each feature module follows this internal structure:

```
/modules/{moduleName}/
├── components/           # React components
│   ├── {feature}/       # Feature subdirectories
│   │   ├── form/        # Form components
│   │   └── hooks/       # Hook implementations
│   ├── filters/         # Filter components
│   └── table/           # Table components
├── hooks/               # Custom hooks (queries, mutations)
├── types/               # Module-specific types
├── utils/               # Module-specific utilities
├── store/               # Module-specific Zustand stores
└── {Name}.cont.tsx      # Container component (logic + data)
└── {Name}.comp.tsx      # Pure component (presentation)

### Key Patterns

- **Container/Component separation**: `.cont.tsx` files handle logic and data fetching, `.comp.tsx` files are pure UI
- **Module organization**: Each feature module contains components, hooks, types, and store if needed
- **Form handling**: React Hook Form with Zod validation schemas
- **GraphQL operations**: Generated types with codegen, custom hooks for queries/mutations
- **Table implementations**: Custom PandaTable components with filtering, sorting, and pagination
- **Modal management**: Dynamic modal system using `useDynamicModalStore` with shadcn/ui Dialog and Sheet components

### Clean Code Principles

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

  // ❌ Bad - nested conditions
  function processUser(user: User | null) {
    if (user) {
      if (user.isActive) {
        return user.profile
      }
    }
    return null
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

  // ❌ Bad - inline logic
  if (user.role === 'admin' || user.id === resource.ownerId && resource.status === 'active') {
    // ...
  }
  ```

## Predicates & Helper Functions

The application uses centralized predicates and helper functions to promote code reusability and self-documenting logic.

### Organization Pattern

Predicates are organized by domain in `/src/lib/predicates/`:

```
/src/lib/predicates/
├── data.ts           # Common data predicates (isEmpty, hasValue, etc.)
├── validation.ts     # Validation predicates (isValidEmail, isValidUUID, etc.)
├── type-guards.ts    # Type guard predicates (isDefined, isString, etc.)
└── domain.ts         # Domain-specific predicates (isSystemActive, hasPermission, etc.)
```

### Common Data Predicates (`data.ts`)

Use these predicates for common data checks:

```typescript
// Null/undefined/empty checks
export const isEmpty = (value: unknown): boolean =>
  value === null || value === undefined || value === ''

export const isNotEmpty = (value: unknown): boolean => !isEmpty(value)

export const hasValue = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined

export const isNullOrUndefined = (value: unknown): value is null | undefined =>
  value === null || value === undefined

// Array checks
export const isEmptyArray = (arr: unknown[]): boolean => arr.length === 0

export const hasItems = <T>(arr: T[]): boolean => arr.length > 0

// Object checks
export const isEmptyObject = (obj: Record<string, unknown>): boolean =>
  Object.keys(obj).length === 0

export const hasProperties = (obj: Record<string, unknown>): boolean =>
  Object.keys(obj).length > 0
```

**Usage:**

```typescript
import { hasValue, hasItems } from '@/lib/predicates/data'

// ✅ Good - readable and self-documenting
if (hasValue(user.email) && hasItems(user.roles)) {
  // Process user
}

// ❌ Bad - inline logic
if (user.email !== null && user.email !== undefined && user.roles.length > 0) {
  // Process user
}
```

### Validation Predicates (`validation.ts`)

Use these predicates for input validation:

```typescript
// Email validation
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// UUID validation
export const isValidUUID = (uuid: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid)

// Phone number validation
export const isValidPhoneNumber = (phone: string): boolean =>
  /^\+?[\d\s-()]+$/.test(phone)

// Password strength
export const isStrongPassword = (password: string): boolean =>
  password.length >= 8 &&
  /[a-z]/.test(password) &&
  /[A-Z]/.test(password) &&
  /[0-9]/.test(password)
```

**Usage:**

```typescript
import { isValidEmail, isValidUUID } from '@/lib/predicates/validation'

// Form validation
const validateForm = (data: FormData) => {
  if (!isValidEmail(data.email)) {
    return { email: 'Invalid email address' }
  }
  if (!isValidUUID(data.userId)) {
    return { userId: 'Invalid user ID format' }
  }
  return null
}
```

### Type Guard Predicates (`type-guards.ts`)

Use these predicates for TypeScript type narrowing:

```typescript
// Basic type guards
export const isDefined = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined

export const isString = (value: unknown): value is string =>
  typeof value === 'string'

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && !isNaN(value)

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean'

export const isArray = <T>(value: unknown): value is T[] =>
  Array.isArray(value)

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

// Advanced type guards
export const isNonEmptyString = (value: unknown): value is string =>
  isString(value) && value.length > 0

export const isNonEmptyArray = <T>(value: unknown): value is T[] =>
  isArray(value) && value.length > 0
```

**Usage:**

```typescript
import { isDefined, isNonEmptyString } from '@/lib/predicates/type-guards'

// TypeScript type narrowing
function processData(data: string | null | undefined) {
  if (isDefined(data)) {
    // TypeScript knows data is string here
    return data.toUpperCase()
  }
  return null
}

// Filter with type guards
const validStrings = items.filter(isNonEmptyString)
// validStrings is typed as string[]
```

### Domain-Specific Predicates (`domain.ts`)

Use these predicates for application-specific logic:

```typescript
import type { User, System, Resource } from '@/types'

// System predicates
export const isSystemActive = (system: { status: string }): boolean =>
  system.status === 'active'

export const isSystemInMaintenance = (system: { status: string }): boolean =>
  system.status === 'maintenance'

// Permission predicates
export const hasEditPermission = (user: User, resource: Resource): boolean =>
  user.role === 'admin' || resource.ownerId === user.id

export const canEdit = (permissions: string[]): boolean =>
  permissions.includes('edit') || permissions.includes('admin')

export const canDelete = (permissions: string[]): boolean =>
  permissions.includes('delete') || permissions.includes('admin')

export const isAdmin = (user: User): boolean =>
  user.role === 'admin'

// Status predicates
export const isPending = (status: string): boolean => status === 'pending'

export const isCompleted = (status: string): boolean => status === 'completed'

export const isCancelled = (status: string): boolean => status === 'cancelled'
```

**Usage:**

```typescript
import { isSystemActive, hasEditPermission } from '@/lib/predicates/domain'

// UI conditional rendering
{isSystemActive(system) && (
  <Button onClick={handleEdit}>Edit System</Button>
)}

// Access control
if (hasEditPermission(currentUser, resource)) {
  // Allow edit
}
```

### Best Practices

#### 1. Extract Complex Conditions

```typescript
// ✅ Good - extract to predicate
const canSubmitForm = (form: FormData): boolean =>
  hasValue(form.email) &&
  isValidEmail(form.email) &&
  hasValue(form.password) &&
  isStrongPassword(form.password)

if (canSubmitForm(formData)) {
  // Submit
}

// ❌ Bad - inline complexity
if (
  formData.email !== null &&
  formData.email !== undefined &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
  formData.password !== null &&
  formData.password !== undefined &&
  formData.password.length >= 8
) {
  // Submit
}
```

#### 2. Use Type Guards for Type Safety

```typescript
// ✅ Good - provides type narrowing
import { isDefined, isNonEmptyArray } from '@/lib/predicates/type-guards'

function processItems(items: Item[] | null | undefined) {
  if (isDefined(items) && isNonEmptyArray(items)) {
    // TypeScript knows items is Item[] here
    return items.map(item => item.name)
  }
  return []
}
```

#### 3. Name Predicates Clearly

Use prefixes that indicate boolean return:

- `is` - state checks (`isEmpty`, `isActive`, `isValid`)
- `has` - possession checks (`hasValue`, `hasPermission`, `hasItems`)
- `can` - capability checks (`canEdit`, `canDelete`, `canSubmit`)
- `should` - conditional logic (`shouldShow`, `shouldEnable`, `shouldValidate`)

#### 4. Keep Predicates Pure

```typescript
// ✅ Good - pure function, no side effects
export const isValidUser = (user: User): boolean =>
  hasValue(user.email) && isValidEmail(user.email)

// ❌ Bad - has side effects
export const isValidUser = (user: User): boolean => {
  console.log('Validating user') // Side effect!
  logToAnalytics('validation') // Side effect!
  return hasValue(user.email) && isValidEmail(user.email)
}
```

#### 5. Organize by Domain

Place predicates in the appropriate file:

- **General purpose** → `data.ts` or `type-guards.ts`
- **Input validation** → `validation.ts`
- **Business logic** → `domain.ts`

```typescript
// ✅ Good organization
// /src/lib/predicates/data.ts
export const isEmpty = (value: unknown): boolean => { /* ... */ }

// /src/lib/predicates/domain.ts
export const isSystemActive = (system: System): boolean => { /* ... */ }

// ❌ Bad - everything in one file
// /src/lib/predicates/index.ts (too large, not organized)
```

### Helper Functions in `/src/utils/`

For non-predicate helpers, use `/src/utils/`:

- **`formatters.tsx`** - Formatting utilities (dates, numbers, currency)
- **`fetcher.ts`** - Data fetching utilities
- **`modalHelpers.ts`** - Modal-related helpers

```typescript
// Example: formatters
import { formatCurrency, formatDate } from '@/utils/formatters'

const total = formatCurrency(1234.56) // "$1,234.56"
const date = formatDate(new Date()) // "2025-11-24"
```

## Modal System

The application uses a dynamic modal system with `useDynamicModalStore` that supports unlimited modals with automatic z-index management.

### Key Features

- **Unlimited Modals**: Open as many sheets and dialogs as needed simultaneously
- **Automatic Z-Index Management**: Each modal automatically gets the correct z-index based on open order (FIFO)
- **Custom IDs**: Use custom IDs for easy modal management or let the system auto-generate them
- **Type-Aware Rendering**: Sheet vs Dialog components rendered correctly based on type
- **No Z-Index Conflicts**: Modals layer correctly - later modals appear on top

### Core Components

- **`useDynamicModalStore`**: Zustand store with Map-based architecture
- **`DynamicModalProvider`**: Dynamic modal renderer
- **`sheet.tsx` and `dialog.tsx`**: shadcn/ui components with z-index support

### Basic Usage

```typescript
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

const MyComponent = () => {
  const { openModal, closeModal } = useDynamicModalStore()

  const handleOpenModal = () => {
    // Option A: Auto-generated ID
    const modalId = openModal('dialog', {
      component: MyModalContent,
      props: {
        title: 'Modal Title',
        description: 'Modal description',
        size: 'lg', // 'sm' | 'md' | 'lg' | 'xl' | 'full'
        someData: 'example'
      },
      onSubmit: (data) => {
        console.log('Modal submitted:', data)
        closeModal(modalId)
      },
      onClose: () => {
        console.log('Modal closed')
      }
    })
  }

  return <Button onClick={handleOpenModal}>Open Modal</Button>
}
```

### Custom Modal IDs (Recommended)

For reusable or identifiable modals, use custom IDs:

```typescript
const { openModal, closeModal } = useDynamicModalStore()

// Open with custom ID
openModal('dialog', {
  id: 'user-edit-modal',
  component: UserEditForm,
  props: { title: 'Edit User', userId: 123 }
})

// Close by custom ID
closeModal('user-edit-modal')
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

### Sheet vs Dialog Usage

Choose the appropriate modal type based on your use case:

- **Sheet**: Side panel modal - use for filters, forms, detailed views on mobile
- **Dialog**: Center modal - use for confirmations, alerts, simple forms, primary actions

```typescript
// Sheet for filters
openModal('sheet', {
  id: 'system-filters',
  component: SystemFilters,
  props: { title: 'Filter Systems', side: 'left' } // or 'right'
})

// Dialog for confirmation
openModal('dialog', {
  id: 'delete-confirmation',
  component: DeleteConfirmation,
  props: { title: 'Confirm Deletion', size: 'sm' }
})
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

### Modal Best Practices

- Always provide `title` in props for accessibility
- Handle both `onSubmit` and `onClose` callbacks
- Use appropriate `size` prop for content (`sm`, `md`, `lg`, `xl`, `full`)
- Use custom IDs for modals that need to be referenced elsewhere
- Clean up any subscriptions or timers in `onClose`
- For nested modals, the system automatically handles z-index layering

### Example Files

Reference these files for implementation examples:

- `useSpareDialog.ts` - Spare assignment wizard with nested modals
- `useSystemsFilterSheetV2.ts` - System filters sheet implementation
- `SystemFilterButtonV2.tsx` - Filter button with modal trigger

### Legacy System (Do Not Use)

The old `useModalGlobalStore` with fixed slots (`dialog1`, `dialog2`, etc.) is deprecated. Only use it if modifying existing legacy code. For all new features, use `useDynamicModalStore`.

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
