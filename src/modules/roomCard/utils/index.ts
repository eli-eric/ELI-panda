import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { Employee, RoomCardUpdateInput, RoomCardWhere, Team } from '@/types/gql/graphql'
import { whereN } from '@/utils/graphql/mutations'

import type { HallContactPerson } from '../store/useRoomCardStore'
import type { RoomCardFormType } from '../types/form'

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
  disconnectLocations
}: RoomCardUpdateType): { where: RoomCardWhere; update: RoomCardUpdateInput } => ({
  where: {
    uid: uid
  },
  update: {
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
    maxPressureInColdDistributionClient: roomCard.maxPressureInColdDistributionClient,
    nitrogenCentralDistributionClient: roomCard.nitrogenCentralDistributionClient,
    status: roomCard.status,
    contactPersonsDept: [
      {
        connect: newDeptContacts.map(deptContact => whereN(deptContact?.uid)),
        disconnect: disconnectDeptContacts.map(deptContact => whereN(deptContact?.uid))
      }
    ],
    contactPersonsHall: [
      {
        delete: deleteHallContacts.map(hallContact => whereN(hallContact?.uid)),
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
        connect: newTeams.map(team => whereN(team.uid)),
        disconnect: disconnectTeams.map(team => whereN(team.uid))
      }
    ],
    locations: [
      {
        connect: newLocations.map(location => whereN(location.uid)),
        disconnect: disconnectLocations.map(location => whereN(location.uid))
      }
    ]
  }
})
