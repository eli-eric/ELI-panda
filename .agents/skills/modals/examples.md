# Modal System - Real-World Examples

## Example 1: Confirmation Dialog

```typescript
const { openModal, closeModal } = useDynamicModalStore()

const handleDelete = () => {
    const modalId = openModal('dialog', {
        id: 'delete-confirmation',
        component: ConfirmationDialog,
        props: {
            title: 'Delete System',
            description:
                'Are you sure you want to delete this system? This action cannot be undone.',
            confirmText: 'Delete',
            cancelText: 'Cancel',
            variant: 'destructive',
            size: 'sm',
        },
        onSubmit: async () => {
            await deleteSystem(systemId)
            closeModal(modalId)
            toast.success('System deleted')
        },
        onClose: () => {
            console.log('Delete cancelled')
        },
    })
}
```

## Example 2: Filter Sheet

```typescript
const { openModal, closeModal } = useDynamicModalStore()

const handleOpenFilters = () => {
    openModal('sheet', {
        id: 'system-filters',
        component: SystemFilterSheet,
        props: {
            title: 'Filter Systems',
            side: 'left',
            initialFilters: filters,
            onApply: newFilters => {
                setFilters(newFilters)
                closeModal('system-filters')
            },
        },
    })
}
```

## Example 3: Multi-Step Wizard

```typescript
const { openModal, closeModal } = useDynamicModalStore()

const handleOpenWizard = () => {
    const modalId = openModal('dialog', {
        id: 'spare-assignment-wizard',
        component: SpareAssignmentWizard,
        props: {
            title: 'Assign Spare Part',
            size: 'xl',
            systemId: currentSystemId,
        },
        onSubmit: async data => {
            await assignSparePart(data)
            closeModal(modalId)
            toast.success('Spare part assigned')
            refetchData()
        },
        onClose: () => {
            // Reset wizard state if needed
            resetWizardState()
        },
    })
}
```

## Example 4: Nested Modal with Filters

```typescript
// Parent wizard opens a filter sheet
const SpareAssignmentWizard = () => {
  const { openModal, closeModal } = useDynamicModalStore()

  const handleOpenFilters = () => {
    openModal('sheet', {
      id: 'wizard-filters',
      component: ItemFilterSheet,
      props: {
        title: 'Filter Items',
        side: 'right',
        onApply: (filters) => {
          applyFilters(filters)
          closeModal('wizard-filters')
        }
      }
    })
  }

  return (
    <div>
      <Button onClick={handleOpenFilters}>Open Filters</Button>
      {/* Wizard content */}
    </div>
  )
}
```

## Implementation Reference

### Example Files

Reference these files for implementation examples:

- **`src/hooks/graphql/system/useSpareDialog.ts`** - Spare assignment wizard with nested modals
- **`src/modules/systems/components/filters/useSystemsFilterSheetV2.ts`** - System filters sheet implementation
- **`src/modules/systems/components/filters/SystemFilterButtonV2.tsx`** - Filter button with modal trigger

### DynamicModalProvider Setup

The `DynamicModalProvider` should be included in your root layout:

```typescript
// In _app.tsx or layout.tsx
import { DynamicModalProvider } from '@/components/DynamicModalProvider'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <DynamicModalProvider />
    </>
  )
}
```

## Troubleshooting

### Modal Not Appearing

Check:

1. Is `DynamicModalProvider` included in the app?
2. Is the component being passed correctly?
3. Are there any console errors?

```typescript
// Debug: Check if modal was created
const modalId = openModal('dialog', { /* ... */ })
console.log('Modal ID:', modalId)

const modal = getModalById(modalId)
console.log('Modal exists:', modal !== undefined)
```

### Z-Index Issues

The system automatically handles z-index, but if you have custom fixed elements:

```typescript
// Custom fixed elements should use z-index < 50
<div className="fixed z-40">Custom Element</div>

// Or use z-index > 60 to appear above all modals
<div className="fixed z-[70]">Always on top</div>
```

### Modal Not Closing

Ensure you're calling `closeModal` with the correct ID:

```typescript
// Good - correct ID
const modalId = openModal('dialog', { /* ... */ })
closeModal(modalId)

// Good - custom ID
openModal('dialog', { id: 'my-modal' /* ... */ })
closeModal('my-modal')

// Bad - wrong ID
closeModal('wrong-id') // Won't work
```

## Migration from Legacy Modal System

### Old System (useModalGlobalStore)

```typescript
// Old - fixed slots
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

const { dialog1, setDialog1 } = useModalGlobalStore()

setDialog1({
    component: MyComponent,
    props: { /* ... */ },
})
```

### New System (useDynamicModalStore)

```typescript
// New - unlimited modals
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

const { openModal, closeModal } = useDynamicModalStore()

const modalId = openModal('dialog', {
    component: MyComponent,
    props: { /* ... */ },
})

// Close when done
closeModal(modalId)
```

**Migration Benefits:**

- No more "slot" limitations (dialog1, dialog2, etc.)
- Automatic z-index management
- Better TypeScript support
- Cleaner API
