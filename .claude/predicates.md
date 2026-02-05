# Predicates & Helper Functions Guide

The application uses centralized predicates and helper functions to promote code reusability and self-documenting logic.

## Organization Pattern

Predicates are organized by domain in `/src/lib/predicates/`:

```
/src/lib/predicates/
├── data.ts           # Common data predicates (isEmpty, hasValue, etc.)
├── validation.ts     # Validation predicates (isValidEmail, isValidUUID, etc.)
├── type-guards.ts    # Type guard predicates (isDefined, isString, etc.)
└── domain.ts         # Domain-specific predicates (isSystemActive, hasPermission, etc.)
```

## Common Data Predicates (`data.ts`)

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

export const hasProperties = (obj: Record<string, unknown>): boolean => Object.keys(obj).length > 0
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

## Validation Predicates (`validation.ts`)

Use these predicates for input validation:

```typescript
// Email validation
export const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

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
export const isValidPhoneNumber = (phone: string): boolean => /^\+?[\d\s-()]+$/.test(phone)

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

## Type Guard Predicates (`type-guards.ts`)

Use these predicates for TypeScript type narrowing:

```typescript
// Basic type guards
export const isDefined = <T>(value: T | null | undefined): value is T =>
    value !== null && value !== undefined

export const isString = (value: unknown): value is string => typeof value === 'string'

export const isNumber = (value: unknown): value is number =>
    typeof value === 'number' && !isNaN(value)

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'

export const isArray = <T>(value: unknown): value is T[] => Array.isArray(value)

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

## Domain-Specific Predicates (`domain.ts`)

Use these predicates for application-specific logic:

```typescript
import type { User, System, Resource } from '@/types'

// System predicates
export const isSystemActive = (system: { status: string }): boolean => system.status === 'active'

export const isSystemInMaintenance = (system: { status: string }): boolean =>
    system.status === 'maintenance'

// Permission predicates
export const hasEditPermission = (user: User, resource: Resource): boolean =>
    user.role === 'admin' || resource.ownerId === user.id

export const canEdit = (permissions: string[]): boolean =>
    permissions.includes('edit') || permissions.includes('admin')

export const canDelete = (permissions: string[]): boolean =>
    permissions.includes('delete') || permissions.includes('admin')

export const isAdmin = (user: User): boolean => user.role === 'admin'

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

## Best Practices

### 1. Extract Complex Conditions

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

### 2. Use Type Guards for Type Safety

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

### 3. Name Predicates Clearly

Use prefixes that indicate boolean return:

- `is` - state checks (`isEmpty`, `isActive`, `isValid`)
- `has` - possession checks (`hasValue`, `hasPermission`, `hasItems`)
- `can` - capability checks (`canEdit`, `canDelete`, `canSubmit`)
- `should` - conditional logic (`shouldShow`, `shouldEnable`, `shouldValidate`)

**Examples:**

```typescript
// State checks
const isActive = (status: string): boolean => status === 'active'
const isEmpty = (value: string): boolean => value === ''
const isValid = (data: FormData): boolean => validateData(data)

// Possession checks
const hasValue = (val: unknown): boolean => val !== null && val !== undefined
const hasPermission = (user: User, perm: string): boolean => user.permissions.includes(perm)
const hasItems = (arr: unknown[]): boolean => arr.length > 0

// Capability checks
const canEdit = (user: User): boolean => user.role === 'editor' || user.role === 'admin'
const canDelete = (user: User, resource: Resource): boolean => user.id === resource.ownerId
const canSubmit = (form: FormData): boolean => form.isValid && !form.isSubmitting

// Conditional logic
const shouldShow = (condition: boolean): boolean => condition && isUserLoggedIn()
const shouldEnable = (feature: string): boolean => features.includes(feature)
const shouldValidate = (field: string): boolean => field.length > 0
```

### 4. Keep Predicates Pure

```typescript
// ✅ Good - pure function, no side effects
export const isValidUser = (user: User): boolean => hasValue(user.email) && isValidEmail(user.email)

// ❌ Bad - has side effects
export const isValidUser = (user: User): boolean => {
    console.log('Validating user') // Side effect!
    logToAnalytics('validation') // Side effect!
    return hasValue(user.email) && isValidEmail(user.email)
}
```

### 5. Organize by Domain

Place predicates in the appropriate file:

- **General purpose** → `data.ts` or `type-guards.ts`
- **Input validation** → `validation.ts`
- **Business logic** → `domain.ts`

```typescript
// ✅ Good organization
// /src/lib/predicates/data.ts
export const isEmpty = (value: unknown): boolean => {
    /* ... */
}

// /src/lib/predicates/domain.ts
export const isSystemActive = (system: System): boolean => {
    /* ... */
}

// ❌ Bad - everything in one file
// /src/lib/predicates/index.ts (too large, not organized)
```

## Real-World Examples

### Form Validation

```typescript
import { hasValue, isValidEmail, isStrongPassword } from '@/lib/predicates'

