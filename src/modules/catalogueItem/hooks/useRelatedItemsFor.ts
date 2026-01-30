import { useRouter } from 'next/router'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

const GET_RELATED_ITEMS_FOR = gql(`
  query RelatedCatalogueItemsFor($where: CatalogueItemWhere) {
    catalogueItems(where: $where) {
      relatedCatalogueItemsFor {
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

export const useRelatedItemsFor = () => {
    const router = useRouter()
    const uid = router.query.uid as string
    const { data, isLoading, refetch } = useGraphQL(GET_RELATED_ITEMS_FOR, {
        variables: {
            where: {
                uid,
            },
        },
        enabled: !!uid,
    })

    return {
        data: data?.catalogueItems[0].relatedCatalogueItemsFor,
        loading: isLoading,
        refetch,
    }
}
