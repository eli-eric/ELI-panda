import { toast } from 'react-hot-toast'

import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { queryFetcher } from '@/utils/fetcher'

export const useCategoryItemProperties = (uid?: string) => {
  const response = useQuery<CatalogueItemDetail[]>({
    queryKey: ['properties', { uid }],
    queryFn: queryFetcher('cataloguePhysicalItemProperties'),
    placeholderData: keepPreviousData,
    enabled: !!uid
  })

  useEffect(() => {
    if (response.isError) {
      toast.error('Failed fetch properties')
    }
  }, [response.isError])

  return response
}
