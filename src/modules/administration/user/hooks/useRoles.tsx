import { gql, useQuery } from '@apollo/client'
import toast from 'react-hot-toast'

import type { Query } from '@/types/gql/graphql'

const GET_ROLES = gql`
  query GetRoles {
    roles {
      name
      code
      uid
    }
  }
`

export const useRoles = () => {
  const { data } = useQuery<Query>(GET_ROLES, {
    onError: error => {
      toast.error(error.message)
    }
  })
  return data?.roles || []
}
