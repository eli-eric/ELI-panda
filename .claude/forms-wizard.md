# Form Wizard V3 Guide

The application uses a declarative Form Wizard V3 system for multi-step forms with React Hook Form integration.

## Core Components

- **FormWizard**: Main wrapper component that manages wizard state and form context
- **WizardStep**: Individual step component with validation and conditional rendering

Located in: `/src/modules/shared/form/wizardV3/`

## When to Use Wizard V3

Use Form Wizard V3 for:

- ✅ Multi-step forms with 2+ steps
- ✅ Forms with conditional steps based on previous inputs
- ✅ Complex data entry workflows with validation per step
- ✅ Forms requiring step-by-step validation before submission

**Don't use for:**

- ❌ Simple single-step forms (use regular React Hook Form)
- ❌ Forms without step-based validation requirements
- ❌ Read-only multi-section content (use tabs or accordions instead)

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

## Best Practices

### 1. Use TABLE_IDS Constant for Table Identifiers

```typescript
import { TABLE_IDS } from '@/types/constants/tableIds'

// ✅ Good
const tableId = TABLE_IDS.SERVICE_LINE_ITEMS_SELECT

// ❌ Bad - hardcoded string
const tableId = 'items-select-table'
```

### 2. Memoize Complex Values to Prevent Re-renders

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

**Why memoization matters:**
- Prevents unnecessary re-renders of child components
- Ensures stable references for useCallback dependencies
- Improves performance in large forms with many steps
- Prevents validation from running unnecessarily

### 3. Use fm() Directly in Title Prop (Don't Memoize Translations)

```typescript
// ✅ Good - formatMessage is stable, call directly
<WizardStep
  id="step1"
  title={fm({ id: message.step1.title })}
>

// ❌ Bad - unnecessary memoization
const stepTitles = useMemo(
  () => ({
    step1: fm({ id: message.step1.title })
  }),
  [fm]
)
```

**Why:**
- `formatMessage` (fm) is a stable function that doesn't change
- React's reconciliation is fast enough for string comparisons
- Over-memoization adds unnecessary complexity

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

**Key points:**
- `validate` receives form data and returns boolean
- `shouldShow` receives form data and returns boolean
- Both should be memoized with `useCallback`
- External dependencies go in the dependency array

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

**When to use onStepComplete:**
- Applying table filters based on step data
- Fetching data for the next step
- Clearing specific form fields
- Triggering analytics events
- Any side effect that should happen AFTER step validation passes

### 6. Document Unusual Patterns with Comments

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

## Complete Real-World Examples

### Primary Example: Service Line Wizard

File: `src/modules/orderItem/components/serviceLines/form/service-line-v3.wizz.tsx`

Key features demonstrated:
- ✅ Uses `TABLE_IDS` and `ITEM_USAGE_FILTERS` constants
- ✅ Memoizes complex objects (`categoryFilters`, `serviceTypeData`)
- ✅ Uses `fm()` directly in title props
- ✅ Proper useCallback with correct dependencies
- ✅ Step validation and conditional rendering
- ✅ Side effects in `onStepComplete`
- ✅ Documented eslint-disable and special cases

### Secondary Example: Spare Assignment Wizard

File: `src/modules/shared/system/use-spare/components/spare-assignment-wizard.cont.tsx`

Key features:
- Shows proper usage of `shouldShow` with formData parameter
- Demonstrates error handling in onSubmit
- Multi-step workflow with nested modals

## Important: Minimize useEffect Usage

**Prefer callbacks over useEffect whenever possible:**

- ✅ **User interactions** → Use callbacks (onClick, onChange, onSelect)
- ✅ **Derived state** → Use useMemo or direct calculations
- ✅ **One-time initialization** → Use empty deps array `useEffect([], [])` with ref guard
- ❌ **Avoid useEffect** for synchronizing form state (causes dependency cycles)

### Anti-pattern: useEffect for Form Synchronization

```typescript
// ❌ Bad - dependency hell, infinite loops, race conditions
useEffect(() => {
  setValue('field', computedValue)
}, [computedValue, otherDep, anotherDep, setValue])
```

