import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { gql } from '@/types/gql'

import { useGraphQL } from '../fetch/useGraphQL'

const GET_FILTERS = gql(`
  query UserSettings($userSettingsWhere: UserSettingsWhere) {
    userSettings(where: $userSettingsWhere) {
      uid
      key
      name
      value
    }
  }
`)

export const useFilterDetails = (tableId: string, filterUid?: string) => {
  const user = useSession().data?.user
  const { data, refetch, error } = useGraphQL(GET_FILTERS, {
    variables: {
      userSettingsWhere: {
        user: {
          uid: user?.uid
        },
        key_CONTAINS: `filter-${tableId}`,
        ...(filterUid && { uid: filterUid })
      }
    }
  })

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch filters')
    }
  }, [error])

  return { filters: data?.userSettings, refetch }
}
