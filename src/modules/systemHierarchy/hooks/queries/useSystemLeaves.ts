import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import useQueryManager from '@/hooks/useQueryManager'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { LeavesResponse } from '../../types'
import { LEAVES_QUERY_KEY, LEAVES_TABLE_ID } from '../../types/constants'

export const useSystemLeaves = (parentUid: string | null) => {
    const { query } = useQueryManager(LEAVES_TABLE_ID, undefined, true)

    const queryKey: QueryFetcherKey = [LEAVES_QUERY_KEY, { uid: parentUid, query }]

    const { data, isFetching, isError, error } = useQuery<
        LeavesResponse,
        Error,
        LeavesResponse,
        QueryFetcherKey
    >({
        queryKey,
        queryFn: queryFetcher<LeavesResponse>('systemLeaves'),
        enabled: !!parentUid,
        placeholderData: keepPreviousData,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (isError && error) {
            toast.error(`Error fetching leaves: ${error.message}`)
        }
    }, [isError, error])

    return {
        leaves: data?.data ?? [],
        totalCount: data?.totalCount ?? 0,
        isLoading: isFetching,
        // True only while the first batch is actively loading: no data yet AND a
        // fetch is in flight. Drives the skeleton on first load while keepPreviousData
        // handles dim/pulse on refetch. The isFetching guard ensures a failed first
        // request (data stays undefined, fetch stops) falls through to the empty/error
        // state instead of showing the skeleton forever.
        isInitialLoad: data === undefined && isFetching,
        error,
        queryKey,
    }
}
