import { gql, useQuery } from '@apollo/client'
import toast from 'react-hot-toast'

import type { Query } from '@/types/gql/graphql'

const GET_SYSTEM_TYPE_GROUPS = gql`
  query Query {
    systemTypeGroups {
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
  const { data, loading, error } = useQuery<Query>(GET_SYSTEM_TYPE_GROUPS, {
    onError: err => {
      toast.error(err.message)
    }
  })
  return { systemTypeGroups: data?.systemTypeGroups, loading, error }
}
