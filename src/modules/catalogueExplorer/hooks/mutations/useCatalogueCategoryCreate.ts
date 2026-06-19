import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import { queryMutate } from '@/utils/fetcher'

import { CATALOGUE_CATEGORIES_QUERY_KEY } from '../../types/constants'

export interface QuickCreateCategoryInput {
    name: string
    code: string
    parentUid?: string | null
}

interface CreateCategoryBody {
    name: string
    code: string
    parentUID?: string
}

interface CreatedCategoryResponse {
    uid: string
    name: string
    code: string
}

export const useCatalogueCategoryCreate = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['catalogueCategoryCreate'],
        mutationFn: async (body: CreateCategoryBody) => {
            const fn = queryMutate<CreatedCategoryResponse, CreateCategoryBody>(
                'catalogueCategoryEdit',
                'post',
            )
            const response = await fn(body)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CATALOGUE_CATEGORIES_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: ['catalogueCategoryEdit'] })
        },
    })

    const createCategory = useCallback(
        async ({ name, code, parentUid }: QuickCreateCategoryInput) => {
            const body: CreateCategoryBody = { name, code }
            if (parentUid) body.parentUID = parentUid

            const promise = mutateAsync(body)
            toast.promise(promise, {
                loading: fm({ id: message.catalogue.toast.creating }),
                success: fm({ id: message.catalogue.toast.created }),
                error: fm({ id: message.common.errors.somethingWentWrong }),
            })
            return promise
        },
        [fm, mutateAsync],
    )

    return { createCategory, isPending }
}
