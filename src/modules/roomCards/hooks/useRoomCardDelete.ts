import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

import { useRoomCards } from './useRoomCards'

const roomCardDeleteMutation = gql(`
  mutation DeleteRoomCards(
    $deleteHallContactPeopleWhere: HallContactPersonWhere
    $where: RoomCardWhere
  ) {
    deleteRoomCards(where: $where) {
      nodesDeleted
    }
    deleteHallContactPeople(where: $deleteHallContactPeopleWhere) {
      nodesDeleted
    }
  }
`)

export const useRoomCardDelete = (uid: string, name: string) => {
  const { refetch } = useRoomCards()

  const { mutate } = useGraphQLMutation(roomCardDeleteMutation, {
    onSuccess: () => {
      refetch()
      toast.success(`Room card ${name} was deleted`)
    },
    onError: () => {
      toast.error(`Something went wrong with delete ${name} room card!`)
    }
  })
  const deleteRoomCard = () => {
    mutate({
      where: {
        uid
      },
      deleteHallContactPeopleWhere: {
        roomCard: {
          uid
        }
      }
    })
  }

  return { deleteRoomCard }
}
