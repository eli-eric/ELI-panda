'use-client'

import { useRouter } from 'next/router'
import { useMemo } from 'react'
import useSWR from 'swr'

import { mockFetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useImage } from '@/hooks/fetch/useImage'

import type { CatalogueItem } from '../types/responses'

const useItem = () => {
  const router = useRouter()
  const catalogueUid = router.query.uid as string
  const { catalogueItem, catalogueItemImage } = useEndpoint({ uid: catalogueUid })

  const {
    data: item,
    isLoading,
    error,
    mutate
  } = useSWR<CatalogueItem>(() => (catalogueUid ? catalogueItem : null), mockFetcher, { suspense: false })

  const image = useImage(catalogueItemImage)

  const groups = useMemo(
    () => item?.details?.map(item => item.propertyGroup).filter((value, index, self) => self.indexOf(value) === index),
    [item]
  )

  return { item, loading: isLoading, error, mutate, image, groups }
}

export default useItem
