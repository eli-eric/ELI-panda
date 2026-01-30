import { useRouter } from 'next/router'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

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
                uid,
            },
        },
        enabled: !!uid,
    })

    return {
        data: data?.catalogueItems[0].relatedCatalogueItems,
        loading: isLoading,
        refetch,
    }
}
