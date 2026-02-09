---
name: toast-patterns
description: Toast notification patterns for mutations using toast.promise from sonner. Use when implementing mutation feedback, loading/success/error states, or async operation notifications.
user-invocable: false
---

# Toast Patterns for Mutations

Always use `toast.promise` for mutations to provide consistent user feedback with loading, success, and error states.

## Basic Usage

```typescript
import { toast } from 'sonner'

toast.promise(createItem(data), {
    loading: 'Creating item...',
    success: 'Item created',
    error: 'Failed to create item',
})
```

## With Callback on Success

Use a function for success when you need to perform actions (e.g., closing modal, navigation):

```typescript
toast.promise(updateItem(data), {
    loading: 'Updating item...',
    success: () => {
        closeModal()
        return 'Item updated'
    },
    error: 'Failed to update item',
})
```

## With Finally Callback

Use finally for cleanup actions that should run regardless of outcome:

```typescript
toast.promise(deleteItem(uid), {
    loading: 'Removing item...',
    success: 'Item removed',
    error: 'Failed to remove item',
    finally: () => setIsDeleting(false),
})
```

## With Internationalization

```typescript
import { useIntl } from 'react-intl'
import { message } from '@/i18n/src/messages'

const { formatMessage: fm } = useIntl()

toast.promise(createOrder(data), {
    loading: fm({ id: message.orders.toast.creating }),
    success: fm({ id: message.orders.toast.created }),
    error: fm({ id: message.orders.toast.failedToCreate }),
})
```

## Validation Errors (Before Mutation)

For validation errors that occur before the mutation, use `toast.error()` directly:

```typescript
if (isDuplicate) {
    toast.error('This item already exists')
    return
}

toast.promise(addItem(data), {
    loading: 'Adding item...',
    success: 'Item added',
    error: 'Failed to add item',
})
```

## Complete Hook Example

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useIntl } from 'react-intl'

import { queryMutate } from '@/utils/fetcher'
import { message } from '@/i18n/src/messages'

export const useCreateSystem = () => {
    const queryClient = useQueryClient()
    const { formatMessage: fm } = useIntl()

    const createMutation = useMutation({
        mutationFn: queryMutate<SystemResponse, SystemRequest>('system', 'post'),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['systems'] }),
    })

    const create = async (data: SystemRequest) => {
        const promise = createMutation.mutateAsync(data)
        toast.promise(promise, {
            loading: fm({ id: message.systems.toast.creating }),
            success: () => {
                // Optional: perform additional actions on success
                return fm({ id: message.systems.toast.created })
            },
            error: fm({ id: message.systems.toast.failedToCreate }),
        })
        return promise
    }

    return {
        create,
        isLoading: createMutation.isPending,
    }
}
```

## Key Rules

1. **Always use `toast.promise` for mutations** - Provides consistent UX
2. **Use `mutateAsync` (not `mutate`)** - Returns promise for toast.promise
3. **Use `toast.error()` for pre-mutation validation** - Synchronous errors before async operation
4. **Use success callback for side effects** - When you need to close modals, navigate, etc.
5. **Use finally for cleanup** - Reset loading states, clear forms, etc.
