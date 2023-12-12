import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import { PATH } from '@/types/constants/paths'

import type { Mutation } from '../../../types/gql/graphql'
import { useRoomCardStore } from '../store/useRoomCardStore'
import type { RoomCardFormType } from '../types/form'
import { updateRoomCardVariables } from '../utils'

const UPDATE_ROOM_CARD = gql`
  mutation Mutation($where: RoomCardWhere, $update: RoomCardUpdateInput) {
    updateRoomCards(where: $where, update: $update) {
      roomCards {
        purityClass
        prescribedClothing
        entryToHvacTent
        cleaningScheduleDate
        additionalRequirements
        coolingWater
        indoorEnvironmentQuality
        compressedAirDistribution
        nitrogenCentralDistribution
        maxPressureInColdDistribution
        pressureInCoolingSystem
        roomTemperature
        humidity
        status
        contactPersonsHall {
          role {
            uid
            name
          }
          employee {
            uid
            fullName
            phoneNumber
          }
        }
        contactPersonsDept {
          uid
          fullName
          phoneNumber
        }
        location {
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
  const router = useRouter()

  const { deleteHallContacts, disconnectDeptContacts, disconnectTeams, newDeptContacts, newHallContacts, newTeams } =
    useRoomCardStore()

  const updateRoomCard = (roomCard: RoomCardFormType, saveAndExit: boolean) =>
    update({
      variables: updateRoomCardVariables({
        uid: roomCardUid,
        roomCard,
        deleteHallContacts,
        disconnectDeptContacts,
        disconnectTeams,
        newDeptContacts,
        newHallContacts,
        newTeams
      }),
      onCompleted: () => saveAndExit && router.push(PATH.ROOM_CARDS)
    })

  return { updateRoomCard }
}
