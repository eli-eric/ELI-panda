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

export interface CatalogueCategoryPatchBody {
    name?: string
    code?: string
    systemType?: { uid: string; name?: string } | null
}

interface CategoryResponse {
    uid: string
    name: string
    code: string
    systemType?: { uid: string; name: string } | null
}

export const useCatalogueCategoryPatch = (categoryUid: string) => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['catalogueCategoryPatch', { uid: categoryUid }],
        mutationFn: queryMutate<CategoryResponse, CatalogueCategoryPatchBody>(
            'catalogueCategoryEdit',
            'patch',
            { uid: categoryUid },
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CATALOGUE_CATEGORIES_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [CATALOGUE_CATEGORY_DETAIL_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: ['catalogueCategoryEdit'] })
            queryClient.invalidateQueries({ queryKey: ['catalogueCategoryHistory'] })
        },
    })

    const patchCategory = useCallback(
        (body: CatalogueCategoryPatchBody) => {
            const promise = mutateAsync(body)
            toast.promise(promise, {
                loading: fm({ id: message.catalogue.toast.saving }),
                success: fm({ id: message.catalogue.toast.saved }),
                error: fm({ id: message.common.errors.somethingWentWrong }),
            })
            return promise
        },
        [mutateAsync, fm],
    )

    return { patchCategory, isPending }
}
