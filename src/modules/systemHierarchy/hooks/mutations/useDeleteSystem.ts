import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { AxiosError } from '@/types/http'
import { queryMutate } from '@/utils/fetcher'

import {
    HIERARCHY_QUERY_KEY,
    LEAVES_COUNT_QUERY_KEY,
    LEAVES_QUERY_KEY,
    RELATIONSHIP_GRAPH_QUERY_KEY,
} from '../../types/constants'

type DeleteSystemVariables = { uid: string }

export const useDeleteSystem = () => {
    const queryClient = useQueryClient()

    // Refresh the hierarchy/leaves/graph views. Fire-and-forget on purpose —
    // TanStack handles the refetch; we never need to await it here.
    const invalidateHierarchy = () => {
        queryClient.invalidateQueries({ queryKey: [HIERARCHY_QUERY_KEY] })
        queryClient.invalidateQueries({ queryKey: [LEAVES_QUERY_KEY] })
        queryClient.invalidateQueries({ queryKey: [LEAVES_COUNT_QUERY_KEY] })
        queryClient.invalidateQueries({ queryKey: [RELATIONSHIP_GRAPH_QUERY_KEY] })
    }

    return useMutation<unknown, AxiosError, DeleteSystemVariables>({
        mutationFn: ({ uid }) => queryMutate('system', 'delete', { uid })(undefined),
        // Keep onSuccess synchronous so the delete (and its toast) resolves as soon
        // as the system is gone — without waiting on the slower recalc.
        onSuccess: () => {
            // Immediate refresh so the deleted node disappears promptly.
            invalidateHierarchy()
            // Deleting a system can shift spare-parts coverage of related systems.
            // Run unconditionally: a recursive delete may remove subsystems with
            // spare relations we can't cheaply detect client-side, and a stale
            // coverage number is worse than one extra request (matches legacy delete).
            // Recompute in the background, then refresh again so coverage stats
            // catch up. A recalc failure must not mask the successful delete.
            void queryMutate('recalculateSpareParts', 'post')(undefined)
                .then(() => invalidateHierarchy())
                .catch(() => {
                    // ignore — the immediate refresh above already reflects the delete
                })
        },
    })
}
