import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'
import { connectN } from '@/utils/graphql/mutations'

import { whereN } from '../../../utils/graphql/mutations'
import type { RoomCardFormType } from '../types/form'

const createRoomCardMutation = gql(`
  mutation CreateRoomCards($input: [RoomCardCreateInput!]!) {
    createRoomCards(input: $input) {
      roomCards {
        uid
      }
    }
  }
`)

export const makeRoomCardsCreateData = (formData: RoomCardFormType) => ({
  input: [
    {
      ...formData,
      name: formData?.name ? formData?.name : '',
      cleaningScheduleDate: formData?.cleaningScheduleDate
        ? formData?.cleaningScheduleDate
        : undefined,
      contactPersonsHall: {
        create: formData?.contactPersonsHall.map(contactPerson => ({
          node: {
            employee: connectN(contactPerson.employee?.uid),
            role: connectN(contactPerson.role?.uid)
          }
        }))
      },
      contactPersonsDept: {
        connect: formData?.contactPersonsDept.map(contactPerson =>
          whereN(contactPerson.uid)
        )
      },
      teams: {
        connect: formData?.teams.map(team => whereN(team.uid))
      },
      locations: {
        connect: formData?.locations.map(location => whereN(location.uid))
      }
    }
  ]
})

export const useRoomCardCreate = () => {
  //TODO     refetchQueries: ['RoomCards', 'RoomCard']
  const { mutateAsync } = useGraphQLMutation(createRoomCardMutation)

  return { createRoomCard: mutateAsync }
}
