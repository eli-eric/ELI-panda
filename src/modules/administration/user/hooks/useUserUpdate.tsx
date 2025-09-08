import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

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
    onSuccess: data => {
      toast.success('User updated successfully')
      onSuccess()
    },
    onError: error => {
      toast.error(`Failed to update user: ${error.message}`)
    }
  })
  return {
    updateUser: mutate,
    loading: isPending
  }
}
