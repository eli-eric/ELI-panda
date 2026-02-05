import { useQuery } from '@tanstack/react-query'

import { queryFetcher } from '@/utils/fetcher'

import type { ServiceTypeResponse } from '../types/responses'

export const useServiceTypeList = () => {
    return useQuery({
        queryKey: ['useServiceTypeList', {}],
        queryFn: queryFetcher<ServiceTypeResponse[]>('serviceTypeList'),
    })
}
