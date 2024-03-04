import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import type { Query } from '@/types/gql/graphql'

const GET_CATEGORIES = gql`
  query GetCategories($where: CatalogueCategoryWhere) {
    catalogueCategories(where: $where) {
      name
      uid
    }
  }
`

export const useCategoryList = () => {
  const tableId = 'catalogueItems'
  const { storeFilters } = useFormFilterState({ tableId, enableQueryUrl: true })
  const filter = storeFilters?.find(filter => filter.id === 'category')
  const uid = (filter?.value as { uid: string })?.uid
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
