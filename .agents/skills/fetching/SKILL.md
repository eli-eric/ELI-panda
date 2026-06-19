---
name: data-fetching
description: Data fetching patterns with TanStack Query, queryFetcher, and queryMutate utilities. Use when creating query hooks, mutation hooks, or working with the fetcher utilities.
user-invocable: false
---

# Data Fetching Patterns

Use TanStack Query with `queryFetcher` and `queryMutate` utilities from `@/utils/fetcher`.

## Core Utilities

**`queryFetcher<T>(endpointType)`** - Factory for query functions:

- `endpointType` - key from `getEndpoints()` (e.g., `'publication'`, `'codebook'`)
- Parameters are automatically extracted from `queryKey[1]` and passed to `getEndpoints()`
- Returns `QueryFunction` compatible with TanStack Query

**`queryMutate<TResponse, TVariables>(endpointType, method, options?)`** - Factory for mutations:

- `endpointType` - key from `getEndpoints()`
- `method` - `'post'` | `'put'` | `'delete'` | `'get'`
- `options` - `{ uid?, isDefaultUrl?, endpointVariables?, responseType?, query? }`
- Returns `MutateFunction` compatible with TanStack Query

## Query Hook Pattern

```typescript
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

export const usePublication = (uid?: string) => {
    return useQuery<Publication, AxiosError, Publication, QueryFetcherKey>({
        queryKey: ['publication', { uid }],
        queryFn: queryFetcher<Publication>('publication'),
        enabled: !!uid,
    })
}
```

**Key rules:**

- Always specify all 4 generic types: `<TData, AxiosError, TData, QueryFetcherKey>`
- Query key: `['endpointType', { params }]` - params are automatically passed to `getEndpoints()`
- Use `enabled` for conditional fetching

## Mutation Hook Pattern

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useIntl } from 'react-intl'

import { queryMutate } from '@/utils/fetcher'
import { message } from '@/i18n/src/messages'

export const useCreatePublication = () => {
    const queryClient = useQueryClient()
    const { formatMessage: fm } = useIntl()

    const createMutation = useMutation({
        mutationFn: queryMutate<PublicationResponse, PublicationRequest>('publication', 'post'),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['publications'] }),
    })

    const create = async (data: PublicationRequest) => {
        const promise = createMutation.mutateAsync(data)
        toast.promise(promise, {
            loading: fm({ id: message.toast.creating }),
            success: fm({ id: message.toast.created }),
            error: fm({ id: message.toast.failedToCreate }),
        })
        return promise
    }

    return { create, isLoading: createMutation.isPending }
}
```

## Dynamic Path Mutations

For mutations with dynamic paths (e.g., update by ID):

```typescript
const updateMutation = useMutation({
    mutationFn: ({ uid, ...data }: { uid: string } & UpdateRequest) => {
        const mutateFn = queryMutate<ResponseType, UpdateRequest>('endpoint', 'put', {
            isDefaultUrl: false,
            endpointVariables: { path: `resource/${uid}` },
        })
        return mutateFn(data)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['resources'] }),
})

const update = async (uid: string, data: UpdateRequest) => {
    const promise = updateMutation.mutateAsync({ uid, ...data })
    toast.promise(promise, {
        loading: 'Updating...',
        success: 'Updated',
        error: 'Failed to update',
    })
    return promise
}
```

## Delete Mutations

```typescript
const deleteMutation = useMutation({
    mutationFn: (uid: string) => {
        const mutateFn = queryMutate<void, void>('endpoint', 'delete', {
            isDefaultUrl: false,
            endpointVariables: { path: `resource/${uid}` },
        })
        return mutateFn()
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['resources'] }),
})

const remove = async (uid: string) => {
    const promise = deleteMutation.mutateAsync(uid)
    toast.promise(promise, {
        loading: 'Removing...',
        success: 'Removed',
        error: 'Failed to remove',
    })
    return promise
}
```

## Key Rules

1. **Always invalidate related queries on success** - Ensures UI stays in sync
2. **Wrap with `toast.promise` for user feedback** - Shows loading/success/error states
3. **Use `mutateAsync` (not `mutate`) when wrapping with toast** - Returns promise for toast.promise
4. **Use `enabled` for conditional queries** - Prevents unnecessary fetches
5. **Specify all generic types** - Ensures type safety
