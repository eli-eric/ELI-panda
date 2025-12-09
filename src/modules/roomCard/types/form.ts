import type {
  CleaningScheduleDay,
  ContactPersonRole,
  PrescribedClothing,
  PurityClass,
  RoomCardStatus
} from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

export type EmployeeType = {
  uid: string
  fullName: string
  phone1: string
  phone2: string
}

export type ContactPersonsHall = {
  employee: EmployeeType
  role: ContactPersonRole
  uid: string
}

export type RoomCardFormType = {
  status: RoomCardStatus
  operationalState?: CodebookType | null
  name: string
  purityClass: PurityClass
  prescribedClothing: PrescribedClothing[]
  entryToHvacTent: string
  cleaningScheduleDate?: string | null
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
