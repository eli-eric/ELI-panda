import { useSession } from 'next-auth/react'

import { useGraphQL } from '../fetch/useGraphQL'
import { gql } from '@/types/gql'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

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
    userSettingsWhere: {
      user: {
        uid: user?.uid
      },
      key_CONTAINS: `filter-${tableId}`,
      ...(filterUid && { uid: filterUid })
    }
  })
  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch filters')
    }
  }, [error])

  return { filters: data?.userSettings, refetch }
}
