import {
  keepPreviousData,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import type { SystemsResponse } from '@/types/responses/systems'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import useQueryManager from '../../../hooks/useQueryManager'

export const useSystems = (
  tableId: string = 'systems',
  refetchOnMount: boolean = false
) => {
  const { query } = useQueryManager(tableId)

  const queryKey: QueryFetcherKey = [tableId, { query }]

  const { data, isFetching, error, dataUpdatedAt, refetch } = useQuery({
    queryKey,
    queryFn: queryFetcher<SystemsResponse>('systemsList'),
    placeholderData: keepPreviousData,
    refetchOnMount,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  const queryClient = useQueryClient()

  const mutate = (mutator: (prev: SystemsResponse) => SystemsResponse) => {
    queryClient.setQueryData(queryKey, mutator)
  }

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey })
  }

  return {
    systems: data,
    loading: isFetching,
    error,
    query,
    queryKey,
    dataUpdatedAt,
    refetch,
    mutate,
    invalidate
  }
}
