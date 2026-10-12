import { useMutation } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

import { WOS_PREVIEW_TIMEOUT_MS } from '../../types/wos-import'
import type { WosLookupResponse } from '../types/wos-preview.types'

export interface WosLookupParams {
    doi: string
    currentPublicationUid?: string
}

/**
 * The lookup spends provider quota, so it never runs on render: the dialog
 * triggers it on open. GET because the route is a cacheable read per #438; the
 * generous timeout covers the provider's slower-than-HTTP budget.
 */
export const lookupWos = ({ doi, currentPublicationUid }: WosLookupParams) =>
    queryMutate<WosLookupResponse, void>('wosLookup', 'get', {
        query: { doi, currentPublicationUid: currentPublicationUid ?? null },
        timeoutMs: WOS_PREVIEW_TIMEOUT_MS,
    })().then(response => response.data)

/** The lookup runs once per dialog open; a failure is routed by the opener. */
export const useWosLookup = (params: WosLookupParams) =>
    useMutation({
        mutationKey: ['wosLookup', params.doi, params.currentPublicationUid ?? null],
        mutationFn: () => lookupWos(params),
        retry: false,
    })
