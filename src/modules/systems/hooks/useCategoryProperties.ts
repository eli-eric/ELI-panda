import { toast } from 'react-hot-toast'

import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { useQuery } from '@tanstack/react-query'
import { queryFetcher } from '@/utils/fetcher'
import { useEffect } from 'react'

export const useCategoryProperties = (uid?: string) => {
  const { data, error } = useQuery({
    queryKey: ['catalogueCategoryProperties', { uid }],
    queryFn: queryFetcher<CatalogueItemDetail[]>('catalogueCategoryProperties'),
    enabled: !!uid
  })

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch category properties')
    }
  }, [error])

  return { catalogueCategoryProperties: data }
}
