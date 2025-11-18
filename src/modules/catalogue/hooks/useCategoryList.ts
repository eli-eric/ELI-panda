import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { message } from '@/i18n/src/messages'
import { gql } from '@/types/gql'

import { useCategoryUid } from './useCategoryUid'

const GET_CATEGORIES = gql(`
  query GetCategories($where: CatalogueCategoryWhere) {
    catalogueCategories(where: $where) {
      name
      uid
      code
      miniImageUrl
    }
  }
`)

export const useCategoryList = () => {
  const uid = useCategoryUid()
  const { data, isLoading, error, refetch } = useGraphQL(GET_CATEGORIES, {
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

  const { formatMessage: fm } = useIntl()
  useEffect(() => {
    if (error) {
      toast.error(fm({ id: message.catalogue.category.failedToLoadList }))
    }
  }, [error, fm])

  return {
    catalogueCategories: data?.catalogueCategories,
    loading: isLoading,
    error: error,
    refetch
  }
}
