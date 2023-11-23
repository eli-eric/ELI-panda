import { gql, useMutation } from '@apollo/client'
import toast from 'react-hot-toast'

import type { Mutation } from '@/types/gql/graphql'

const UPDATE_USER = gql`
  mutation UpdateUsers($where: UserWhere, $update: UserUpdateInput) {
    updateUsers(where: $where, update: $update) {
      users {
        uid
      }
    }
  }
`

export const useUserUpdate = () => {
  const [updateUser] = useMutation<Mutation>(UPDATE_USER, {
    onError: err => {
      toast.error('Error while Updating user: ' + err.message)
    },
    onCompleted: () => {
      toast.success('User was updated successfully')
    }
  })

  return {
    updateUser
  }
}
