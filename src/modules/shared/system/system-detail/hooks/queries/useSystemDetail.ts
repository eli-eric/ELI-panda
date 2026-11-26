import type { QueryClient } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

import type { AxiosError } from '@/types/http'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'
import { SYSTEM_DETAIL_QUERY_KEY } from '@/utils/query/queryKeys'

import type { SystemDetail } from '../../types'
import { isNotFoundError } from '../../utils/systemErrors'

export const getSystemDetailQueryKey = (uid: string): QueryFetcherKey => [
    SYSTEM_DETAIL_QUERY_KEY,
    { uid },
]

/**
 * GET /system/:uid — the single read model for every system-detail surface
 * (explorer tabs + sidebar, Edit System sheet, dialogs). The PATCH hooks write
 * their response straight into this cache entry.
 */
export const useSystemDetail = (uid?: string | null) => {
    const query = useQuery<SystemDetail, AxiosError, SystemDetail, QueryFetcherKey>({
        queryKey: [SYSTEM_DETAIL_QUERY_KEY, { uid: uid ?? null }],
        queryFn: queryFetcher<SystemDetail>('systemDetail'),
        enabled: !!uid,
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        // a missing system is a final answer, a transient failure gets one retry
        retry: (failureCount, error) => !isNotFoundError(error) && failureCount < 1,
    })

    // never expose a payload that belongs to another uid (e.g. a mis-seeded cache entry)
    const system = query.data && query.data.uid === uid ? query.data : null

    return {
        system,
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        // only the navigation seed (see primeSystemDetailCache) is written with updatedAt 0
        isSeeded: !!query.data && query.dataUpdatedAt === 0,
        isNotFound: isNotFoundError(query.error),
        error: query.error,
        refetch: query.refetch,
    }
}

export const getCachedSystemDetail = (
    queryClient: QueryClient,
    uid: string,
): SystemDetail | undefined => queryClient.getQueryData<SystemDetail>(getSystemDetailQueryKey(uid))
