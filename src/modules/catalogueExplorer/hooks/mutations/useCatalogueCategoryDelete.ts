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

export const useCatalogueCategoryDelete = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['catalogueCategoryDelete'],
        mutationFn: async (uid: string) => {
            const fn = queryMutate<void, undefined>('catalogueCategoryEdit', 'delete', { uid })
            return fn(undefined)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CATALOGUE_CATEGORIES_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [CATALOGUE_CATEGORY_DETAIL_QUERY_KEY] })
        },
    })

    const deleteCategory = useCallback(
        (uid: string) => {
            const promise = mutateAsync(uid)
            toast.promise(promise, {
                loading: fm({ id: message.catalogue.toast.deleting }),
                success: fm({ id: message.catalogue.category.deleted }),
                error: fm({ id: message.common.errors.somethingWentWrong }),
            })
            return promise
        },
        [mutateAsync, fm],
    )

    return { deleteCategory, isPending }
}
