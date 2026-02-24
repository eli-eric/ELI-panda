import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import { queryMutate } from '@/utils/fetcher'

import { RELATIONSHIP_GRAPH_QUERY_KEY } from '../../types/constants'
import type { CreateRelationshipPayload } from '../../types/graph'

export const useCreateRelationship = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: queryMutate<unknown, CreateRelationshipPayload>(
            'systemRelationship',
            'post',
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [RELATIONSHIP_GRAPH_QUERY_KEY] })
        },
    })

    const createRelationship = useCallback(
        (payload: CreateRelationshipPayload) => {
            toast.promise(mutateAsync(payload), {
                loading: fm({ id: message.systemHierarchy.graph.toast.creating }),
                success: fm({ id: message.systemHierarchy.graph.toast.created }),
                error: fm({ id: message.systemHierarchy.graph.toast.createFailed }),
            })
        },
        [fm, mutateAsync],
    )

    return { createRelationship, isCreating: isPending }
}
