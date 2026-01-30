# Modal System Guide

The application uses a dynamic modal system with `useDynamicModalStore` that supports unlimited modals with automatic z-index management.

## Key Features

- **Unlimited Modals**: Open as many sheets and dialogs as needed simultaneously
- **Automatic Z-Index Management**: Each modal automatically gets the correct z-index based on open order (FIFO)
- **Custom IDs**: Use custom IDs for easy modal management or let the system auto-generate them
- **Type-Aware Rendering**: Sheet vs Dialog components rendered correctly based on type
- **No Z-Index Conflicts**: Modals layer correctly - later modals appear on top

## Core Components

- **`useDynamicModalStore`**: Zustand store with Map-based architecture (`/src/store/useDynamicModalStore.ts`)
- **`DynamicModalProvider`**: Dynamic modal renderer
- **`sheet.tsx` and `dialog.tsx`**: shadcn/ui components with z-index support (`/src/components/ui/`)

## Basic Usage

### Opening a Modal

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

## Custom Modal IDs (Recommended)

For reusable or identifiable modals, use custom IDs:

```typescript
const { openModal, closeModal } = useDynamicModalStore()

// Open with custom ID
openModal('dialog', {
    id: 'user-edit-modal',
    component: UserEditForm,
    props: { title: 'Edit User', userId: 123 },
})

// Close by custom ID
closeModal('user-edit-modal')
```

**Benefits of custom IDs:**

