import { useQuery } from '@tanstack/react-query'

import useQueryManager from '@/hooks/useQueryManager'
import { queryFetcher } from '@/utils/fetcher'

import type { PublicationsResponse } from '../types/responses'

export const usePublications = (tableId: string) => {
    const query = useQueryManager(tableId, undefined, true)

    return useQuery({
        queryKey: ['publications', { query: query.query }],
        queryFn: queryFetcher<PublicationsResponse>('publications'),
    })
}
