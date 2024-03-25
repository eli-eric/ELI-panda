import { Query } from '@/types/gql/graphql'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'

const CREATE_RELATED_ITEM = gql`
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
interface Props {
  uid?: string
}

export const useCreateRelatedItem = ({ uid }: Props) => {
  const router = useRouter()
  const itemUid = router.query.uid as string
  const [createRelatedItem, { data, error, loading }] = useMutation<Query>(CREATE_RELATED_ITEM, {
    variables: {
      where: {
        uid: itemUid
      },
      update: {
        relatedCatalogueItems: [
          {
            connect: [
              {
                where: {
                  node: {
                    uid
                  }
                }
              }
            ]
          }
        ]
      }
    },
    onError: error => {
      console.log(error)
    }
  })

  return {
    createRelatedItem,
    loading,
    data,
    error
  }
}
