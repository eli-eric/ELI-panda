import { gql, useQuery } from '@apollo/client'
import { toast } from 'react-hot-toast'

import type { Query } from '@/types/gql/graphql'

import { useCategoryUid } from './useCategoryUid'

const GET_CATEGORIES = gql`
  query GetCategory($uid: ID = null) {
    catalogueCategories(where: { uid: $uid }) {
      uid
      name
      systemType {
        uid
        name
      }
      parentPath {
        uid
        name
      }
    }
  }
`

export const useCategory = (catalogueCategoryUid?: string) => {
  const uid = useCategoryUid()
  const { data, loading, error } = useQuery<Query>(GET_CATEGORIES, {
    variables: { uid: uid || catalogueCategoryUid },
    returnPartialData: true,
    skip: !uid && !catalogueCategoryUid,
    onError: () => {
      toast.error('Failed to load category')
    }
  })

  return {
    catalogueCategory: data?.catalogueCategories[0],
    loading: loading,
    error: error
  }
}
