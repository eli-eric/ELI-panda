import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from '@/types/http'

import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { Researcher } from '../types/researcher.types'

export const useResearcher = (uid?: string) => {
    return useQuery<Researcher, AxiosError, Researcher, QueryFetcherKey>({
        queryKey: ['researcher', { uid }],
        queryFn: queryFetcher<Researcher>('researcher'),
        enabled: !!uid,
        staleTime: 0,
    })
}
