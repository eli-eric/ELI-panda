import { useQueryClient } from '@tanstack/react-query'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'
import type { SystemDisconnectInput } from '@/types/gql/graphql'
import { RELATIONSHIP_GRAPH_QUERY_KEY } from '@/utils/query/queryKeys'
import { matchesSpareAffectedQuery } from '@/utils/query/spareInvalidationPredicate'

import { getDisconnectField, isSpareDisconnect } from '../../types/relationshipDisconnect'
import { useRecalculateSpareParts } from './useRecalculateSpareParts'

const DELETE_RELATIONSHIP = gql(`
    mutation DeleteSystemRelationship($where: SystemWhere, $disconnect: SystemDisconnectInput) {
        updateSystems(where: $where, disconnect: $disconnect) {
            info {
                relationshipsDeleted
            }
        }
    }
`)

interface DeleteRelationshipParams {
    currentSystemUid: string
    relatedSystemUid: string
    relationshipType: string
    direction: 'inbound' | 'outbound'
}

export const useDeleteRelationship = () => {
    const queryClient = useQueryClient()
    const recalculateSpareParts = useRecalculateSpareParts()

    const { mutateAsync, isPending } = useGraphQLMutation(DELETE_RELATIONSHIP)

    const deleteRelationship = async ({
        currentSystemUid,
        relatedSystemUid,
        relationshipType,
        direction,
    }: DeleteRelationshipParams): Promise<number> => {
        const field = getDisconnectField(relationshipType, direction)
        if (!field) {
            throw new Error(`Unsupported relationship type: ${relationshipType}`)
        }
        const result = await mutateAsync({
            where: { uid: currentSystemUid },
            disconnect: {
                [field]: [{ where: { node: { uid: relatedSystemUid } } }],
            } as SystemDisconnectInput,
        })

        const deletedCount = result.updateSystems?.info.relationshipsDeleted ?? 0

        queryClient.invalidateQueries({ queryKey: [RELATIONSHIP_GRAPH_QUERY_KEY] })
        if (isSpareDisconnect(field)) {
            const invalidateSpareViews = () =>
                queryClient.invalidateQueries({
                    predicate: matchesSpareAffectedQuery([currentSystemUid, relatedSystemUid]),
                })
            // Refresh right away so the row disappears, then again once the
            // recalculation lands — dropping one IS_SPARE_FOR edge re-splits the
            // spare's coverage across the systems it still covers, and the first
            // round would otherwise re-read the pre-recalc numbers.
            invalidateSpareViews()
            void recalculateSpareParts().then(recalculated => {
                if (recalculated) invalidateSpareViews()
            })
        }

        return deletedCount
    }

    return { deleteRelationship, isPending }
}
