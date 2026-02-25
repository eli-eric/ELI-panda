import { useQuery } from '@tanstack/react-query'

import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { LeavesCountResponse } from '../../types'
import { LEAVES_COUNT_QUERY_KEY } from '../../types/constants'

export const useSystemLeavesCount = (parentUid: string) => {
    const queryKey: QueryFetcherKey = [LEAVES_COUNT_QUERY_KEY, { uid: parentUid }]

    const { data, isFetching, error } = useQuery<
        LeavesCountResponse,
        Error,
        LeavesCountResponse,
        QueryFetcherKey
    >({
        queryKey,
        queryFn: queryFetcher<LeavesCountResponse>('systemLeavesCount'),
        enabled: !!parentUid,
        staleTime: 5 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    return {
        count: data?.count ?? 0,
        isLoading: isFetching,
        error,
    }
}
