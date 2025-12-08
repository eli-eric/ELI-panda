import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

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

export const makeRoomCardsCreateData = (formData: RoomCardFormType) => {
  // Destructure fields that need special handling
  // Contacts (Hall, Dept, Teams) are NOT part of the form - they can only be
  // added after the RoomCard is created (via direct mutations)
  const { operationalState, locations: _locations, ...rest } = formData

  return {
    input: [
      {
        ...rest,
        name: formData?.name ? formData?.name : '',
        cleaningScheduleDate: formData?.cleaningScheduleDate
          ? formData?.cleaningScheduleDate
          : undefined,
        operationalState: operationalState?.uid
          ? { connect: { where: { node: { uid: operationalState.uid } } } }
          : undefined,
        locations: {
          connect: formData?.locations?.map(location => whereN(location.uid)) || []
        }
      }
    ]
  }
}

export const useRoomCardCreate = () => {
  //TODO     refetchQueries: ['RoomCards', 'RoomCard']
  const { mutateAsync } = useGraphQLMutation(createRoomCardMutation)

  return { createRoomCard: mutateAsync }
}
