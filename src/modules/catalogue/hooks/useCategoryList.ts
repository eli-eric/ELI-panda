import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

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
  const { uid } = router.query
  const { data, loading, error, refetch, previousData } = useQuery<Query>(GET_CATEGORIES, {
    variables: { parentCategory: uid ? { uid } : null }
  })

  useEffect(() => {
    if (error) toast.error('Error loading categories')
  }, [error])

  return {
    catalogueCategories: data?.catalogueCategories || previousData?.catalogueCategories,
    loading: loading,
    error: error,
    refetch,
    uid: router.query.uid
  }
}
