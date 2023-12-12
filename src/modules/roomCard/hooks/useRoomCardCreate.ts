import { gql, useMutation } from '@apollo/client'

import type { Mutation } from '@/types/gql/graphql'
import { connectN } from '@/utils/graphql/mutations'

import { whereN } from '../../../utils/graphql/mutations'
import type { RoomCardFormType } from '../types/form'

const CREATE_ROOM_CARD = gql`
  mutation CreateRoomCards($input: [RoomCardCreateInput!]!) {
    createRoomCards(input: $input) {
      roomCards {
        uid
      }
    }
  }
`

export const makeRoomCardsCreateData = (formData?: RoomCardFormType) => ({
  input: [
    {
      ...formData,
      cleaningScheduleDate: formData?.cleaningScheduleDate ? formData?.cleaningScheduleDate : undefined,
      //location: connectN(formData?.location.uid),
      contactPersonsHall: {
        create: formData?.contactPersonsHall.map(contactPerson => ({
          node: {
            employee: connectN(contactPerson.employee?.uid),
            role: connectN(contactPerson.role?.uid)
          }
        }))
      },
      contactPersonsDept: {
        connect: formData?.contactPersonsDept.map(contactPerson => whereN(contactPerson.uid))
      },
      teams: {
        connect: formData?.teams.map(team => whereN(team.uid))
      }
    }
  ]
})

export const useRoomCardCreate = (formData?: RoomCardFormType) => {
  const [createRoomCard] = useMutation<Mutation>(CREATE_ROOM_CARD, {
    variables: makeRoomCardsCreateData(formData),
    refetchQueries: ['RoomCards', 'RoomCard']
  })

  return { createRoomCard }
}
