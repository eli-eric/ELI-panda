import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import type {
  Employee,
  OperationalState,
  RoomCardUpdateInput,
  RoomCardWhere,
  Team
} from '@/types/gql/graphql'
import { whereN } from '@/utils/graphql/mutations'

import type { HallContactPerson } from '../store/useRoomCardStore'
import type { RoomCardFormType } from '../types/form'

/**
 * Formats a date string to short date and medium time format (en-GB locale)
 * Example: "01/12/24, 14:30:45"
 */
export const formatDateTime = (dateString?: string | null): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'medium'
  }).format(date)
}

type RoomCardUpdateType = {
  roomCard: RoomCardFormType
  newHallContacts: HallContactPerson[]
  deleteHallContacts: HallContactPerson[]
  newTeams: Team[]
  disconnectTeams: Team[]
  newDeptContacts: Employee[]
  disconnectDeptContacts: Employee[]
  disconnectLocations: Codebooktree[]
  newLocations: Codebooktree[]
  uid?: string
  originalOperationalState?: OperationalState | null
}
export const updateRoomCardVariables = ({
  uid,
  roomCard,
  newDeptContacts,
  disconnectDeptContacts,
  newHallContacts,
  deleteHallContacts,
  newTeams,
  disconnectTeams,
  newLocations,
  disconnectLocations,
  originalOperationalState
}: RoomCardUpdateType): {
  where: RoomCardWhere
  update: RoomCardUpdateInput
  operationalStateChanged: boolean
  originalOperationalState?: OperationalState | null
} => {
  const operationalStateChanged =
    roomCard.operationalState !== originalOperationalState

  return {
    where: {
      uid: uid
    },
    update: {
      name: roomCard.name,
      additionalRequirements: roomCard.additionalRequirements,
      cleaningScheduleDate: roomCard.cleaningScheduleDate,
      cleaningScheduleDays: roomCard.cleaningScheduleDays,
      compressedAirDistribution: roomCard.compressedAirDistribution,
      coolingWater: roomCard.coolingWater,
      entryToHvacTent: roomCard.entryToHvacTent,
      indoorEnvironmentQuality: roomCard.indoorEnvironmentQuality,
      maxPressureInColdDistribution: roomCard.maxPressureInColdDistribution,
      nitrogenCentralDistribution: roomCard.nitrogenCentralDistribution,
      prescribedClothing: roomCard.prescribedClothing,
      purityClass: roomCard.purityClass,
      compressedAirDistributionClient: roomCard.compressedAirDistributionClient,
      coolingWaterClient: roomCard.coolingWaterClient,
      indoorEnvironmentQualityClient: roomCard.indoorEnvironmentQualityClient,
      maxPressureInColdDistributionClient:
        roomCard.maxPressureInColdDistributionClient,
      nitrogenCentralDistributionClient:
        roomCard.nitrogenCentralDistributionClient,
      status: roomCard.status,
      operationalState: roomCard.operationalState,
      ...(operationalStateChanged && {
        operationalStateLastUpdated: new Date().toISOString()
      }),
      contactPersonsDept: [
        {
          connect: newDeptContacts
            .filter(deptContact => deptContact?.uid)
            .map(deptContact => whereN(deptContact.uid)),
          disconnect: disconnectDeptContacts
            .filter(deptContact => deptContact?.uid)
            .map(deptContact => whereN(deptContact.uid))
        }
      ],
      contactPersonsHall: [
        {
          delete: deleteHallContacts
            .filter(hallContact => hallContact?.uid) // CRITICAL: Only delete items with valid uid
            .map(hallContact => whereN(hallContact.uid)),
          create: newHallContacts.map(hallContact => ({
            node: {
              employee: {
                connect: whereN(hallContact?.employee?.uid)
              },
              role: {
                connect: whereN(hallContact?.role?.uid)
              }
            }
          }))
        }
      ],
      teams: [
        {
          connect: newTeams
            .filter(team => team?.uid)
            .map(team => whereN(team.uid)),
          disconnect: disconnectTeams
            .filter(team => team?.uid)
            .map(team => whereN(team.uid))
        }
      ],
      locations: [
        {
          connect: newLocations
            .filter(location => location?.uid)
            .map(location => whereN(location.uid)),
          disconnect: disconnectLocations
            .filter(location => location?.uid)
            .map(location => whereN(location.uid))
        }
      ]
    },
    operationalStateChanged,
    originalOperationalState
  }
}
