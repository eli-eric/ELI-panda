import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { message } from '@/i18n/src/messages'
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
            uid: uid || catalogueCategoryUid,
        },
    })

    const { formatMessage: fm } = useIntl()
    useEffect(() => {
        if (error) {
            toast.error(
                fm({ id: message.catalogue.category.errorFetching }, { reason: error.message }),
            )
        }
    }, [error, fm])

    return {
        catalogueCategory: data?.catalogueCategories[0],
        loading: isLoading,
        error: error,
    }
}
