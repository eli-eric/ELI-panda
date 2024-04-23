import { gql, useQuery } from '@apollo/client'
import { useQueryState } from 'next-usequerystate'
import { toast } from 'react-hot-toast'

import type { Query } from '@/types/gql/graphql'
import { USER } from '@/utils/graphql/fragments'

const USERS = gql`
  ${USER}
  query UsersQuery($where: UserWhere) {
    users(where: $where) {
      ...UserFields
    }
  }
`

export const useUsers = () => {
  const [search] = useQueryState('search')

  const { data, loading, error, refetch } = useQuery<Query>(USERS, {
    variables: {
      where: {
        username_CONTAINS: search || ''
      }
    },
    onError: () => {
      toast.error('Error loading users')
    }
  })

  return { users: data?.users, loading, error, refetch }
}
