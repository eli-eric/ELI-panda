import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

import type { Query } from '@/types/gql/graphql'

import { useCategoryUid } from './useCategoryUid'

const GET_CATEGORIES = gql`
  query GetCategories($where: CatalogueCategoryWhere) {
    catalogueCategories(where: $where) {
      name
      uid
    }
  }
`

export const useCategoryList = () => {
  const uid = useCategoryUid()
  const { data, loading, error, refetch, previousData } = useQuery<Query>(GET_CATEGORIES, {
    variables: {
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
    }
  })

  useEffect(() => {
    if (error) toast.error('Error loading categories')
  }, [error])

  return {
    catalogueCategories: data?.catalogueCategories || previousData?.catalogueCategories,
    loading: loading,
    error: error,
    refetch
  }
}
