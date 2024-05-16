import useQueryManager from '@/hooks/useQueryManager'
import type { CatalogueItemsResponse } from '@/types/responses/catalogue'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'
import {
  keepPreviousData,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
export const useCatalogueItems = (tableId = 'catalogueItems') => {
  const { query } = useQueryManager(tableId)
  const pagination = JSON.parse(query.pagination || '{}')
  const queryKey: QueryFetcherKey = [
    'catalogueItems',
    { query: { ...pagination, ...query } }
  ]
  const {
    data,
    isFetching: loading,
    error
  } = useQuery({
    queryKey,
    queryFn: queryFetcher<CatalogueItemsResponse>('catalogueItems'),
    refetchOnMount: true,
    placeholderData: keepPreviousData,
    refetchInterval: 1000 * 60 * 5
  })

  useEffect(() => {
    if (error) {
      toast.error('Error fetching catalogue items: ' + error.message)
    }
  }, [error])

  const queryClient = useQueryClient()
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey
    })

  return { catalogueItems: data, loading, error, refetch }
}