const validateRegistrationForm = (data: RegistrationFormData) => {
    const errors: Record<string, string> = {}

    if (!hasValue(data.email)) {
        errors.email = 'Email is required'
    } else if (!isValidEmail(data.email)) {
        errors.email = 'Invalid email format'
    }

    if (!hasValue(data.password)) {
        errors.password = 'Password is required'
    } else if (!isStrongPassword(data.password)) {
        errors.password =
            'Password must be at least 8 characters with uppercase, lowercase, and numbers'
    }

    return Object.keys(errors).length > 0 ? errors : null
}
```

### Conditional Rendering

```typescript
import { isSystemActive, hasEditPermission } from '@/lib/predicates/domain'
import { hasValue } from '@/lib/predicates/data'

const SystemCard = ({ system, currentUser }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{system.name}</CardTitle>
        {isSystemActive(system) && (
          <Badge variant="success">Active</Badge>
        )}
      </CardHeader>
      <CardContent>
        {hasValue(system.description) && (
          <p>{system.description}</p>
        )}
      </CardContent>
      <CardFooter>
        {hasEditPermission(currentUser, system) && (
          <Button onClick={handleEdit}>Edit</Button>
        )}
      </CardFooter>
    </Card>
  )
}
```

### Data Filtering

```typescript
import { isDefined, isNonEmptyArray } from '@/lib/predicates/type-guards'
import { isSystemActive } from '@/lib/predicates/domain'

const getActiveSystems = (systems: System[] | null | undefined) => {
    if (!isDefined(systems) || !isNonEmptyArray(systems)) {
        return []
    }

    return systems.filter(isSystemActive)
}
```

## Helper Functions in `/src/utils/`

For non-predicate helpers, use `/src/utils/`:

- **`formatters.tsx`** - Formatting utilities (dates, numbers, currency)
- **`fetcher.ts`** - Data fetching utilities
- **`modalHelpers.ts`** - Modal-related helpers

### Formatters Example

```typescript
// Example: formatters
import { formatCurrency, formatDate } from '@/utils/formatters'

const total = formatCurrency(1234.56) // "$1,234.56"
const date = formatDate(new Date()) // "2025-11-24"
```

### When to Use Predicates vs Helpers

**Use Predicates when:**

- Function returns a boolean
- Checking state, conditions, or validation
- Type narrowing with TypeScript
- Self-documenting conditional logic

**Use Helpers when:**

- Transforming data (formatting, mapping, reducing)
- Performing calculations
- Utility functions that return non-boolean values
- Side effects (fetching data, logging, etc.)

```typescript
// ✅ Predicate - returns boolean
const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// ✅ Helper - transforms data
const formatEmail = (email: string): string => email.toLowerCase().trim()

// ✅ Predicate - checks condition
const hasDiscount = (user: User): boolean => user.membershipLevel === 'premium'

// ✅ Helper - calculates value
const calculateDiscount = (price: number, user: User): number =>
    hasDiscount(user) ? price * 0.9 : price
```

## Creating New Predicates

When creating new predicates, follow these steps:

### Step 1: Identify the domain

Determine which file the predicate belongs in:

- Common data checks → `data.ts`
- Input validation → `validation.ts`
- Type guards → `type-guards.ts`
- Business logic → `domain.ts`

### Step 2: Use appropriate naming

Choose a prefix that indicates the predicate's purpose:

- `is*` for state/type checks
- `has*` for possession checks
- `can*` for capability checks
- `should*` for conditional logic

### Step 3: Keep it pure

Ensure the predicate:

- Has no side effects
- Returns a boolean
- Is deterministic (same input = same output)
- Has clear, focused logic

### Step 4: Add TypeScript types

Use type guards when appropriate to provide type narrowing:

```typescript
// Type guard predicate
export const isUser = (value: unknown): value is User =>
    isObject(value) && 'id' in value && 'email' in value

// Regular predicate
export const isActiveUser = (user: User): boolean => user.status === 'active'
```

### Step 5: Document complex logic

Add comments for non-obvious predicates:

```typescript
/**
 * Checks if a system is eligible for maintenance based on:
 * - System is not currently in maintenance
 * - System has been active for at least 30 days
 * - System has no pending orders
 */
export const isEligibleForMaintenance = (system: System): boolean =>
    !isSystemInMaintenance(system) && daysSinceActivation(system) >= 30 && !hasPendingOrders(system)
```

## Testing Predicates

Predicates are easy to test because they're pure functions:

```typescript
import { isValidEmail, hasValue } from '@/lib/predicates'

describe('isValidEmail', () => {
    it('returns true for valid emails', () => {
        expect(isValidEmail('test@example.com')).toBe(true)
    })

    it('returns false for invalid emails', () => {
        expect(isValidEmail('invalid')).toBe(false)
        expect(isValidEmail('test@')).toBe(false)
    })
})

describe('hasValue', () => {
    it('returns true for defined values', () => {
        expect(hasValue('test')).toBe(true)
        expect(hasValue(0)).toBe(true)
    })

    it('returns false for null/undefined', () => {
        expect(hasValue(null)).toBe(false)
        expect(hasValue(undefined)).toBe(false)
    })
})
```
