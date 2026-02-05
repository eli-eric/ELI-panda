import type { RoomCardStatus } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

export const cleanRooms = [
    {
        name: 'PURITY CLASS',
        code: 'purityClass',
    },
    {
        name: 'PRESCRIBED CLOTHING',
        code: 'prescribedClothing',
    },
    {
        name: 'ENTRY TO HVAC TENT',
        code: 'entryToHvacTent',
    },
    {
        name: 'ADDITIONAL REQUIREMENTS',
        code: 'additionalRequirements',
    },
    {
        name: 'CLEANING SCHEDULE',
        code: 'cleaningSchedule',
    },
]

export const possibleParameters = [
    {
        name: 'COOLING WATER',
        code: 'coolingWater',
    },
    {
        name: 'INDOOR ENVIRONMENT QUALITY',
        code: 'indoorEnvironmentQuality',
    },
    {
        name: 'COMPRESSED AIR DISTRIBUTION',
        code: 'compressedAirDistribution',
    },
    {
        name: 'NITROGEN CENTRAL DISTRIBUTION',
        code: 'nitrogenCentralDistribution',
    },
    {
        name: 'MAX. PRESSURE IN COLD DISTRIBUTION',
        code: 'maxPressureInColdDistribution',
    },
]
export const clientRequirements = [
    {
        name: 'PRESSURE IN COOLING SYSTEM',
        code: 'pressureInCoolingSystem',
    },
    {
        name: 'ROOM TEMPERATURE',
        code: 'roomTemperature',
    },
    {
        name: 'HUMIDITY',
        code: 'humidity',
    },
]

export const statusColorMapping = (status: RoomCardStatus) => [
    status === 'DIRTY_MODE' && 'bg-red-200 dark:bg-red-500',
    status === 'CLEAN_MODE' && 'bg-lime-200 dark:bg-lime-600',
    status === 'IN_PREPARATION_MODE' && 'bg-orange-300 dark:bg-orange-600',
]

export const operationalStateColorMapping = (state?: CodebookType | null) => {
    if (!state?.code) return 'bg-gray-200 dark:bg-gray-600'
    return [
        state.code === 'IN_OPERATION' && 'bg-green-200 dark:bg-green-500',
        state.code === 'OVERNIGHT_STANDBY' && 'bg-blue-200 dark:bg-blue-500',
        state.code === 'EXPERIMENTAL_TECHNOLOGY_STANDBY' && 'bg-yellow-200 dark:bg-yellow-500',
        state.code === 'EXPERIMENTAL_TECHNOLOGY_SAFE_STATE' && 'bg-orange-200 dark:bg-orange-500',
        state.code === 'ALL_TECHNOLOGY_SHUTDOWN' && 'bg-red-300 dark:bg-red-600',
        state.code === 'POWER_SHUTDOWN' && 'bg-gray-400 dark:bg-gray-700',
    ]
}
