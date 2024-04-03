import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import { ROOM_CARDS, useRoomCards } from '@/modules/roomCards/hooks/useRoomCards'
import { PATH } from '@/types/constants/paths'

import type { Mutation } from '../../../types/gql/graphql'
import { useRoomCardStore } from '../store/useRoomCardStore'
import type { RoomCardFormType } from '../types/form'
import { updateRoomCardVariables } from '../utils'
import { GET_ROOMCARD, useRoomCard } from './useRoomCard'

const UPDATE_ROOM_CARD = gql`
  mutation Mutation($where: RoomCardWhere, $update: RoomCardUpdateInput) {
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
`

export const useRoomCardUpdate = (roomCardUid?: string) => {
  const [update] = useMutation<Mutation>(UPDATE_ROOM_CARD, {
    refetchQueries: ['RoomCards', 'RoomCard']
  })
  const { roomCard: roomCardOrigin } = useRoomCard(roomCardUid)
  const router = useRouter()
  const { refetch } = useRoomCards()

  const { deleteHallContacts, disconnectDeptContacts, disconnectTeams, newDeptContacts, newHallContacts, newTeams } =
    useRoomCardStore()

  const updateRoomCard = (roomCardForm: RoomCardFormType, saveAndExit: boolean) =>
    update({
      variables: updateRoomCardVariables({
        uid: roomCardUid,
        roomCard: roomCardForm,
        deleteHallContacts,
        disconnectDeptContacts,
        disconnectTeams,
        newDeptContacts,
        newHallContacts,
        newTeams,
        disconnectLocations: roomCardOrigin?.locations
          ?.filter(originLocation => !roomCardForm.locations?.some(location => originLocation.uid === location.uid))
          .map(location => ({ uid: location.uid, code: location.code, name: location.name })) as Codebooktree[],
        newLocations: roomCardForm.locations
          ?.filter(location => !roomCardOrigin?.locations?.some(originLocation => originLocation.uid === location.uid))
          .map(location => ({ uid: location.uid, code: location.code, name: location.name })) as Codebooktree[]
      }),
      onCompleted: () => {
        refetch()
        saveAndExit && router.push(PATH.ROOM_CARDS)
      },
      refetchQueries: [ROOM_CARDS, GET_ROOMCARD]
    })

  return { updateRoomCard }
}
