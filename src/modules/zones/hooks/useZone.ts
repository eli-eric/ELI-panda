import { useQuery } from '@tanstack/react-query'

import type { AxiosError } from '@/types/http'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { Zone } from '../types/zone.types'

export const useZone = (uid?: string) => {
    return useQuery<Zone, AxiosError, Zone, QueryFetcherKey>({
        queryKey: ['zone', { uid }],
        queryFn: queryFetcher<Zone>('zone'),
        enabled: !!uid,
        staleTime: 0,
    })
}
