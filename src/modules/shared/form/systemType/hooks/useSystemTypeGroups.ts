import { gql, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'

import type { Query } from '@/types/gql/graphql'

const GET_SYSTEM_TYPE_GROUPS = gql`
  query Query($where: SystemTypeGroupWhere) {
    systemTypeGroups(where: $where) {
      name
      uid
      systemTypes {
        name
        uid
      }
    }
  }
`

export const useSystemTypeGroups = () => {
  const { data: session } = useSession()

  const { data, loading, error } = useQuery<Query>(GET_SYSTEM_TYPE_GROUPS, {
    variables: {
      where: {
        facility: {
          code: session?.user.facilityCode
        }
      }
    }
  })
  return { systemTypeGroups: data?.systemTypeGroups, loading, error }
}
