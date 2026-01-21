import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import useQueryManager from '@/hooks/useQueryManager'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { SystemCodesOverviewResponse } from '../types'

export const CONTROL_SYSTEMS_TABLE_ID = 'controlSystems'

export const useSystemCodes = (tableId: string = CONTROL_SYSTEMS_TABLE_ID) => {
  const { query } = useQueryManager(tableId)

  const queryKey: QueryFetcherKey = ['systemCodes', { query }]

  const { data, isFetching, isError, error, dataUpdatedAt, refetch } = useQuery<
    SystemCodesOverviewResponse,
    Error,
    SystemCodesOverviewResponse,
    QueryFetcherKey
  >({
    queryKey,
    queryFn: queryFetcher<SystemCodesOverviewResponse>('systemCodes'),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  useEffect(() => {
    if (isError && error) {
      toast.error(`Error fetching system codes: ${error.message}`)
    }
  }, [isError, error])

  return {
    systemCodes: data,
    loading: isFetching,
    error,
    query,
    queryKey,
    dataUpdatedAt,
    refetch
  }
}
