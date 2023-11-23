import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

import { PATH } from '@/types/constants/paths'
import type { Mutation } from '@/types/gql/graphql'

const CREATE_USER = gql`
  mutation CreateUser($input: [UserCreateInput!]!) {
    createUsers(input: $input) {
      users {
        uid
      }
    }
  }
`

export const useUserCreate = () => {
  const router = useRouter()
  const [createUser] = useMutation<Mutation>(CREATE_USER, {
    onError: err => {
      toast.error('Error while creating user:' + err.message)
    },
    onCompleted: data => {
      router.push(PATH.ADMIN_USER + '/' + data.createUsers.users[0].uid)
      toast.success('User was created successfully')
    }
  })

  return {
    createUser
  }
}
