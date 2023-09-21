import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import type { Query } from '@/types/gql/graphql'

const GET_CATEGORIES = gql`
  query GetCategories($uid: String = null) {
    catalogueCategories(where: { uid: $uid }) {
      uid
      name
      parentPath {
        uid
        name
      }
    }
  }
`

export const useCategory = () => {
  const router = useRouter()
  const uid = router.query.uid || null
  const { data, loading, error } = useQuery<Query>(GET_CATEGORIES, {
    variables: { uid }
  })

  return {
    catalogueCategory: data?.catalogueCategories[0],
    loading: loading,
    error: error
  }
}
