import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { CleaningScheduleDay, ContactPersonRole, RoomCardStatus, Team } from '@/types/gql/graphql'

export type EmployeeType = {
  uid: string
  fullName: string
  phoneNumber: string
}

export type ContactPersonsHall = {
  employee: EmployeeType
  role: ContactPersonRole
  uid: string
}

export type RoomCardFormType = {
  status: RoomCardStatus
  name: string
  contactPersonsHall: ContactPersonsHall[]
  contactPersonsDept: EmployeeType[]
  locations: Codebooktree[]
  teams: Team[]
  purityClass: string
  prescribedClothing: string
  entryToHvacTent: string
  cleaningScheduleDate: string
  cleaningScheduleDays?: CleaningScheduleDay[]
  additionalRequirements: string
  coolingWater: string
  indoorEnvironmentQuality: string
  compressedAirDistribution: string
  nitrogenCentralDistribution: string
  maxPressureInColdDistribution: string
  coolingWaterClient: string
  indoorEnvironmentQualityClient: string
  compressedAirDistributionClient: string
  nitrogenCentralDistributionClient: string
  maxPressureInColdDistributionClient: string
}
