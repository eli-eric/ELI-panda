import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

import type { Query } from '@/types/gql/graphql'

import { useCategoryUid } from './useCategoryUid'

const GET_CATEGORIES = gql`
  query GetCategories($uid: ID = null) {
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
  const { data, loading, error, previousData } = useQuery<Query>(GET_CATEGORIES, {
    variables: { uid: uid || catalogueCategoryUid },
    returnPartialData: true,
    skip: !uid && !catalogueCategoryUid
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
