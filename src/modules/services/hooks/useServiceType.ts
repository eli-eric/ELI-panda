import { useQuery } from '@tanstack/react-query'

import { queryFetcher } from '@/utils/fetcher'

import type { ServiceTypeResponse } from '../types/responses'

export const useServiceType = (uid?: string) => {
    return useQuery({
        queryKey: ['serviceType', { uid }],
        queryFn: queryFetcher<ServiceTypeResponse>('serviceType'),
        enabled: !!uid,
    })
}
