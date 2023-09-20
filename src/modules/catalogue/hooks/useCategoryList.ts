import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import type { CatalogueCategoryResponse } from '../types/responses'

const GET_CATEGORIES = gql`
  query GetCategories {
    catalogueCategories(where: { parentCategory: null }) {
      uid
      name
    }
  }
`
const GET_SUBCATEGORIES = gql`
  query GetCategories($uid: String!) {
    catalogueCategories(where: { uid: $uid }) {
      parentPath {
        uid
        name
      }
      subCategories {
        uid
        name
      }
    }
  }
`
export const useCategoryList = () => {
  const router = useRouter()
  const {
    data,
    loading,
    error,
    client: { mutate }
  } = useQuery<CatalogueCategoryResponse>(router.query.uid ? GET_SUBCATEGORIES : GET_CATEGORIES, {
    variables: { uid: router.query.uid }
  })

  return { categoryList: data?.catalogueCategories, loading, error, mutate, uid: router.query.uid }
}
