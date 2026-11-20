import { useEffect, useMemo } from 'react'
import { toast } from 'sonner'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { useUrlQueryState } from '@/hooks/useUrlQueryState'
import { gql } from '@/types/gql'

import { filterUsers } from '../utils/filterUsers'

export const USERS_QUERY_KEY = 'users'

const USERS = gql(`
  query UsersQuery($where: UserWhere) {
    users(where: $where, options: { sort: [{ username: ASC }] }) {
      uid
      email
      firstName
      isEnabled
      lastName
      passwordToChange
      employee {
        uid
        fullName
        ldapUser
        orgUnitCode
      }
      teams {
        uid
        name
      }
      roles {
        name
        code
        uid
      }
      username
      facility {
        name
        code
      }
    }
  }
`)

/**
 * All users (a few hundred) are fetched once; search and paging run client-side,
 * so search can be case/diacritics-insensitive across names, logins and roles.
 */
export const useUsers = () => {
    const [search] = useUrlQueryState('search')

    const { data, isLoading, error, refetch } = useGraphQL(USERS, {
        customQueryKey: [USERS_QUERY_KEY],
    })

    useEffect(() => {
        if (error) {
            toast.error('Failed to fetch users')
        }
    }, [error])

    const users = useMemo(() => data && filterUsers(data.users, search), [data, search])

    return { users, loading: isLoading, error, refetch }
}
