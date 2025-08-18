import { SystemLevel } from '@/types/gql/graphql'

export const getColorBySystemLevel = (level?: SystemLevel, _index?: number) => {
  switch (level) {
    default:
      return ''
  }
}

export const getBorderBySystemLevel = (level?: SystemLevel) => {
  switch (level) {
    case SystemLevel.KeySystems:
      return 'border-orange-600 dark:border-orange-300 backend border-2'
    case SystemLevel.SubsystemsAndParts:
      return 'border-sky-600 dark:border-sky-300 backend border-2'
    case SystemLevel.TechnologyUnit:
      return 'border-lime-600 dark:border-lime-300 backend border-2'
    default:
      return ''
  }
}

export const getFontBySystemLevel = (level?: SystemLevel) => {
  switch (level) {
    case SystemLevel.KeySystems:
      return 'text-orange-600 dark:text-orange-300'
    case SystemLevel.SubsystemsAndParts:
      return 'text-sky-600 dark:text-sky-300 '
    case SystemLevel.TechnologyUnit:
      return 'text-lime-600 dark:text-lime-300'
    default:
      return ''
  }
}

export const getBadgeVariantBySystemLevel = (level?: SystemLevel) => {
  switch (level) {
    case SystemLevel.KeySystems:
      return 'border-orange-600 bg-orange-50 text-orange-700 dark:border-orange-300 dark:bg-orange-950 dark:text-orange-300'
    case SystemLevel.SubsystemsAndParts:
      return 'border-sky-600 bg-sky-50 text-sky-700 dark:border-sky-300 dark:bg-sky-950 dark:text-sky-300'
    case SystemLevel.TechnologyUnit:
      return 'border-lime-600 bg-lime-50 text-lime-700 dark:border-lime-300 dark:bg-lime-950 dark:text-lime-300'
    default:
      return 'border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
  }
}
