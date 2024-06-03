import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

import { useCategoryUid } from './useCategoryUid'

const GET_CATEGORIES = gql(`
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
`)

export const useCategory = (catalogueCategoryUid?: string) => {
  const uid = useCategoryUid()
  const { data, isLoading, error } = useGraphQL(GET_CATEGORIES, {
    variables: {
      uid: uid || catalogueCategoryUid
    }
  })

  useEffect(() => {
    if (error) {
      toast.error('Error fetching category: ' + error.message)
    }
  }, [error])

  return {
    catalogueCategory: data?.catalogueCategories[0],
    loading: isLoading,
    error: error
  }
}
