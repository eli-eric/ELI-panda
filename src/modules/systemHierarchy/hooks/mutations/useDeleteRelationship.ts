import { useQueryClient } from '@tanstack/react-query'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'
import type { SystemDisconnectInput } from '@/types/gql/graphql'

import { RELATIONSHIP_GRAPH_QUERY_KEY } from '../../types/constants'

const DELETE_RELATIONSHIP = gql(`
    mutation DeleteSystemRelationship($where: SystemWhere, $disconnect: SystemDisconnectInput) {
        updateSystems(where: $where, disconnect: $disconnect) {
            info {
                relationshipsDeleted
            }
        }
    }
`)

type DisconnectField = keyof SystemDisconnectInput

const DISCONNECT_FIELD_MAP: Record<
    string,
    { inbound: DisconnectField; outbound: DisconnectField } | undefined
> = {
    IS_SPARE_FOR: { inbound: 'spareParts', outbound: 'sparePartsFor' },
    IS_COOLED_FROM: { inbound: 'cools', outbound: 'cooledFrom' },
    IS_POWERED_FROM: { inbound: 'powers', outbound: 'poweredFrom' },
    IS_CONTROLLED_BY: { inbound: 'controls', outbound: 'controlledBy' },
    IS_INTERLOCKED_BY: { inbound: 'interlocks', outbound: 'interlockedBy' },
    PROVIDES_DATA_TO: { inbound: 'receivesDataFrom', outbound: 'providesDataTo' },
    DIRECTS_BEAM_TO: { inbound: 'receivesBeamFrom', outbound: 'directsBeamTo' },
    PROVIDES_VACUUM_FOR: { inbound: 'receivesVacuumFrom', outbound: 'providesVacuumFor' },
}

export const getDisconnectField = (
    relationshipType: string,
    direction: 'inbound' | 'outbound',
): DisconnectField | undefined => DISCONNECT_FIELD_MAP[relationshipType]?.[direction]

interface DeleteRelationshipParams {
    currentSystemUid: string
    relatedSystemUid: string
    relationshipType: string
    direction: 'inbound' | 'outbound'
}

export const useDeleteRelationship = () => {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useGraphQLMutation(DELETE_RELATIONSHIP, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [RELATIONSHIP_GRAPH_QUERY_KEY] })
        },
    })

    const deleteRelationship = ({
        currentSystemUid,
        relatedSystemUid,
        relationshipType,
        direction,
    }: DeleteRelationshipParams) => {
        const field = getDisconnectField(relationshipType, direction)
        if (!field) {
            return Promise.reject(new Error(`Unsupported relationship type: ${relationshipType}`))
        }
        return mutateAsync({
            where: { uid: currentSystemUid },
            disconnect: {
                [field]: [{ where: { node: { uid: relatedSystemUid } } }],
            } as SystemDisconnectInput,
        })
    }

    return { deleteRelationship, isPending }
}
