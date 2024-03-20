import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import type {
  CleaningScheduleDay,
  ContactPersonRole,
  PrescribedClothing,
  PurityClass,
  RoomCardStatus
} from '@/types/gql/graphql'

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
  teams: CodebookType[]
  purityClass: PurityClass
  prescribedClothing: PrescribedClothing[]
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
