import { useCategoryUid } from './useCategoryUid'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

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
  const { data, isLoading, error } = useGraphQL(
    GET_CATEGORIES,
    {
      uid: uid || catalogueCategoryUid
    },
    { onError: () => {} }
  )

  return {
    catalogueCategory: data?.catalogueCategories[0],
    loading: isLoading,
    error: error
  }
}
