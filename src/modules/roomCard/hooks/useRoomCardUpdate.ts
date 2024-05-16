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
  ) {
    updateRoomCards(where: $where, update: $update) {
      roomCards {
        purityClass
        name
        status
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
  }
`)

export const useRoomCardUpdate = (roomCardUid?: string) => {
  // const [update] = useMutation(updateRoomCardMutation, {
  // refetchQueries: ['RoomCards', 'RoomCard']
  // })

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
  ) =>
    update(
      updateRoomCardVariables({
        uid: roomCardUid,
        roomCard: roomCardForm,
        deleteHallContacts,
        disconnectDeptContacts,
        disconnectTeams,
        newDeptContacts,
        newHallContacts,
        newTeams,
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
      }),
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

  return { updateRoomCard }
}
