import useQueryManager from '../../../hooks/useQueryManager'
import type { SystemsResponse } from '../types/responses'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { queryFetcher } from '@/utils/fetcher'
import { makeQuery } from '@/utils/formatters'

export const useSystems = tableId => {
  const { query } = useQueryManager(tableId)

  const queryKey = ['systemsList', { query: makeQuery(query) }, tableId]

  const { data, isLoading, error, dataUpdatedAt, refetch } =
    useQuery<SystemsResponse>({
      queryKey,
      queryFn: queryFetcher('systemsList'),
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