**Problems:**
- Creates dependency cycles
- Can cause infinite loops
- Race conditions between multiple useEffects
- Hard to debug and maintain
- Unpredictable execution order

### Correct Pattern: Callbacks

```typescript
// ✅ Good - direct, no side effects, no dependencies
const handleChange = useCallback((value) => {
  setValue('field', value)
  // Update derived fields immediately
  setValue('derivedField', computeDerived(value))
}, [setValue])

// Use in component
<Select
  value={field}
  onChange={handleChange}
/>
```

**Benefits:**
- Predictable execution order
- No dependency issues
- Easier to test
- More explicit control flow

### Exception: One-time Mount Initialization

```typescript
// ✅ Acceptable - runs once on mount, no dependency issues
const isInitializedRef = useRef(false)

useEffect(() => {
  if (isInitializedRef.current) return
  isInitializedRef.current = true

  // Initialization logic
  if (shouldInitialize) {
    initializeData()
  }
}, []) // Empty deps = mount only
```

**When to use:**
- Data fetching on mount
- Setting up subscriptions
- Initializing third-party libraries
- One-time setup that can't be triggered by user interaction

### Key Principle

> **If the logic can be triggered by user interaction, use a callback. Only use useEffect for true side effects (API calls, subscriptions, DOM manipulation).**

## Step Configuration

### WizardStep Props

```typescript
interface WizardStepProps<T> {
  id: string                                    // Unique step identifier
  title: string                                 // Step title (shown in stepper)
  validate?: (data: T) => boolean              // Optional validation function
  shouldShow?: (data: T) => boolean            // Optional conditional visibility
  onStepComplete?: (data: T) => void | Promise<void>  // Optional completion handler
  children: React.ReactNode                    // Step content
}
```

### FormWizard Props

```typescript
interface FormWizardProps<T> {
  onSubmit: (data: T, reset: UseFormReset<T>) => void | Promise<void>
  defaultValues?: Partial<T>
  children: React.ReactNode  // WizardStep components
}
```

## Advanced Patterns

### Conditional Steps Based on Multiple Fields

```typescript
const shouldShowAdvancedStep = useCallback((data: FormType) => {
  return (
    data.userType === 'advanced' &&
    data.experience > 5 &&
    Boolean(data.certification)
  )
}, [])
```

### Dynamic Step Content

```typescript
<WizardStep
  id="items"
  title={fm({ id: message.selectItems })}
>
  {/* Conditional content within step */}
  {selectedCategory === 'hardware' ? (
    <HardwareItemsTable />
  ) : (
    <SoftwareItemsTable />
  )}
</WizardStep>
```

### Async Validation in onStepComplete

```typescript
const handleStep1Complete = useCallback(
  async (data: FormType) => {
    try {
      // Validate data with API
      const isValid = await validateWithAPI(data.field1)
      if (!isValid) {
        toast.error('Validation failed')
        // Note: onStepComplete can't prevent step transition
        // Use validate prop for blocking validation
      }

      // Fetch data for next step
      const nextStepData = await fetchData(data.field1)
      setAdditionalData(nextStepData)
    } catch (error) {
      console.error('Step completion error:', error)
    }
  },
  [setAdditionalData]
)
```

### Complex Validation Logic

```typescript
const validateOrderStep = useCallback((data: OrderFormData) => {
  // Must have items
  if (!data.items || data.items.length === 0) {
    return false
  }

  // Must have delivery date if delivery type is scheduled
  if (data.deliveryType === 'scheduled' && !data.deliveryDate) {
    return false
  }

  // Total must be positive
  const total = calculateTotal(data.items)
  if (total <= 0) {
    return false
  }

  return true
}, [])
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

### Accessing Form Values in Validation

```typescript
// validate receives current form data
const validateStep = useCallback((data: FormType) => {
  // Can access any form field
  if (!data.firstName || !data.lastName) {
    return false
  }

  // Can use predicates
  if (!isValidEmail(data.email)) {
    return false
  }

  return true
}, [])
```

## Testing Wizard Forms

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('MyFormWizard', () => {
  it('should validate step before proceeding', async () => {
    render(<MyFormWizard />)

    const nextButton = screen.getByText('Next')
    await userEvent.click(nextButton)

    // Should stay on step 1 if validation fails
    expect(screen.getByText('Step 1')).toBeInTheDocument()
  })

  it('should show conditional step when criteria met', async () => {
    render(<MyFormWizard />)

    // Fill required field
    const input = screen.getByLabelText('Field 1')
    await userEvent.type(input, 'value')

    // Proceed to next step
    await userEvent.click(screen.getByText('Next'))

    // Conditional step should appear
    await waitFor(() => {
      expect(screen.getByText('Step 2')).toBeInTheDocument()
    })
  })
})
```

