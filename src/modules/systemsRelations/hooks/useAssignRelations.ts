import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { RELATIONSHIP_GRAPH_QUERY_KEY } from '@/modules/systemHierarchy/types/constants'
import type { RelationshipType } from '@/modules/systemHierarchy/types/graph'
import type { AxiosError } from '@/types/http'
import { queryMutate } from '@/utils/fetcher'

interface AssignRelationsPayload {
    sourceUids: string[]
    targetUids: string[]
    relationshipType: RelationshipType
}

interface AssignRelationsResponse {
    created: number
    skipped: number
    skippedDetails: { sourceUid: string; targetUid: string; reason: string }[]
}

export const useAssignRelations = () => {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation<
        { data: AssignRelationsResponse },
        AxiosError,
        AssignRelationsPayload
    >({
        mutationFn: queryMutate<AssignRelationsResponse, AssignRelationsPayload>(
            'systemRelationshipsBatch',
            'post',
        ),
        onSuccess: ({ data }) => {
            toast.success(`Relationships created: ${data.created}`)
            if (data.skipped > 0) {
                toast.warning(`Skipped: ${data.skipped}`, { duration: 10000 })
            }
            queryClient.invalidateQueries({ queryKey: ['systemsList'] })
            queryClient.invalidateQueries({ queryKey: [RELATIONSHIP_GRAPH_QUERY_KEY] })
        },
        onError: error => {
            toast.error(error.message)
        },
    })

    return { assignRelations: mutate, loading: isPending }
}
