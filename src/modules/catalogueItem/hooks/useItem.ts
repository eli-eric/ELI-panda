import { useRouter } from 'next/router'
import { useMemo } from 'react'

import type { CatalogueItem } from '../types/responses'
import { useQuery } from '@tanstack/react-query'
import { queryFetcher } from '@/utils/fetcher'

export const useCatalogueItem = () => {
  const router = useRouter()
  const catalogueUid = router.query.uid as string

  const {
    data: item,
    isLoading,
    error
  } = useQuery({
    queryKey: ['catalogueItem', { uid: catalogueUid }],
    queryFn: queryFetcher<CatalogueItem>('catalogueItem'),
    enabled: !!catalogueUid
  })

  const groups = useMemo(() => {
    const groupsUnsorted = item?.details
      ?.map(item => item.propertyGroup)
      .filter((value, index, self) => self.indexOf(value) === index)
    const groups = groupsUnsorted?.sort((a, b) => a.localeCompare(b))
    return groups
  }, [item])

  return { item: item, loading: isLoading, error, groups }
}