## Common Pitfalls

### ❌ Don't: Create new objects in render

```typescript
// ❌ Bad - creates new object every render
<WizardStep
  validate={(data) => Boolean(data.field)}
>
```

### ✅ Do: Use useCallback for functions

```typescript
// ✅ Good - stable reference
const validate = useCallback((data: FormType) => {
  return Boolean(data.field)
}, [])

<WizardStep validate={validate}>
```

### ❌ Don't: Use useEffect to sync form state

```typescript
// ❌ Bad - causes issues
useEffect(() => {
  if (externalData) {
    setValue('field', externalData.value)
  }
}, [externalData, setValue])
```

### ✅ Do: Use callbacks for form updates

```typescript
// ✅ Good - direct update
const handleSelect = useCallback((value) => {
  setValue('field', value)
}, [setValue])
```

### ❌ Don't: Forget to memoize complex objects

```typescript
// ❌ Bad - new array every render
<MyTable
  filters={[{ id: 'category', value: data.category }]}
/>
```

### ✅ Do: Memoize arrays and objects

```typescript
// ✅ Good - stable reference
const filters = useMemo(() => {
  return [{ id: 'category', value: data.category }]
}, [data.category])

<MyTable filters={filters} />
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
   - Values that change every render anyway
   - Simple translations (fm calls)

```typescript
// ✅ Memoize complex objects
const tableConfig = useMemo(() => ({
  tableId: TABLE_IDS.ITEMS_SELECT,
  filters: categoryFilters,
  sorting: defaultSorting
}), [categoryFilters, defaultSorting])

// ✅ Memoize callbacks
const handleStepComplete = useCallback(async (data) => {
  await processData(data)
}, [processData])

// ❌ Don't memoize primitives
const title = useMemo(() => 'Step 1', []) // Unnecessary!

// ❌ Don't memoize simple translations
const title = useMemo(() => fm({ id: message.title }), [fm]) // Unnecessary!
```

## Debugging

### Enable Debug Mode

```typescript
// Add console logs to track wizard state
const validateStep = useCallback((data: FormType) => {
  console.log('Validating step with data:', data)
  const isValid = Boolean(data.field)
  console.log('Validation result:', isValid)
  return isValid
}, [])

const shouldShow = useCallback((data: FormType) => {
  console.log('Checking shouldShow with data:', data)
  const show = Boolean(data.condition)
  console.log('Should show:', show)
  return show
}, [])
```

### Common Issues

**Issue: Step won't proceed**
- Check validation function returns `true`
- Verify required fields are filled
- Check console for validation errors

**Issue: Step not appearing**
- Verify `shouldShow` returns `true`
- Check form data has required values
- Ensure step is included in wizard

**Issue: Infinite re-renders**
- Memoize all functions and complex objects
- Check useEffect dependencies
- Avoid creating new objects in render

## TypeScript Types

```typescript
import type { UseFormReset } from 'react-hook-form'

interface WizardStepProps<T> {
  id: string
  title: string
  validate?: (data: T) => boolean
  shouldShow?: (data: T) => boolean
  onStepComplete?: (data: T) => void | Promise<void>
  children: React.ReactNode
}

interface FormWizardProps<T> {
  onSubmit: (data: T, reset: UseFormReset<T>) => void | Promise<void>
  defaultValues?: Partial<T>
  children: React.ReactNode
}
```

## Resources

- Primary example: `src/modules/orderItem/components/serviceLines/form/service-line-v3.wizz.tsx`
- Secondary example: `src/modules/shared/system/use-spare/components/spare-assignment-wizard.cont.tsx`
- Wizard implementation: `/src/modules/shared/form/wizardV3/`
