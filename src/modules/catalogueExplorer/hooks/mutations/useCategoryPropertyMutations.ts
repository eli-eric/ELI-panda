import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import type { AxiosError } from '@/types/http'
import { queryMutate } from '@/utils/fetcher'

import { CATALOGUE_CATEGORY_DETAIL_QUERY_KEY } from '../../types/constants'

export interface CategoryProperty {
    uid: string
    name: string
    type?: { uid: string; name?: string } | null
    unit?: { uid: string; name?: string } | null
    defaultValue?: string | null
    listOfValues?: string[] | null
    order?: number
}

export interface CreatePropertyBody {
    name: string
    type: { uid: string; name?: string }
    unit?: { uid: string; name?: string }
    defaultValue?: string
    listOfValues?: string[]
    order?: number
}

export interface PatchPropertyBody {
    name?: string
    order?: number
    type?: { uid: string; name?: string }
    unit?: { uid: string; name?: string } | null
    defaultValue?: string | null
    listOfValues?: string[] | null
    groupUid?: string
}

const getStatus = (e: unknown): number | undefined =>
    (e as AxiosError | undefined)?.response?.status

export const useCategoryPropertyMutations = (categoryUid: string) => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: [CATALOGUE_CATEGORY_DETAIL_QUERY_KEY] })
        queryClient.invalidateQueries({ queryKey: ['catalogueCategoryEdit'] })
    }

    const { mutateAsync: createAsync, isPending: createPending } = useMutation({
        mutationKey: ['catalogueCategoryPropertyCreate', categoryUid],
        mutationFn: async ({ groupUid, body }: { groupUid: string; body: CreatePropertyBody }) => {
            const fn = queryMutate<CategoryProperty, CreatePropertyBody>(
                'catalogueCategoryGroupProperty',
                'post',
                { uid: categoryUid, endpointVariables: { itemUid: groupUid } },
            )
            const response = await fn(body)
            return response.data
        },
        onSuccess: invalidate,
    })

    const { mutateAsync: updateAsync, isPending: updatePending } = useMutation({
        mutationKey: ['catalogueCategoryPropertyUpdate', categoryUid],
        mutationFn: async ({ pid, body }: { pid: string; body: PatchPropertyBody }) => {
            const fn = queryMutate<CategoryProperty, PatchPropertyBody>(
                'catalogueCategoryPropertyItem',
                'patch',
                { uid: categoryUid, endpointVariables: { itemUid: pid } },
            )
            const response = await fn(body)
            return response.data
        },
        onSuccess: invalidate,
    })

    const { mutateAsync: removeAsync, isPending: removePending } = useMutation({
        mutationKey: ['catalogueCategoryPropertyDelete', categoryUid],
        mutationFn: async (pid: string) => {
            const fn = queryMutate<void, undefined>('catalogueCategoryPropertyItem', 'delete', {
                uid: categoryUid,
                endpointVariables: { itemUid: pid },
            })
            await fn(undefined)
        },
        onSuccess: invalidate,
    })

    const createProperty = useCallback(
        (groupUid: string, body: CreatePropertyBody) => {
            const promise = createAsync({ groupUid, body })
            toast.promise(promise, {
                loading: fm({ id: message.catalogue.toast.creating }),
                success: fm({ id: message.catalogue.toast.created }),
                error: fm({ id: message.common.errors.somethingWentWrong }),
            })
            return promise
        },
        [createAsync, fm],
    )

    const updateProperty = useCallback(
        (pid: string, body: PatchPropertyBody) => {
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

    const deleteProperty = useCallback(
        async (pid: string) => {
            try {
                const promise = removeAsync(pid)
                toast.promise(promise, {
                    loading: fm({ id: message.catalogue.toast.deleting }),
                    success: fm({ id: message.catalogue.toast.deleted }),
                    error: e =>
                        getStatus(e) === 409
                            ? fm({ id: message.catalogue.category.cannotDeletePropertyInUse })
                            : fm({ id: message.common.errors.somethingWentWrong }),
                })
                await promise
            } catch {
                /* toast already shown */
            }
        },
        [removeAsync, fm],
    )

    return {
        createProperty,
        updateProperty,
        deleteProperty,
        isPending: createPending || updatePending || removePending,
    }
}
