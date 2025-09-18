import { useQuery } from '@tanstack/react-query'

import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { CategoryFormType } from '../components/categoryEdit/types'

export const useCategoryDetail = (uid?: string) => {
  const queryKey: QueryFetcherKey = ['categoryDetail', { uid }]

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: queryFetcher<CategoryFormType>('catalogueCategoryEdit'),
    enabled: !!uid
  })

  return { categoryDetail: data, isLoading, error, refetch, queryKey }
}
