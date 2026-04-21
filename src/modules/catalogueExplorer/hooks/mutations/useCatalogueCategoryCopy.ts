import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import { queryMutate } from '@/utils/fetcher'

import {
    CATALOGUE_CATEGORIES_QUERY_KEY,
    CATALOGUE_CATEGORY_DETAIL_QUERY_KEY,
} from '../../types/constants'

export const useCatalogueCategoryCopy = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['catalogueCategoryCopy'],
        mutationFn: async (uid: string) => {
            const fn = queryMutate<string, undefined>('catalogueCategoryCopy', 'post', { uid })
            const response = await fn(undefined)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CATALOGUE_CATEGORIES_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [CATALOGUE_CATEGORY_DETAIL_QUERY_KEY] })
        },
    })

    const copyCategory = useCallback(
        (uid: string): Promise<string> => {
            const promise = mutateAsync(uid)
            toast.promise(promise, {
                loading: fm({ id: message.catalogue.toast.creating }),
                success: fm({ id: message.catalogue.toast.created }),
                error: fm({ id: message.common.errors.somethingWentWrong }),
            })
            return promise
        },
        [mutateAsync, fm],
    )

    return { copyCategory, isPending }
}
