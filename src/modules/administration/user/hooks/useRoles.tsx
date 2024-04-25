import toast from 'react-hot-toast'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

const GET_ROLES = gql(`
  query GetRoles {
    roles {
      name
      code
      uid
    }
  }
`)

export const useRoles = () => {
  const { data } = useGraphQL(
    GET_ROLES,
    {},
    {
      onError: error => {
        toast.error(error.message)
      }
    }
  )
  return data?.roles || []
}
