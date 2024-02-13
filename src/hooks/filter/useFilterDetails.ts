import { gql, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'

import type { Query } from '@/types/gql/graphql'

const GET_FILTERS = gql`
  query UserSettings($userSettingsWhere: UserSettingsWhere) {
    userSettings(where: $userSettingsWhere) {
      uid
      key
      name
      value
    }
  }
`

export const useFilterDetails = (tableId: string, filterUid?: string) => {
  const user = useSession().data?.user
  const { data, refetch } = useQuery<Query>(GET_FILTERS, {
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

  return { filters: data?.userSettings, refetch }
}
