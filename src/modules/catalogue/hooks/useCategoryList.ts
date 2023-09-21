import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import type { Query } from '@/types/gql/graphql'

const GET_CATEGORIES = gql`
  query GetCategories($parentCategory: CatalogueCategoryWhere = null) {
    catalogueCategories(where: { parentCategory: $parentCategory }) {
      uid
      name
    }
  }
`

export const useCategoryList = () => {
  const router = useRouter()
  const uid = router.query.uid || null
  const {
    data,
    loading,
    error,
    client: { mutate }
  } = useQuery<Query>(GET_CATEGORIES, {
    variables: { parentCategory: uid ? { uid } : null }
  })

  return {
    catalogueCategories: data?.catalogueCategories,
    loading: loading,
    error: error,
    mutate,
    uid: router.query.uid
  }
}
