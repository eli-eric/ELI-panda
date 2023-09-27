export type Query = {
  locations: Location[]
  roomCards: RoomCard[]
}

export type Location = {
  code: String
  facility: String
  name: String
  roomCard: RoomCard
}

export enum RoomCardStatus {
  DIRTY_MODE,
  CLEAN_MODE,
  IN_PREPARATION_MODE
}

export type RoomCard = {
  uid: String
  status: RoomCardStatus
  contactPersons: Employee[]
  location: Location
  team: Team[]
  purityClass?: String
  prescribedClothing?: String
  entryToHvacTent?: String
  cleaningShedule?: String
  additionalRequirements?: String
  coolingWater?: String
  indoorEnvironmentQueality?: String
  copressedAirDistribution?: String
  nitrogenCentralDistribution?: String
  maxPressureInColdDistribution?: String
  pressureInCoolingSystem?: String
  roomTemperature?: String
  humidity?: String
}

export type Team = {
  uid: String
  name: String
  teamMembers: Employee[]
}

export type Employee = {
  uid: String
  team?: Team
  firstName: String
  lastName: String
  phoneNumber?: String
  email?: String
  role?: String
}
