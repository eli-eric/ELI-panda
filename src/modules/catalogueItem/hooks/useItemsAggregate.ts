'use-client'

import { useQuery } from '@tanstack/react-query'

import { queryFetcher } from '@/utils/fetcher'

import type { CatalogueStatistics } from '../components/statistics/CatalogueStatistics.columns'
//use faker to generate fake data

export const useItemsAggregate = (uid?: string) => {
    const { data, error, isLoading } = useQuery({
        queryKey: uid ? ['catalogueItemStatistics', { uid }] : ['catalogueItemsStatistics'],
        queryFn: uid
            ? queryFetcher<CatalogueStatistics[]>('catalogueItemStatistics')
            : queryFetcher<CatalogueStatistics[]>('catalogueItemsStatistics'),
    })

    return { itemStatistics: data, loading: isLoading, error }
}
