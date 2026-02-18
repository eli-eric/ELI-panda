# Form Wizard V3 - Examples & Pitfalls

## Real-World Examples

### Primary Example: Service Line Wizard

File: `src/modules/orderItem/components/serviceLines/form/service-line-v3.wizz.tsx`

Key features demonstrated:

- Uses `TABLE_IDS` and `ITEM_USAGE_FILTERS` constants
- Memoizes complex objects (`categoryFilters`, `serviceTypeData`)
- Uses `fm()` directly in title props
- Proper useCallback with correct dependencies
- Step validation and conditional rendering
- Side effects in `onStepComplete`
- Documented eslint-disable and special cases

### Secondary Example: Spare Assignment Wizard

File: `src/modules/shared/system/use-spare/components/spare-assignment-wizard.cont.tsx`

Key features:

- Shows proper usage of `shouldShow` with formData parameter
- Demonstrates error handling in onSubmit
- Multi-step workflow with nested modals

## Advanced Patterns

### Conditional Steps Based on Multiple Fields

```typescript
const shouldShowAdvancedStep = useCallback((data: FormType) => {
    return data.userType === 'advanced' && data.experience > 5 && Boolean(data.certification)
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
    [setAdditionalData],
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

## Common Pitfalls

### Don't: Create new objects in render

```typescript
// Bad - creates new object every render
<WizardStep
  validate={(data) => Boolean(data.field)}
>
```

### Do: Use useCallback for functions

```typescript
// Good - stable reference
const validate = useCallback((data: FormType) => {
  return Boolean(data.field)
}, [])

<WizardStep validate={validate}>
```

### Don't: Use useEffect to sync form state

```typescript
// Bad - causes issues
useEffect(() => {
    if (externalData) {
        setValue('field', externalData.value)
    }
}, [externalData, setValue])
```

### Do: Use callbacks for form updates

```typescript
// Good - direct update
const handleSelect = useCallback(
    value => {
        setValue('field', value)
    },
    [setValue],
)
```

### Don't: Forget to memoize complex objects

```typescript
// Bad - new array every render
<MyTable
  filters={[{ id: 'category', value: data.category }]}
/>
```

### Do: Memoize arrays and objects

```typescript
// Good - stable reference
const filters = useMemo(() => {
  return [{ id: 'category', value: data.category }]
}, [data.category])

<MyTable filters={filters} />
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
