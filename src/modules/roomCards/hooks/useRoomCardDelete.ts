import { gql, useMutation } from '@apollo/client'
import { toast } from 'react-hot-toast'

import { useRoomCards } from './useRoomCards'

const ROOM_CARD_DELETE = gql`
  mutation DeleteRoomCards($deleteHallContactPeopleWhere: HallContactPersonWhere, $where: RoomCardWhere) {
    deleteRoomCards(where: $where) {
      nodesDeleted
    }
    deleteHallContactPeople(where: $deleteHallContactPeopleWhere) {
      nodesDeleted
    }
  }
`

export const useRoomCardDelete = (uid: string, name: string) => {
  const { refetch } = useRoomCards()

  const [deleteRoomCard] = useMutation(ROOM_CARD_DELETE, {
    variables: {
      where: {
        uid
      },
      deleteHallContactPeopleWhere: {
        roomCard: {
          uid
        }
      }
    },
    onCompleted: () => {
      refetch()
      toast.success(`Room card ${name} was deleted`)
    },
    onError: () => {
      toast.error(`Something went wrong with delete ${name} room card!`)
    }
  })

  return { deleteRoomCard }
}
