import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { GlobalSearchResponse } from '../types'

const GLOBAL_SEARCH_PAGINATION = '{"pageSize": 50, "page": 1}'

interface UseGlobalSearchOptions {
  search?: string
  enabled?: boolean
}

/**
 * Hook for fetching global search results
 * Uses TanStack Query with debounced search and pagination support
 */
export const useGlobalSearch = ({
  search = '',
  enabled = true
}: UseGlobalSearchOptions = {}) => {
  // Only enable search if:
  // 1. enabled flag is true
  // 2. search query has at least 2 characters
  const isEnabled = enabled && search.length >= 2

  const queryKey: QueryFetcherKey = useMemo(() => {
    const trimmedSearch = search.trim()

    return [
      'globalSearch',
      {
        query: trimmedSearch
          ? {
              searchText: trimmedSearch,
              pagination: GLOBAL_SEARCH_PAGINATION
            }
          : null
      }
    ]
  }, [search])

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey,
    queryFn: queryFetcher<GlobalSearchResponse>('globalSearch'),
    placeholderData: keepPreviousData,
    enabled: isEnabled,
    // Stale time to avoid refetching the same query too frequently
    staleTime: 30000 // 30 seconds
  })

  return {
    data: data?.data ?? [],
    totalCount: data?.totalCount ?? 0,
    isLoading,
    isFetching,
    error,
    queryKey
  }
}
