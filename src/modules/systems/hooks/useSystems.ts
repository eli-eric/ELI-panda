import {
  keepPreviousData,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import type { SystemsResponse } from '@/types/responses/systems'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import useQueryManager from '../../../hooks/useQueryManager'

export const useSystems = (tableId: string = 'systems') => {
  const { query } = useQueryManager(tableId)

  const queryKey: QueryFetcherKey = [tableId, { query }]

  const { data, isFetching, error, dataUpdatedAt, refetch } = useQuery({
    queryKey,
    queryFn: queryFetcher<SystemsResponse>('systemsList'),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  const queryClient = useQueryClient()

  const mutate = (mutator: (prev: SystemsResponse) => SystemsResponse) => {
    queryClient.setQueryData(queryKey, mutator)
  }
  return {
    systems: data,
    loading: isFetching,
    error,
    query,
    queryKey,
    dataUpdatedAt,
    refetch,
    mutate
  }
}
