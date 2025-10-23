import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

import { useUsers } from './useUsers'

const DELETE_USER = gql(`
  mutation DeleteUsers($where: UserWhere) {
    deleteUsers(where: $where) {
      nodesDeleted
    }
  }
`)

export const useUserDelete = (name: string) => {
  const { refetch } = useUsers()

  const { mutate } = useGraphQLMutation(DELETE_USER, {
    onSuccess: () => {
      refetch()
      toast.success(`User ${name} was deleted`)
    },
    onError: () => {
      toast.error(`Something went wrong with delete ${name} user!`)
    }
  })

  return [mutate]
}
