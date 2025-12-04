import type { OperationalState, RoomCardStatus } from '@/types/gql/graphql'

/**
 * Get status badge color classes (for Badge component background)
 * Uses original color palette from statusColorMapping
 */
export const getStatusBadgeColor = (status: RoomCardStatus): string => {
  switch (status) {
    case 'DIRTY_MODE':
      return 'bg-red-200 hover:bg-red-300 dark:bg-red-500 dark:hover:bg-red-600'
    case 'CLEAN_MODE':
      return 'bg-lime-200 hover:bg-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700'
    case 'IN_PREPARATION_MODE':
      return 'bg-orange-300 hover:bg-orange-400 dark:bg-orange-600 dark:hover:bg-orange-700'
    default:
      return 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700'
  }
}

/**
 * Get status label text (formatted for display)
 */
export const getStatusLabel = (status: RoomCardStatus): string => {
  switch (status) {
    case 'DIRTY_MODE':
      return 'Dirty Mode'
    case 'CLEAN_MODE':
      return 'Clean Mode'
    case 'IN_PREPARATION_MODE':
      return 'In Preparation'
    default:
      return status
  }
}

/**
 * Get operational state dot color (for small indicator)
 */
export const getOperationalStateDotColor = (
  state?: OperationalState | null
): string => {
  if (!state) return 'bg-gray-400 dark:bg-gray-500'

  switch (state) {
    case 'IN_OPERATION':
      return 'bg-green-500 dark:bg-green-400'
    case 'OVERNIGHT_STANDBY':
      return 'bg-blue-500 dark:bg-blue-400'
    case 'EXPERIMENTAL_TECHNOLOGY_STANDBY':
      return 'bg-yellow-500 dark:bg-yellow-400'
    case 'EXPERIMENTAL_TECHNOLOGY_SAFE_STATE':
      return 'bg-orange-500 dark:bg-orange-400'
    case 'ALL_TECHNOLOGY_SHUTDOWN':
      return 'bg-red-500 dark:bg-red-400'
    case 'POWER_SHUTDOWN':
      return 'bg-gray-600 dark:bg-gray-500'
    default:
      return 'bg-gray-400 dark:bg-gray-500'
  }
}
