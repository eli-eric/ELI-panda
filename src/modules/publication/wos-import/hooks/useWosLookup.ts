import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { fetchRequest } from '@/core/http/fetchClient'
import { buildUrl } from '@/utils/fetcher'
import { getEndpoints } from '@/utils/getEndpoints'

import { WOS_PREVIEW_TIMEOUT_MS } from '../../types/wos-import'
import type { WosLookupResponse } from '../types/wos-preview.types'

/**
 * `['wosLookup', doi]` prefix; the refreshed publication's UID follows because
 * the API answers differently for it (it is not its own duplicate).
 */
export const getWosLookupQueryKey = (doi: string, currentPublicationUid?: string) =>
    ['wosLookup', doi, currentPublicationUid ?? null] as const

/**
 * Web of Science lookup for one normalized DOI. The query never runs on its own:
 * the lookup spends provider quota, so only an explicit `lookup()` fetches, and
 * `cancel()` aborts the request through the query's AbortSignal.
 */
export const useWosLookup = (doi: string, currentPublicationUid?: string) => {
    const queryClient = useQueryClient()
    const query = useQuery({
        queryKey: getWosLookupQueryKey(doi, currentPublicationUid),
        queryFn: ({ signal }) => {
            const params = { doi, currentPublicationUid: currentPublicationUid ?? null }
            return fetchRequest<WosLookupResponse>(
                buildUrl(getEndpoints({ query: params }).wosLookup),
                {
                    signal,
                    timeoutMs: WOS_PREVIEW_TIMEOUT_MS,
                },
            )
        },
        enabled: false,
        retry: false,
    })

    const cancel = useCallback(
        () =>
            queryClient.cancelQueries({
                queryKey: getWosLookupQueryKey(doi, currentPublicationUid),
            }),
        [queryClient, doi, currentPublicationUid],
    )

    return {
        data: query.data,
        isFetching: query.isFetching,
        lookup: query.refetch,
        cancel,
    }
}
