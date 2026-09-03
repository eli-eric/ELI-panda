import { useQuery } from '@tanstack/react-query'

import type { NormalizedHttpError } from '@/core/http/fetchClient'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { Zone } from '../types/zone.types'

export const useZone = (uid?: string) => {
    return useQuery<Zone, NormalizedHttpError, Zone, QueryFetcherKey>({
        queryKey: ['zone', { uid }],
        queryFn: queryFetcher<Zone>('zone'),
        enabled: !!uid,
        staleTime: 0,
    })
}
