import type { RoomCardStatus } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

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

export const getOperationalStateLabel = (
  state?: CodebookType | null
): string => {
  // Return name directly from codebook if available
  if (state?.name) return state.name
  return 'Unknown State'
}

/**
 * Get operational state dot color (for small indicator)
 * Uses code from codebook to determine color
 */
export const getOperationalStateDotColor = (
  state?: CodebookType | null
): string => {
  if (!state?.code) return 'bg-gray-400 dark:bg-gray-500'

  switch (state.code) {
    case 'OS1':
      return 'bg-green-700 dark:bg-green-700'
    case 'OS2':
      return 'bg-green-500 dark:bg-green-500'
    case 'OS3':
      return 'bg-yellow-500 dark:bg-yellow-500'
    case 'OS4':
      return 'bg-orange-500 dark:bg-orange-400'
    case 'OS5':
      return 'bg-red-400 dark:bg-red-400'
    case 'OS6':
      return 'bg-red-700 dark:bg-red-700'
    default:
      return 'bg-gray-400 dark:bg-gray-500'
  }
}
