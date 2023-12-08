import { gql, useQuery } from '@apollo/client'
import { useContext, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import { CatalogueContext } from '@/pages/catalogue/[uid]'
import type { Query } from '@/types/gql/graphql'

const GET_CATEGORIES = gql`
  query GetCategories($uid: ID = null) {
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

export const useCategory = (catalogueUid?: string) => {

  const { uid } = useContext(CatalogueContext)

  const { data, loading, error, previousData } = useQuery<Query>(GET_CATEGORIES, {
    variables: { uid: uid || catalogueUid },
    returnPartialData: true,
    skip: !uid && !catalogueUid
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
