'use-client'

import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import { useImage } from '@/hooks/fetch/useImage'
import type { Query } from '@/types/gql/graphql'

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

  const groups = useMemo(() => {
    const groupsUnsorted = item?.details
      ?.map(item => item.propertyGroup)
      .filter((value, index, self) => self.indexOf(value) === index)
    const groups = groupsUnsorted?.sort((a, b) => a.localeCompare(b))
    return groups
  }, [item])

  return { item: item, loading: isLoading, error, mutate, image, groups }
}

const GET_RELATED_ITEMS = gql`
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
`

export const useRelatedItems = () => {
  const router = useRouter()
  const uid = router.query.uid as string
  const { data, loading } = useQuery<Query>(GET_RELATED_ITEMS, {
    variables: {
      where: {
        uid
      }
    },
    skip: !uid
  })

  return { data: data?.catalogueItems[0].relatedCatalogueItems, loading }
}

export default useItem
