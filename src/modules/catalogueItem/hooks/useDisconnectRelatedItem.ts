import type { Query } from '@/types/gql/graphql'
import { useMutation, gql } from '@apollo/client'

const DISCONNECT_RELATED_ITEM = gql`
  mutation Mutation($where: CatalogueItemWhere, $update: CatalogueItemUpdateInput) {
    updateCatalogueItems(where: $where, update: $update) {
      catalogueItems {
        relatedCatalogueItems {
          name
        }
      }
    }
  }
`

export const useDisconnectRelatedItem = () => {
  const [disconnectRelatedItem, { data, error, loading }] = useMutation<Query>(DISCONNECT_RELATED_ITEM)
  return {
    disconnectRelatedItem,
    loading,
    data,
    error
  }
}
