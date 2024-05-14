import { gql } from '@/types/gql'
import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'

const UPDATE_USER = gql(`
  mutation UpdateUsers($where: UserWhere, $update: UserUpdateInput) {
    updateUsers(where: $where, update: $update) {
      users {
        uid
      }
    }
  }
`)

export const useUserUpdate = (onSuccess: () => void) => {
  const { mutate, isPending } = useGraphQLMutation(UPDATE_USER, {
    onSuccess: () => onSuccess()
  })
  return {
    updateUser: mutate,
    loading: isPending
  }
}
