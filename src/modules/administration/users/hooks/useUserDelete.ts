import { gql, useMutation } from '@apollo/client'
import { toast } from 'react-hot-toast'

import { useUsers } from './useUsers'

const ROOM_CARD_DELETE = gql`
  mutation DeleteUsers($where: UserWhere) {
    deleteUsers(where: $where) {
      nodesDeleted
    }
  }
`

export const useUserDelete = (uid: string, name: string) => {
  const { refetch } = useUsers()

  const [deleteRoomCard] = useMutation(ROOM_CARD_DELETE, {
    variables: {
      where: {
        uid
      }
    },
    onCompleted: () => {
      refetch()
      toast.success(`User ${name} was deleted`)
    },
    onError: () => {
      toast.error(`Something went wrong with delete ${name} user!`)
    }
  })

  return { deleteRoomCard }
}
