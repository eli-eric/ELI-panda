import { useRouter } from 'next/router'
import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

const CREATE_USER = gql(`
  mutation CreateUser($input: [UserCreateInput!]!) {
    createUsers(input: $input) {
      users {
        uid
      }
    }
  }
`)

export const useUserCreate = () => {
    const router = useRouter()
    const { mutate, isPending } = useGraphQLMutation(CREATE_USER, {
        onError: err => {
            toast.error('Error while creating user:' + err.message)
        },
        onSuccess: () => {
            router.back()
            toast.success('User was created successfully')
        },
    })

    return { createUser: mutate, loading: isPending }
}
