import { useEffect } from 'react'
import { toast } from 'sonner'

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
    const { data, error } = useGraphQL(GET_ROLES)

    useEffect(() => {
        if (error) {
            toast.error('Failed to fetch roles')
        }
    }, [error])

    return data?.roles || []
}
