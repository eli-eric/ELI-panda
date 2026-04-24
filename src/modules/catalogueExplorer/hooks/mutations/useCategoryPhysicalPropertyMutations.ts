import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import { queryMutate } from '@/utils/fetcher'

import { CATALOGUE_CATEGORY_DETAIL_QUERY_KEY } from '../../types/constants'
import type { CategoryProperty, CreatePropertyBody, PatchPropertyBody } from './useCategoryPropertyMutations'

export type CreatePhysicalPropertyBody = CreatePropertyBody
export type PatchPhysicalPropertyBody = Omit<PatchPropertyBody, 'groupUid'>

export const useCategoryPhysicalPropertyMutations = (categoryUid: string) => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: [CATALOGUE_CATEGORY_DETAIL_QUERY_KEY] })
        queryClient.invalidateQueries({ queryKey: ['catalogueCategoryEdit'] })
    }

    const { mutateAsync: createAsync, isPending: createPending } = useMutation({
        mutationKey: ['catalogueCategoryPhysicalPropertyCreate', categoryUid],
        mutationFn: async (body: CreatePhysicalPropertyBody) => {
            const fn = queryMutate<CategoryProperty, CreatePhysicalPropertyBody>(
                'catalogueCategoryPhysicalProperty',
                'post',
                { uid: categoryUid },
            )
            const response = await fn(body)
            return response.data
        },
        onSuccess: invalidate,
    })

    const { mutateAsync: updateAsync, isPending: updatePending } = useMutation({
        mutationKey: ['catalogueCategoryPhysicalPropertyUpdate', categoryUid],
        mutationFn: async ({ pid, body }: { pid: string; body: PatchPhysicalPropertyBody }) => {
            const fn = queryMutate<CategoryProperty, PatchPhysicalPropertyBody>(
                'catalogueCategoryPhysicalPropertyItem',
                'patch',
                { uid: categoryUid, endpointVariables: { itemUid: pid } },
            )
            const response = await fn(body)
            return response.data
        },
        onSuccess: invalidate,
    })

    const { mutateAsync: removeAsync, isPending: removePending } = useMutation({
        mutationKey: ['catalogueCategoryPhysicalPropertyDelete', categoryUid],
        mutationFn: async (pid: string) => {
            const fn = queryMutate<void, undefined>(
                'catalogueCategoryPhysicalPropertyItem',
                'delete',
                { uid: categoryUid, endpointVariables: { itemUid: pid } },
            )
            await fn(undefined)
        },
        onSuccess: invalidate,
    })

    const createPhysicalProperty = useCallback(
        (body: CreatePhysicalPropertyBody) => {
            const promise = createAsync(body)
            toast.promise(promise, {
                loading: fm({ id: message.catalogue.toast.creating }),
                success: fm({ id: message.catalogue.toast.created }),
                error: fm({ id: message.common.errors.somethingWentWrong }),
            })
            return promise
        },
        [createAsync, fm],
    )

    const updatePhysicalProperty = useCallback(
        (pid: string, body: PatchPhysicalPropertyBody) => {
            const promise = updateAsync({ pid, body })
            toast.promise(promise, {
                loading: fm({ id: message.catalogue.toast.saving }),
                success: fm({ id: message.catalogue.toast.saved }),
                error: fm({ id: message.common.errors.somethingWentWrong }),
            })
            return promise
        },
        [updateAsync, fm],
    )

    const deletePhysicalProperty = useCallback(
        (pid: string) => {
            const promise = removeAsync(pid)
            toast.promise(promise, {
                loading: fm({ id: message.catalogue.toast.deleting }),
                success: fm({ id: message.catalogue.toast.deleted }),
                error: fm({ id: message.common.errors.somethingWentWrong }),
            })
            return promise
        },
        [removeAsync, fm],
    )

    return {
        createPhysicalProperty,
        updatePhysicalProperty,
        deletePhysicalProperty,
        isPending: createPending || updatePending || removePending,
    }
}
