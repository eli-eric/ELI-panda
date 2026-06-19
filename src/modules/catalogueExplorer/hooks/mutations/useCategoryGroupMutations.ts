import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import type { AxiosError } from '@/types/http'
import { queryMutate } from '@/utils/fetcher'

import { CATALOGUE_CATEGORY_DETAIL_QUERY_KEY } from '../../types/constants'

export interface CategoryGroup {
    uid: string
    name: string
    order?: number
}

export interface CreateGroupBody {
    name: string
    order?: number
}

export interface PatchGroupBody {
    name?: string
    order?: number
}

const getStatus = (e: unknown): number | undefined =>
    (e as AxiosError | undefined)?.response?.status

export const useCategoryGroupMutations = (categoryUid: string) => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: [CATALOGUE_CATEGORY_DETAIL_QUERY_KEY] })
        queryClient.invalidateQueries({ queryKey: ['catalogueCategoryEdit'] })
    }

    const { mutateAsync: createAsync, isPending: createPending } = useMutation({
        mutationKey: ['catalogueCategoryGroupCreate', categoryUid],
        mutationFn: async (body: CreateGroupBody) => {
            const fn = queryMutate<CategoryGroup, CreateGroupBody>(
                'catalogueCategoryGroup',
                'post',
                { uid: categoryUid },
            )
            const response = await fn(body)
            return response.data
        },
        onSuccess: invalidate,
    })

    const { mutateAsync: updateAsync, isPending: updatePending } = useMutation({
        mutationKey: ['catalogueCategoryGroupUpdate', categoryUid],
        mutationFn: async ({ gid, body }: { gid: string; body: PatchGroupBody }) => {
            const fn = queryMutate<CategoryGroup, PatchGroupBody>(
                'catalogueCategoryGroupItem',
                'patch',
                { uid: categoryUid, endpointVariables: { itemUid: gid } },
            )
            const response = await fn(body)
            return response.data
        },
        onSuccess: invalidate,
    })

    const { mutateAsync: removeAsync, isPending: removePending } = useMutation({
        mutationKey: ['catalogueCategoryGroupDelete', categoryUid],
        mutationFn: async (gid: string) => {
            const fn = queryMutate<void, undefined>('catalogueCategoryGroupItem', 'delete', {
                uid: categoryUid,
                endpointVariables: { itemUid: gid },
            })
            await fn(undefined)
        },
        onSuccess: invalidate,
    })

    const createGroup = useCallback(
        (body: CreateGroupBody) => {
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

    const updateGroup = useCallback(
        (gid: string, body: PatchGroupBody) => {
            const promise = updateAsync({ gid, body })
            toast.promise(promise, {
                loading: fm({ id: message.catalogue.toast.saving }),
                success: fm({ id: message.catalogue.toast.saved }),
                error: fm({ id: message.common.errors.somethingWentWrong }),
            })
            return promise
        },
        [updateAsync, fm],
    )

    const deleteGroup = useCallback(
        async (gid: string) => {
            try {
                const promise = removeAsync(gid)
                toast.promise(promise, {
                    loading: fm({ id: message.catalogue.toast.deleting }),
                    success: fm({ id: message.catalogue.toast.deleted }),
                    error: e =>
                        getStatus(e) === 409
                            ? fm({ id: message.catalogue.category.cannotDeleteGroupInUse })
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
        createGroup,
        updateGroup,
        deleteGroup,
        isPending: createPending || updatePending || removePending,
    }
}
