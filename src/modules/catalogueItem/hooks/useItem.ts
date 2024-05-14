'use-client'

import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useImage } from '@/hooks/fetch/useImage'

import type { CatalogueItem } from '../types/responses'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'
import { useQuery } from '@tanstack/react-query'
import { queryFetcher } from '@/utils/fetcher'

export const useCatalogueItem = () => {
  const router = useRouter()
  const catalogueUid = router.query.uid as string
  const { catalogueItemImage } = useEndpoint({
    uid: catalogueUid
  })

  const {
    data: item,
    isLoading,
    error
  } = useQuery({
    queryKey: ['catalogueItem', { uid: catalogueUid }],
    queryFn: queryFetcher<CatalogueItem>('catalogueItem'),
    enabled: !!catalogueUid
  })

  const image = useImage(catalogueUid ? catalogueItemImage : null)

  const groups = useMemo(() => {
    const groupsUnsorted = item?.details
      ?.map(item => item.propertyGroup)
      .filter((value, index, self) => self.indexOf(value) === index)
    const groups = groupsUnsorted?.sort((a, b) => a.localeCompare(b))
    return groups
  }, [item])

  return { item: item, loading: isLoading, error, image, groups }
}

const GET_RELATED_ITEMS = gql(`
  query RelatedCatalogueItems($where: CatalogueItemWhere) {
    catalogueItems(where: $where) {
      relatedCatalogueItems {
        name
        catalogueCategory {
          name
          uid
        }
        supplier {
          name
          uid
        }
        description
        catalogueNumber
        uid
        manufacturerUrl
      }
    }
  }
`)

export const useRelatedItems = () => {
  const router = useRouter()
  const uid = router.query.uid as string
  const { data, isLoading, refetch } = useGraphQL(GET_RELATED_ITEMS, {
    variables: {
      where: {
        uid
      }
    },
    enabled: !!uid
  })

  return {
    data: data?.catalogueItems[0].relatedCatalogueItems,
    loading: isLoading,
    refetch
  }
}
