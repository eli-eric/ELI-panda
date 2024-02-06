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
    config: { suspense: false, revalidateOnMount: true },
    useMockFetcher: false
  })

  const image = useImage(catalogueUid ? catalogueItemImage : null)

  const itemFormatted = useMemo(
    () =>
      item
        ? {
            ...item,
            details: item?.details?.map(detail => {
              if (detail.property.type.code === 'range' && detail.value) {
                return { ...detail, value: JSON.parse(detail.value) }
              }
              return detail
            })
          }
        : undefined,
    [item]
  )

  const groups = useMemo(() => {
    const groupsUnsorted = itemFormatted?.details
      ?.map(item => item.propertyGroup)
      .filter((value, index, self) => self.indexOf(value) === index)
    const groups = groupsUnsorted?.sort((a, b) => a.localeCompare(b))
    return groups
  }, [itemFormatted])

  return { item: itemFormatted, loading: isLoading, error, mutate, image, groups }
}

export default useItem
