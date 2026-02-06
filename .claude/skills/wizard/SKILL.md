---
name: form-wizard
description: Multi-step form wizard (Form Wizard V3) with React Hook Form integration. Use when creating multi-step forms, implementing wizard flows, step validation, conditional steps, or onStepComplete handlers.
user-invocable: false
---

# Form Wizard V3 Guide

The application uses a declarative Form Wizard V3 system for multi-step forms with React Hook Form integration.

## Core Components

- **FormWizard**: Main wrapper component that manages wizard state and form context
- **WizardStep**: Individual step component with validation and conditional rendering

Located in: `/src/modules/shared/form/wizardV3/`

## When to Use Wizard V3

Use Form Wizard V3 for:

- Multi-step forms with 2+ steps
- Forms with conditional steps based on previous inputs
- Complex data entry workflows with validation per step
- Forms requiring step-by-step validation before submission

**Don't use for:**

- Simple single-step forms (use regular React Hook Form)
- Forms without step-based validation requirements
- Read-only multi-section content (use tabs or accordions instead)

## Basic Wizard Structure

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
        title={fm({ id: message.step1.title })}
        validate={validateStep1}
        onStepComplete={handleStep1Complete}
      >
        {/* Step content */}
        <div>Step 1 content</div>
      </WizardStep>

      <WizardStep
        id="step2"
        title={fm({ id: message.step2.title })}
        shouldShow={shouldShowStep2}
      >
        {/* Step content */}
        <div>Step 2 content</div>
      </WizardStep>
    </FormWizard>
  )
}
```

## Step Configuration

### WizardStep Props

```typescript
interface WizardStepProps<T> {
    id: string // Unique step identifier
    title: string // Step title (shown in stepper)
    validate?: (data: T) => boolean // Optional validation function
    shouldShow?: (data: T) => boolean // Optional conditional visibility
    onStepComplete?: (data: T) => void | Promise<void> // Optional completion handler
    children: React.ReactNode // Step content
}
```

### FormWizard Props

```typescript
interface FormWizardProps<T> {
    onSubmit: (data: T, reset: UseFormReset<T>) => void | Promise<void>
    defaultValues?: Partial<T>
    children: React.ReactNode // WizardStep components
}
```

## Best Practices

### 1. Use TABLE_IDS Constant for Table Identifiers

```typescript
import { TABLE_IDS } from '@/types/constants/tableIds'

// Good
const tableId = TABLE_IDS.SERVICE_LINE_ITEMS_SELECT

// Bad - hardcoded string
const tableId = 'items-select-table'
```

### 2. Memoize Complex Values to Prevent Re-renders

```typescript
// Good - prevents child component re-renders
const serviceTypeData = useMemo(() => {
  return data ? { name: data.name, uid: data.uid } : undefined
}, [data?.name, data?.uid])

// Good - memoize array/object dependencies for useCallback
const categoryFilters = useMemo(() => {
  if (!data?.category) return null
  return [{ id: 'category', value: data.category }]
}, [data?.category])

// Bad - creates new object on every render
<MyComponent data={data ? { name: data.name, uid: data.uid } : undefined} />
```

### 3. Use fm() Directly in Title Prop

```typescript
// Good - formatMessage is stable, call directly
<WizardStep
  id="step1"
  title={fm({ id: message.step1.title })}
>

// Bad - unnecessary memoization
const stepTitles = useMemo(
  () => ({
    step1: fm({ id: message.step1.title })
  }),
  [fm]
)
```

### 4. Validation and Conditional Rendering

```typescript
// Validation - returns boolean
const validateStep = useCallback((data: FormType) => {
  return Boolean(data.requiredField)
}, [])

// Conditional step visibility - MUST use formData parameter
const shouldShowStep = useCallback((formData: FormType) => {
  return formData.someField === 'someValue'
}, [/* external dependencies if needed */])

<WizardStep
  id="step1"
  validate={validateStep}
  shouldShow={shouldShowStep}
>
```

### 5. Step Completion Handlers for Side Effects

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

<WizardStep
  id="step1"
  onStepComplete={handleStepComplete}
>
```

## Minimize useEffect Usage

**Prefer callbacks over useEffect whenever possible:**

- **User interactions** -> Use callbacks (onClick, onChange, onSelect)
- **Derived state** -> Use useMemo or direct calculations
- **One-time initialization** -> Use empty deps array with ref guard
- **Avoid useEffect** for synchronizing form state (causes dependency cycles)

### Anti-pattern: useEffect for Form Synchronization

```typescript
// Bad - dependency hell, infinite loops, race conditions
useEffect(() => {
    setValue('field', computedValue)
}, [computedValue, otherDep, anotherDep, setValue])
```

### Correct Pattern: Callbacks

```typescript
// Good - direct, no side effects, no dependencies
const handleChange = useCallback((value) => {
  setValue('field', value)
  // Update derived fields immediately
  setValue('derivedField', computeDerived(value))
}, [setValue])

<Select
  value={field}
  onChange={handleChange}
/>
```

## Form Integration

### Using React Hook Form Inside Steps

```typescript
import { useFormContext } from 'react-hook-form'

const Step1Content = () => {
  const { register, formState: { errors } } = useFormContext<FormType>()

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
    </div>
  )
}

// In wizard
<WizardStep id="step1" title="Account Info">
  <Step1Content />
</WizardStep>
```

## Performance Optimization

### Memoization Strategy

1. **Always memoize:**
    - Functions passed as props (`validate`, `shouldShow`, `onStepComplete`)
    - Complex objects and arrays passed to child components
    - Computed values used in multiple places

2. **Don't memoize:**
    - Primitive values (strings, numbers, booleans)
    - JSX elements (React handles this)
    - Simple translations (fm calls)

```typescript
// Memoize complex objects
const tableConfig = useMemo(
    () => ({
        tableId: TABLE_IDS.ITEMS_SELECT,
        filters: categoryFilters,
        sorting: defaultSorting,
    }),
    [categoryFilters, defaultSorting],
)

// Memoize callbacks
const handleStepComplete = useCallback(
    async data => {
        await processData(data)
    },
    [processData],
)

// Don't memoize primitives
const title = useMemo(() => 'Step 1', []) // Unnecessary!
```

## Additional Resources

- For real-world examples and common pitfalls, see [examples.md](examples.md)
