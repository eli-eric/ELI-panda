import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { AxiosError } from '@/types/http'
import { queryMutate } from '@/utils/fetcher'
import {
    RELATIONSHIP_GRAPH_QUERY_KEY,
    SYSTEM_DETAIL_QUERY_KEY,
    SYSTEM_HISTORY_QUERY_KEY,
} from '@/utils/query/queryKeys'
import { matchesSpareAffectedQuery } from '@/utils/query/spareInvalidationPredicate'

import type { RemovableRelationshipType } from '../../types'
import { isNotFoundError } from '../../utils/systemErrors'

export interface DeleteRelationshipParams {
    currentSystemUid: string
    relatedSystemUid: string
    relationshipType: RemovableRelationshipType
    // seen from the current system: outbound = current is the START node
    direction: 'inbound' | 'outbound'
}

export const toRelationshipEnds = ({
    currentSystemUid,
    relatedSystemUid,
    direction,
}: DeleteRelationshipParams) =>
    direction === 'outbound'
        ? { fromUid: currentSystemUid, toUid: relatedSystemUid }
        : { fromUid: relatedSystemUid, toUid: currentSystemUid }

/**
 * DELETE /system/:from/relationships/:type/:to. The server audits both systems and,
 * for IS_SPARE_FOR, recalculates the affected coverage in the same transaction —
 * so one invalidation round after success is enough (no client-side recalc call).
 */
export const useDeleteSystemRelationship = () => {
    const queryClient = useQueryClient()

    const refreshRelationshipViews = ({
        currentSystemUid,
        relatedSystemUid,
        relationshipType,
    }: DeleteRelationshipParams) => {
        const uids = [currentSystemUid, relatedSystemUid]
        void queryClient.invalidateQueries({ queryKey: [RELATIONSHIP_GRAPH_QUERY_KEY] })
        for (const uid of uids) {
            void queryClient.invalidateQueries({ queryKey: [SYSTEM_DETAIL_QUERY_KEY, { uid }] })
            void queryClient.invalidateQueries({ queryKey: [SYSTEM_HISTORY_QUERY_KEY, { uid }] })
        }
        if (relationshipType === 'IS_SPARE_FOR') {
            void queryClient.invalidateQueries({ predicate: matchesSpareAffectedQuery(uids) })
        }
    }

    const mutation = useMutation<unknown, AxiosError, DeleteRelationshipParams>({
        mutationFn: params => {
            const { fromUid, toUid } = toRelationshipEnds(params)
            return queryMutate<void, void>('systemRelationshipRemove', 'delete', {
                uid: fromUid,
                endpointVariables: { path: params.relationshipType, itemUid: toUid },
            })(undefined)
        },
        onSuccess: (_, params) => refreshRelationshipViews(params),
        // already gone (removed elsewhere) — the views just need to catch up
        onError: (error, params) => {
            if (isNotFoundError(error)) refreshRelationshipViews(params)
        },
    })

    return { deleteRelationship: mutation.mutateAsync, isPending: mutation.isPending }
}
