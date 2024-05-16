import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

const CREATE_RELATED_ITEM = gql(`
  mutation CreateRelatedItemMutation(
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

export const useCreateRelatedItem = () => {
  const { mutate, isPending } = useGraphQLMutation(CREATE_RELATED_ITEM)

  return {
    createRelatedItem: mutate,
    loading: isPending
  }
}
