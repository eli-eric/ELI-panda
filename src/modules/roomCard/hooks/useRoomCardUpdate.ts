import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { useRoomCards } from '@/modules/roomCards/hooks/useRoomCards'
import { gql } from '@/types/gql'
import { navigateBack } from '@/utils'

import { useRoomCardStore } from '../store/useRoomCardStore'
import type { RoomCardFormType } from '../types/form'
import { updateRoomCardVariables } from '../utils'
import { useRoomCard } from './useRoomCard'

const updateRoomCardMutation = gql(`
  mutation UpdateRoomCardMutation(
    $where: RoomCardWhere
    $update: RoomCardUpdateInput
    $node: String
    $nodeUid: String
    $action: String
    $opStateNode: String
    $opStateNodeUid: String
    $opStateAction: String
    $opStatePreviousState: String
    $opStateNewState: String
  ) {
    updateRoomCards(where: $where, update: $update) {
      roomCards {
        purityClass
        name
        status
        operationalState
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
    operationalStateHistory: updatedByResolver(
      node: $opStateNode
      nodeUid: $opStateNodeUid
      action: $opStateAction
      previousState: $opStatePreviousState
      newState: $opStateNewState
    )
  }
`)

export const useRoomCardUpdate = (roomCardUid?: string) => {
  const { mutateAsync: update } = useGraphQLMutation(updateRoomCardMutation)
  const { roomCard: roomCardOrigin } = useRoomCard(roomCardUid)
  const { refetch } = useRoomCards()

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

    // Prepare data for OPERATION_STATE action (with previousState/newState)
    const opStateData = variables.operationalStateChanged
      ? {
          opStateNode: 'RoomCard',
          opStateNodeUid: roomCardUid || '',
          opStateAction: 'OPERATION_STATE',
          opStatePreviousState: variables.originalOperationalState || '',
          opStateNewState: roomCardForm.operationalState || ''
        }
      : {
          opStateNode: null,
          opStateNodeUid: null,
          opStateAction: null,
          opStatePreviousState: null,
          opStateNewState: null
        }

    return update(
      {
        ...variables,
        ...updateData,
        ...opStateData
      },
      {
        onSuccess: () => {
          refetch()
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
