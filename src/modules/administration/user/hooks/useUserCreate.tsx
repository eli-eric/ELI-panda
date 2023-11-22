import { gql, useMutation } from '@apollo/client'
import toast from 'react-hot-toast'

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
  const [createUser] = useMutation(CREATE_USER, {
    onError: () => {
      toast.error('Error while creating user')
    },
    onCompleted: () => {
      toast.success('User was created successfully')
    }
  })

  return {
    createUser
  }
}
