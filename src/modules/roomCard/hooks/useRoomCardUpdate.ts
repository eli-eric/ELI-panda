import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { useRoomCards } from '@/modules/roomCards/hooks/useRoomCards'
import { gql } from '@/types/gql'
import { navigateBack } from '@/utils'

import { useRoomCardStore } from '../store/useRoomCardStore'
import type { RoomCardFormType } from '../types/form'
import { hasOperationalStateChanged, updateRoomCardVariables } from '../utils'
import { useRoomCard } from './useRoomCard'

const updateRoomCardMutation = gql(`
  mutation UpdateRoomCardMutation(
    $where: RoomCardWhere
    $update: RoomCardUpdateInput
    $node: String
    $nodeUid: String
    $action: String
  ) {
    updateRoomCards(where: $where, update: $update) {
      roomCards {
        purityClass
        name
        status
      operationalState {
        name
        uid
        code 
      }
        operationalStateLastUpdated
        prescribedClothing
        entryToHvacTent
        cleaningScheduleDate
        additionalRequirements
        coolingWater
        indoorEnvironmentQuality
        compressedAirDistribution
        nitrogenCentralDistribution
        maxPressureInColdDistribution
        coolingWaterClient
        indoorEnvironmentQualityClient
        compressedAirDistributionClient
        nitrogenCentralDistributionClient
        maxPressureInColdDistributionClient
        contactPersonsHall {
          role {
            uid
            name
          }
          employee {
            uid
            fullName
            phone1
            phone2
          }
        }
        contactPersonsDept {
          uid
          fullName
          phone1
          phone2
        }
        locations {
          code
          uid
          name
        }
        teams {
          name
          uid
        }
      }
    }
    updatedByResolver(
      node: $node
      nodeUid: $nodeUid
      action: $action
    )
  }
`)

const updateOperationalStateMutation = gql(`
  mutation UpdateOperationalStateMutation(
    $node: String
    $nodeUid: String
    $action: String
    $previousState: String
    $newState: String
  ) {
    updatedByResolver(
      node: $node
      nodeUid: $nodeUid
      action: $action
      previousState: $previousState
      newState: $newState
    )
  }
`)

export const useRoomCardUpdate = (roomCardUid?: string) => {
  const { mutateAsync: update } = useGraphQLMutation(updateRoomCardMutation)
  const { mutateAsync: updateOpState } = useGraphQLMutation(
    updateOperationalStateMutation
  )
  const { roomCard: roomCardOrigin, refetch: refetchRoomCard } =
    useRoomCard(roomCardUid)
  const { refetch: refetchRoomCards } = useRoomCards()

  const {
    deleteHallContacts,
    disconnectDeptContacts,
    disconnectTeams,
    newDeptContacts,
    newHallContacts,
    newTeams
  } = useRoomCardStore()

  const updateRoomCard = (
    roomCardForm: RoomCardFormType,
    saveAndExit: boolean
  ) => {
    const variables = updateRoomCardVariables({
      uid: roomCardUid,
      roomCard: roomCardForm,
      deleteHallContacts,
      disconnectDeptContacts,
      disconnectTeams,
      newDeptContacts,
      newHallContacts,
      newTeams,
      originalOperationalState: roomCardOrigin?.operationalState,
      disconnectLocations: roomCardOrigin?.locations
        ?.filter(
          originLocation =>
            !roomCardForm.locations?.some(
              location => originLocation.uid === location.uid
            )
        )
        .map(location => ({
          uid: location.uid,
          code: location.code,
          name: location.name
        })) as Codebooktree[],
      newLocations: roomCardForm.locations
        ?.filter(
          location =>
            !roomCardOrigin?.locations?.some(
              originLocation => originLocation.uid === location.uid
            )
        )
        .map(location => ({
          uid: location.uid,
          code: location.code,
          name: location.name
        })) as Codebooktree[]
    })

    // Prepare data for UPDATE action (without previousState/newState)
    const updateData = {
      node: 'RoomCard',
      nodeUid: roomCardUid || '',
      action: 'UPDATE'
    }

    return update(
      {
        ...variables,
        ...updateData
      },
      {
        onSuccess: async () => {
          // If operational state changed, create a separate history entry
          if (
            hasOperationalStateChanged(
              roomCardOrigin?.operationalState,
              roomCardForm.operationalState
            )
          ) {
            await updateOpState({
              node: 'RoomCard',
              nodeUid: roomCardUid || '',
              action: 'OPERATION_STATE',
              previousState: roomCardOrigin?.operationalState?.code || '',
              newState: roomCardForm.operationalState?.code || ''
            })
          }

          // Refetch room card detail to update roomCardOrigin for next save
          await refetchRoomCard()
          // Refetch room cards list
          refetchRoomCards()

          if (saveAndExit) {
            navigateBack()
          }
        }
        //TODO: add refetchQueries
        // refetchQueries: [roomCardsQuery, roomCardQuery]
      }
    )
  }

  return { updateRoomCard }
}
