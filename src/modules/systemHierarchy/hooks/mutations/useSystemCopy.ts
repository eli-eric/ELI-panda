import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import { queryMutate } from '@/utils/fetcher'

import type { CopySystemBody } from '../../types'
import {
    HIERARCHY_QUERY_KEY,
    LEAVES_COUNT_QUERY_KEY,
    LEAVES_QUERY_KEY,
    RELATIONSHIP_GRAPH_QUERY_KEY,
} from '../../types/constants'

export const useSystemCopy = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: queryMutate<string[], CopySystemBody>('systemsCopy', 'put'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [HIERARCHY_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [LEAVES_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [LEAVES_COUNT_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [RELATIONSHIP_GRAPH_QUERY_KEY] })
            toast.success(fm({ id: message.systemHierarchy.copy.copied }))
        },
        onError: () => {
            toast.error(fm({ id: message.systemHierarchy.copy.failedToCopy }))
        },
    })
}
