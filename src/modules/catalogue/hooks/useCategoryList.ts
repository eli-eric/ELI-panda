import { toast } from 'react-hot-toast'

import { useCategoryUid } from './useCategoryUid'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'
import { useEffect } from 'react'

const GET_CATEGORIES = gql(`
  query GetCategories($where: CatalogueCategoryWhere) {
    catalogueCategories(where: $where) {
      name
      uid
      code
    }
  }
`)

export const useCategoryList = () => {
  const uid = useCategoryUid()
  const { data, isLoading, error, refetch } = useGraphQL(GET_CATEGORIES, {
    where: uid
      ? {
          parentCategory: {
            uid
          }
        }
      : {
          parentCategoryAggregate: {
            count: 0
          }
        }
  })

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch categories')
    }
  }, [error])

  return {
    catalogueCategories: data?.catalogueCategories,
    loading: isLoading,
    error: error,
    refetch
  }
}
