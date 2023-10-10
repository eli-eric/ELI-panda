import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

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
export const useCategory = uid => {
  const { data, loading, error, previousData } = useQuery<Query>(GET_CATEGORIES, {
    variables: { uid },
    returnPartialData: true
  })

  useEffect(() => {
    if (error) toast.error('Error loading category')
  }, [error])

  return {
    catalogueCategory: data?.catalogueCategories[0] || previousData?.catalogueCategories[0],
    loading: loading,
    error: error
  }
}
