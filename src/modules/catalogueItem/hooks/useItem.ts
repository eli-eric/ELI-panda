'use-client'

import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import { useImage } from '@/hooks/fetch/useImage'

import type { CatalogueItem } from '../types/responses'

const useItem = () => {
  const router = useRouter()
  const catalogueUid = router.query.uid as string
  const { catalogueItem, catalogueItemImage } = useEndpoint({ uid: catalogueUid })

  const {
    response: item,
    loading: isLoading,
    error,
    mutate
  } = useFetch<CatalogueItem>({
    url: () => (catalogueUid ? catalogueItem : null),
    config: { suspense: false },
    useMockFetcher: true
  })

  const image = useImage(catalogueUid ? catalogueItemImage : null)

  const groups = useMemo(
    () => item?.details?.map(item => item.propertyGroup).filter((value, index, self) => self.indexOf(value) === index),
    [item]
  )

  return { item, loading: isLoading, error, mutate, image, groups }
}

export default useItem
