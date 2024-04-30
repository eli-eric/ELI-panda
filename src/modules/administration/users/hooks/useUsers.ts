import { useQueryState } from 'next-usequerystate'
import { toast } from 'react-hot-toast'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'
import { useEffect } from 'react'

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
    where: {
      username_CONTAINS: search || ''
    }
  })

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch users')
    }
  }, [error])

  return { users: data?.users, loading: isLoading, error, refetch }
}
