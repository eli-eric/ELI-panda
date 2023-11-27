import { gql, useQuery } from '@apollo/client'

import type { Query } from '@/types/gql/graphql'
import { USER } from '@/utils/graphql/fragments'

const USERS = gql`
  ${USER}
  query Query($where: UserWhere) {
    users(where: $where) {
      ...UserFields
    }
  }
`

export const useUserDetail = (userUid?: string) => {
  const { data, refetch, loading, previousData } = useQuery<Query>(USERS, {
    variables: {
      where: {
        uid: userUid
      }
    },
    skip: !userUid
  })
  return {
    userDetail: data?.users[0] || previousData?.users[0],
    refetch,
    loading
  }
}
