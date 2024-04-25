import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

const USERS = gql(`
  query UserQuery($where: UserWhere) {
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

export const useUserDetail = (userUid?: string) => {
  const { data, refetch, isLoading } = useGraphQL(USERS, {
    where: {
      uid: userUid
    }
  })
  return {
    userDetail: data?.users[0],
    refetch,
    loading: isLoading
  }
}
