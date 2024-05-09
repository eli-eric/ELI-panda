import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

const DISCONNECT_RELATED_ITEM = gql(`
  mutation DisconnectRelatedItemMutation(
    $where: CatalogueItemWhere
    $update: CatalogueItemUpdateInput
  ) {
    updateCatalogueItems(where: $where, update: $update) {
      catalogueItems {
        relatedCatalogueItems {
          name
        }
      }
    }
  }
`)

export const useDisconnectRelatedItem = () => {
  const { mutate, isPending } = useGraphQLMutation(DISCONNECT_RELATED_ITEM)
  return {
    disconnectRelatedItem: mutate,
    loading: isPending
  }
}
