import { SystemLevel } from '@/types/gql/graphql'

export const getColorBySystemLevel = (level?: SystemLevel) => {
  switch (level) {
    case SystemLevel.KeySystems:
      return 'bg-primary-100 dark:bg-primary-400'
    case SystemLevel.SubsystemsAndParts:
      return 'bg-sky-100 dark:bg-sky-700 dark:text-gray-200'
    case SystemLevel.TechnologyUnit:
      return 'bg-lime-100 dark:bg-lime-700'
    default:
      return ''
  }
}

export const getFontBySystemLevel = (level?: SystemLevel) => {
  switch (level) {
    case SystemLevel.KeySystems:
      return 'font-medium dark:text-gray-200'
    case SystemLevel.TechnologyUnit:
      return 'font-light dark:text-gray-200'
    default:
      return ''
  }
}
