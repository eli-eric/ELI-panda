import { useQuery } from '@tanstack/react-query'

import useQueryManager from '@/hooks/useQueryManager'
import { queryFetcher } from '@/utils/fetcher'

import type { GrantsResponse } from '../types/grant.types'

export const useGrants = (tableId: string) => {
    const query = useQueryManager(tableId, undefined, true)

    return useQuery({
        queryKey: ['grants', { query: query.query }],
        queryFn: queryFetcher<GrantsResponse>('grants'),
    })
}
