import type { RoomCardStatus } from '@/types/gql/graphql'

export const cleanRooms = [
  {
    name: 'PURITY CLASS',
    code: 'purityClass'
  },
  {
    name: 'PRESCRIBED CLOTHING',
    code: 'prescribedClothing'
  },
  {
    name: 'ENTRY TO HVAC TENT',
    code: 'entryToHvacTent'
  },
  {
    name: 'ADDITIONAL REQUIREMENTS',
    code: 'additionalRequirements'
  },
  {
    name: 'CLEANING SCHEDULE',
    code: 'cleaningSchedule'
  }
]

export const possibleParameters = [
  {
    name: 'COOLING WATER',
    code: 'coolingWater'
  },
  {
    name: 'INDOOR ENVIRONMENT QUALITY',
    code: 'indoorEnvironmentQuality'
  },
  {
    name: 'COMPRESSED AIR DISTRIBUTION',
    code: 'compressedAirDistribution'
  },
  {
    name: 'NITROGEN CENTRAL DISTRIBUTION',
    code: 'nitrogenCentralDistribution'
  },
  {
    name: 'MAX. PRESSURE IN COLD DISTRIBUTION',
    code: 'maxPressureInColdDistribution'
  }
]
export const clientRequirements = [
  {
    name: 'PRESSURE IN COOLING SYSTEM',
    code: 'pressureInCoolingSystem'
  },
  {
    name: 'ROOM TEMPERATURE',
    code: 'roomTemperature'
  },
  {
    name: 'HUMIDITY',
    code: 'humidity'
  }
]

export const statusColorMapping = (status: RoomCardStatus) => [
  status === 'DIRTY_MODE' && 'bg-red-200 dark:bg-red-500',
  status === 'CLEAN_MODE' && 'bg-lime-200 dark:bg-lime-600',
  status === 'IN_PREPARATION_MODE' && 'bg-primary-300 dark:bg-primary-600'
]
