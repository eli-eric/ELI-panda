import type { CodebookType } from '@/hooks/fetch/useCodebook'
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
  contactPersonsHall: ContactPersonsHall[]
  contactPersonsDept: EmployeeType[]
  location: CodebookType
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
  pressureInCoolingSystem: string
  roomTemperature: string
  humidity: string
}
