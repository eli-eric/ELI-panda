import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { Employee, Location, RoomCard, RoomCardUpdateInput, RoomCardWhere, Team } from '@/types/gql/graphql'
import { whereN } from '@/utils/graphql/mutations'

import type { HallContactPerson } from '../store/useRoomCardStore'

export const updateLocationWithSublocation = (locations: Codebooktree[], subLocations: Location[], uid) =>
  locations.map(location => {
    if (location.uid === uid) {
      return {
        ...location,
        children: subLocations.map(subLocation => ({
          name: subLocation.name,
          uid: subLocation.uid,
          isExpandable: subLocation.subLocations.length > 0
        }))
      }
    }
    if (location.children) {
      return {
        ...location,
        children: updateLocationWithSublocation(location.children, subLocations, uid)
      }
    }
    return location
  })

type RoomCardUpdateType = {
  roomCard: RoomCard
  newHallContacts: HallContactPerson[]
  deleteHallContacts: HallContactPerson[]
  newTeams: Team[]
  disconnectTeams: Team[]
  newDeptContacts: Employee[]
  disconnectDeptContacts: Employee[]
}
export const updateRoomCardVariables = ({
  roomCard,
  newDeptContacts,
  disconnectDeptContacts,
  newHallContacts,
  deleteHallContacts,
  newTeams,
  disconnectTeams
}: RoomCardUpdateType): { where: RoomCardWhere; update: RoomCardUpdateInput } => ({
  where: {
    uid: roomCard.uid
  },
  update: {
    additionalRequirements: roomCard.additionalRequirements,
    cleaningSchedule: roomCard.cleaningSchedule,
    compressedAirDistribution: roomCard.compressedAirDistribution,
    coolingWater: roomCard.coolingWater,
    entryToHvacTent: roomCard.entryToHvacTent,
    humidity: roomCard.humidity,
    indoorEnvironmentQuality: roomCard.indoorEnvironmentQuality,
    maxPressureInColdDistribution: roomCard.maxPressureInColdDistribution,
    nitrogenCentralDistribution: roomCard.nitrogenCentralDistribution,
    prescribedClothing: roomCard.prescribedClothing,
    pressureInCoolingSystem: roomCard.pressureInCoolingSystem,
    purityClass: roomCard.purityClass,
    roomTemperature: roomCard.roomTemperature,
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
    ]
  }
})
