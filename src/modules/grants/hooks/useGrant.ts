import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from '@/types/http'

import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { Grant } from '../types/grant.types'

export const useGrant = (uid?: string) => {
    return useQuery<Grant, AxiosError, Grant, QueryFetcherKey>({
        queryKey: ['grant', { uid }],
        queryFn: queryFetcher<Grant>('grant'),
        enabled: !!uid,
        staleTime: 0,
    })
}
