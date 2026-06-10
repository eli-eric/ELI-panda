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

    return useMutation<unknown, AxiosError, DeleteSystemVariables>({
        mutationFn: ({ uid }) => queryMutate('system', 'delete', { uid })(undefined),
        onSuccess: async () => {
            // Deleting a system can shift spare-parts coverage of related systems.
            // Mirror the legacy delete by recomputing before refetching; a recalc
            // failure must not mask the successful delete.
            try {
                await queryMutate('recalculateSpareParts', 'post')(null)
            } catch {
                // ignore — invalidation below still refreshes from source of truth
            }
            queryClient.invalidateQueries({ queryKey: [HIERARCHY_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [LEAVES_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [LEAVES_COUNT_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [RELATIONSHIP_GRAPH_QUERY_KEY] })
        },
    })
}
