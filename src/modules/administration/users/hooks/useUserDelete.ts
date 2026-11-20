import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

import { USERS_QUERY_KEY } from './useUsers'

const DELETE_USER = gql(`
  mutation DeleteUsers($where: UserWhere) {
    deleteUsers(where: $where) {
      nodesDeleted
    }
  }
`)

export const useUserDelete = (name: string) => {
    const queryClient = useQueryClient()

    const { mutate } = useGraphQLMutation(DELETE_USER, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] })
            toast.success(`User ${name} was deleted`)
        },
        onError: () => {
            toast.error(`Something went wrong with delete ${name} user!`)
        },
    })

    return [mutate]
}
