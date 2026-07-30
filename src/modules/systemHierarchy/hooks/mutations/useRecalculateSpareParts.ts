import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { SYSTEMS_TABLE_ID } from '@/modules/systems/types/constants'
import { queryMutate } from '@/utils/fetcher'

import { LEAVES_QUERY_KEY, SYSTEM_DETAIL_QUERY_KEY } from '../../types/constants'

/**
 * `sparePartsCoverageSum` and `sp_coverage` are stored System properties, not
 * values the API derives on read — only POST /systems/recalculate-spare-parts
 * writes them (it also rebalances every IS_SPARE_FOR.coverage to 1/spare count).
 * The Go API runs it itself for the flows it owns (spare assignment, batch
 * relationship create), but mutations that reach Neo4j straight through GraphQL
 * — a minimal-spares edit, a spare relationship disconnect — leave the numbers
 * stale, showing "Available 0.00" next to spares that clearly exist.
 *
 * Resolves true once the affected views were invalidated, false if the recalc
 * itself failed — callers keep whatever refresh they already did instead of
 * chasing numbers the API never rewrote. Never rejects: the mutation that
 * triggered this has already succeeded and reported itself.
 */
export const useRecalculateSpareParts = () => {
    const queryClient = useQueryClient()

    return useCallback(
        (): Promise<boolean> =>
            queryMutate('recalculateSpareParts', 'post')(undefined)
                .then(() => {
                    queryClient.invalidateQueries({ queryKey: [SYSTEM_DETAIL_QUERY_KEY] })
                    queryClient.invalidateQueries({ queryKey: [LEAVES_QUERY_KEY] })
                    queryClient.invalidateQueries({ queryKey: [SYSTEMS_TABLE_ID] })
                    return true
                })
                .catch(() => false),
        [queryClient],
    )
}
