import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import { queryMutate } from '@/utils/fetcher'

import { RELATIONSHIP_GRAPH_QUERY_KEY } from '../../types/constants'

export const useDeleteRelationship = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (uid: string) =>
            queryMutate<unknown, undefined>('systemRelationship', 'delete', uid)(undefined),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [RELATIONSHIP_GRAPH_QUERY_KEY] })
        },
    })

    const deleteRelationship = useCallback(
        (uid: string) => {
            toast.promise(mutateAsync(uid), {
                loading: fm({ id: message.systemHierarchy.graph.toast.deleting }),
                success: fm({ id: message.systemHierarchy.graph.toast.deleted }),
                error: fm({ id: message.systemHierarchy.graph.toast.deleteFailed }),
            })
        },
        [fm, mutateAsync],
    )

    return { deleteRelationship, isDeleting: isPending }
}