- Easy to reference modals from anywhere in the app
- Prevent duplicate modals (opening same ID twice won't create a duplicate)
- Cleaner debugging and state management
- Better for testing

## Sheet vs Dialog Usage

Choose the appropriate modal type based on your use case:

### Dialog

**Use for:**

- Confirmations and alerts
- Simple forms requiring user attention
- Primary actions that block workflow
- Centered modal content

```typescript
// Dialog for confirmation
openModal('dialog', {
    id: 'delete-confirmation',
    component: DeleteConfirmation,
    props: {
        title: 'Confirm Deletion',
        description: 'This action cannot be undone',
        size: 'sm',
    },
})
```

### Sheet

**Use for:**

- Filters and advanced search
- Multi-step forms
- Detailed views and information panels
- Secondary workflows that don't interrupt main flow

```typescript
// Sheet for filters
openModal('sheet', {
    id: 'system-filters',
    component: SystemFilters,
    props: {
        title: 'Filter Systems',
        side: 'left', // or 'right', 'top', 'bottom'
    },
})
```

### Size Options

**Dialog sizes:**

- `sm` - Small (max-w-sm) - Confirmations, simple alerts
- `md` - Medium (max-w-md) - Default, simple forms
- `lg` - Large (max-w-lg) - Complex forms
- `xl` - Extra Large (max-w-xl) - Detailed content
- `full` - Full Screen (max-w-full) - Tables, extensive data

**Sheet sizes:**

- Sheets use the `side` prop instead of `size`
- Width/height is determined by content and screen size

## Nested Modals

The system automatically handles nested modals with proper z-index layering:

```typescript
// Open spare assignment wizard
const wizardId = openModal('dialog', {
    id: 'spare-wizard',
    component: SpareWizardComponent,
    props: { title: 'Assign Spare Part', size: 'xl' },
})
// Z-index: 50 (overlay), 51 (content)

// Inside wizard, open filter sheet
const filterId = openModal('sheet', {
    id: 'system-filters',
    component: FilterComponent,
    props: { title: 'Filter Systems', side: 'left' },
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

## Advanced Usage

### Additional Store Functions

```typescript
const { openModal, closeModal, bringToFront, closeAllModals, getModalById } = useDynamicModalStore()

// Bring existing modal to front
bringToFront('my-modal-id')

// Close all modals at once
closeAllModals()

// Get modal instance by ID
const modal = getModalById('my-modal-id')
if (modal) {
    console.log('Modal exists:', modal.type, modal.props)
}
```

### Parent Trigger Functions

Pass functions to modal children for advanced interactions:

```typescript
const MyComponent = () => {
  const { openModal, closeModal } = useDynamicModalStore()

  const handleRefresh = () => {
    console.log('Refreshing data...')
    // Refresh logic
  }

  const handleOpenModal = () => {
    const modalId = openModal('dialog', {
      component: MyModalContent,
      props: {
        title: 'Edit User',
        parentTriggerFn: handleRefresh
      },
      onSubmit: (data) => {
        // Submit logic
        closeModal(modalId)
        handleRefresh() // Refresh after submit
      }
    })
  }

  return <Button onClick={handleOpenModal}>Edit</Button>
}

// In modal component
const MyModalContent: React.FC<{ parentTriggerFn?: () => void }> = ({
  parentTriggerFn
}) => {
  const handleAction = () => {
    // Do something
    parentTriggerFn?.() // Trigger parent function
  }

  return <Button onClick={handleAction}>Trigger Parent</Button>
}
```

### Modal State Management

```typescript
// Check if specific modal is open
const modal = getModalById('my-modal-id')
const isOpen = modal !== undefined

// Get all open modals
const store = useDynamicModalStore.getState()
const openModals = Array.from(store.modals.values())
console.log(`${openModals.length} modals open`)
```

## Best Practices

### 1. Always Provide Title

```typescript
// ✅ Good - accessible and clear
openModal('dialog', {
    component: MyContent,
    props: {
        title: 'Edit User Profile',
        description: 'Update your personal information',
    },
})

// ❌ Bad - no title
openModal('dialog', {
    component: MyContent,
    props: {},
})
```

### 2. Handle Both onSubmit and onClose

```typescript
// ✅ Good - handles all user actions
const modalId = openModal('dialog', {
    component: EditForm,
    props: {
        /* ... */
    },
    onSubmit: data => {
        saveData(data)
        closeModal(modalId)
    },
    onClose: () => {
        // Cleanup if needed
        console.log('Modal closed without submit')
    },
})

// ❌ Bad - only handles submit
const modalId = openModal('dialog', {
    component: EditForm,
    props: {
        /* ... */
    },
    onSubmit: data => {
        saveData(data)
        closeModal(modalId)
    },
    // Missing onClose handler
})
```

### 3. Use Appropriate Size

```typescript
// ✅ Good - size matches content
openModal('dialog', {
    component: SimpleConfirmation,
    props: { title: 'Delete?', size: 'sm' },
})

openModal('dialog', {
    component: ComplexForm,
    props: { title: 'Create Order', size: 'xl' },
})

// ❌ Bad - size doesn't match content
openModal('dialog', {
    component: SimpleConfirmation,
    props: { title: 'Delete?', size: 'full' }, // Too large!
})
```

### 4. Use Custom IDs for Important Modals

```typescript
// ✅ Good - easy to reference
openModal('sheet', {
    id: 'global-search',
    component: GlobalSearch,
    props: {
        /* ... */
    },
})

// Later, from anywhere:
closeModal('global-search')

// ❌ Bad - hard to track
const modalId = openModal('sheet', {
    component: GlobalSearch,
    props: {
        /* ... */
    },
})
// Lost reference to modalId
```

### 5. Clean Up in onClose

```typescript
// ✅ Good - cleans up resources
openModal('dialog', {
    component: VideoPlayer,
    props: {
        /* ... */
    },
    onClose: () => {
        stopVideo()
        clearCache()
        unsubscribeFromUpdates()
    },
})

// ❌ Bad - no cleanup
openModal('dialog', {
    component: VideoPlayer,
    props: {
        /* ... */
    },
    // Missing cleanup - video keeps playing!
})
```

## Real-World Examples

### Example 1: Confirmation Dialog

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

### Example 2: Filter Sheet

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

### Example 3: Multi-Step Wizard

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

### Example 4: Nested Modal with Filters

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
const modalId = openModal('dialog', {
    /* ... */
})
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
// ✅ Good - correct ID
const modalId = openModal('dialog', {
    /* ... */
})
closeModal(modalId)

// ✅ Good - custom ID
openModal('dialog', { id: 'my-modal' /* ... */ })
closeModal('my-modal')

// ❌ Bad - wrong ID
closeModal('wrong-id') // Won't work
```

## Migration from Legacy Modal System

### Old System (useModalGlobalStore)

```typescript
// ❌ Old - fixed slots
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

const { dialog1, setDialog1 } = useModalGlobalStore()

setDialog1({
    component: MyComponent,
    props: {
        /* ... */
    },
})
```

### New System (useDynamicModalStore)

```typescript
// ✅ New - unlimited modals
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

const { openModal, closeModal } = useDynamicModalStore()

const modalId = openModal('dialog', {
    component: MyComponent,
    props: {
        /* ... */
    },
})

// Close when done
closeModal(modalId)
```

**Migration Benefits:**

- No more "slot" limitations (dialog1, dialog2, etc.)
- Automatic z-index management
- Better TypeScript support
- Cleaner API

## TypeScript Types

```typescript
type ModalType = 'dialog' | 'sheet'

interface ModalOptions<P = any> {
    id?: string
    component: React.ComponentType<P>
    props: P
    onSubmit?: (...args: any[]) => void
    onClose?: () => void
}

interface ModalInstance<P = any> {
    id: string
    type: ModalType
    component: React.ComponentType<P>
    props: P
    onSubmit?: (...args: any[]) => void
    onClose?: () => void
    zIndex: number
}

interface DynamicModalStore {
    modals: Map<string, ModalInstance>
    openModal: <P>(type: ModalType, options: ModalOptions<P>) => string
    closeModal: (id: string) => void
    closeAllModals: () => void
    bringToFront: (id: string) => void
    getModalById: (id: string) => ModalInstance | undefined
}
```
