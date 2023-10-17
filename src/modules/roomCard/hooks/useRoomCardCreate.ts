import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import { PATH } from '@/types/constants/paths'
import type { Mutation, RoomCard } from '@/types/gql/graphql'
import { connectN } from '@/utils/graphql/mutations'

const CREATE_ROOM_CARD = gql`
  mutation CreateRoomCards($input: [RoomCardCreateInput!]!) {
    createRoomCards(input: $input) {
      roomCards {
        uid
      }
    }
  }
`

export const makeRoomCardsCreateData = (formData?: RoomCard) => ({
  input: [
    {
      ...formData,
      location: connectN(formData?.location.uid),
      contactPersonsHall: {
        create: formData?.contactPersonsHall.map(contactPerson => ({
          node: {
            employee: {
              connect: connectN(contactPerson.employee?.uid)
            },
            role: connectN(contactPerson.role?.uid)
          }
        }))
      },
      contactPersonsDept: {
        connect: formData?.contactPersonsDept.map(contactPerson => connectN(contactPerson.uid))
      },
      teams: {
        connect: formData?.teams.map(team => connectN(team.uid))
      }
    }
  ]
})

export const useRoomCardCreate = (formData?: RoomCard) => {
  const router = useRouter()
  const [createRoomCard] = useMutation<Mutation>(CREATE_ROOM_CARD, {
    variables: makeRoomCardsCreateData(formData),
    onCompleted: data => {
      toast.success('Room card created')
      router.push(PATH.ROOM_CARD + '/' + data?.createRoomCards?.roomCards[0].uid)
    }
  })

  return { createRoomCard }
}
