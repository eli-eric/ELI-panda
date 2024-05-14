import useQueryManager from '../../../hooks/useQueryManager'
import type { SystemsResponse } from '../types/responses'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { queryFetcher } from '@/utils/fetcher'

export const useSystems = tableId => {
  const { query } = useQueryManager(tableId)

  const queryKey = [tableId, { query }]

  const { data, isLoading, error, dataUpdatedAt, refetch } = useQuery({
    queryKey: ['systems', { query }],
    queryFn: queryFetcher<SystemsResponse>('systemsList'),
    placeholderData: keepPreviousData,
    refetchOnMount: false
  })

  return {
    systems: data,
    loading: isLoading,
    error,
    query,
    queryKey,
    dataUpdatedAt,
    refetch
  }
}
