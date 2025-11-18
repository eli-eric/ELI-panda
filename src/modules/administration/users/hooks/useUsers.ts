import { useQueryState } from 'next-usequerystate'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

const USERS = gql(`
  query UsersQuery($where: UserWhere) {
    users(where: $where) {
      uid
      email
      firstName
      isEnabled
      lastName
      passwordToChange
      employee {
        uid
        fullName
      }
      roles {
        name
        code
        uid
      }
      username
      uid
      facility {
        name
        code
      }
  }
  }
`)

export const useUsers = () => {
  const [search] = useQueryState('search')

  const { data, isLoading, error, refetch } = useGraphQL(USERS, {
    variables: {
      where: {
        username_CONTAINS: search || ''
      }
    }
  })

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch users')
    }
  }, [error])

  return { users: data?.users, loading: isLoading, error, refetch }
}
