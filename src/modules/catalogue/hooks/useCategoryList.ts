import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

const GET_CATEGORIES = gql`
  query GetCategories {
    catalogueCategories(where: { parentCategory: null }) {
      uid
      name
      subCategories {
        uid
        name
      }
    }
  }
`
const GET_SUBCATEGORIES = gql`
  query GetCategories($uid: String!) {
    catalogueCategories(where: { uid: $uid }) {
      parentPath
      subCategories {
        uid
        name
      }
    }
  }
`
export const useCategoryList = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(router.query.uid ? GET_SUBCATEGORIES : GET_CATEGORIES, {
    variables: { uid: router.query.uid }
  })
  if (router.query.uid) {
    return { categoryList: data?.catalogueCategories[0].subCategories, loading, error, mutate: () => {} }
  }
  return { categoryList: data?.catalogueCategories, loading, error, mutate: () => {} }
}
