import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'
import { queryMutate } from '@/utils/fetcher'

import {
    CATALOGUE_ITEM_DETAIL_QUERY_KEY,
    CATALOGUE_ITEM_HISTORY_QUERY_KEY,
} from '../../types/constants'

export type CatalogueItemDetailPatch = {
    property: { uid: string }
    propertyGroup?: string
    value?: string | number | boolean | { min?: number; max?: number } | null
}

export interface CatalogueItemPatchBody {
    lastUpdateTime: string
    name?: string
    catalogueNumber?: string
    description?: string | null
    manufacturerUrl?: string | null
    manufacturerNumber?: string | null
    supplier?: { uid: string; name?: string } | null
    category?: { uid: string; name?: string }
    details?: CatalogueItemDetailPatch[]
}

export const useCatalogueItemPatch = (itemUid: string) => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['catalogueItemPatch', { uid: itemUid }],
        mutationFn: queryMutate<CatalogueItem, CatalogueItemPatchBody>('catalogueItem', 'patch', {
            uid: itemUid,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['catalogueItem'] })
            queryClient.invalidateQueries({ queryKey: ['catalogueItems'] })
            queryClient.invalidateQueries({ queryKey: [CATALOGUE_ITEM_DETAIL_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [CATALOGUE_ITEM_HISTORY_QUERY_KEY] })
        },
    })

    const withToast = useCallback(
        <T>(promise: Promise<T>) => {
            toast.promise(promise, {
                loading: fm({ id: message.catalogue.toast.saving }),
                success: fm({ id: message.catalogue.toast.saved }),
                error: fm({ id: message.common.errors.somethingWentWrong }),
            })
            return promise
        },
        [fm],
    )

    const patchItem = useCallback(
        (payload: CatalogueItemPatchBody) => withToast(mutateAsync(payload)),
        [mutateAsync, withToast],
    )

    const patchDetail = useCallback(
        (detail: CatalogueItemDetailPatch, lastUpdateTime: string) =>
            withToast(mutateAsync({ lastUpdateTime, details: [detail] })),
        [mutateAsync, withToast],
    )

    return { patchItem, patchDetail, isPending }
}
