import { SystemLevel } from '@/types/gql/graphql'

export const getColorBySystemLevel = (level?: SystemLevel, index?: number) => {
  switch (level) {
    case SystemLevel.KeySystems:
      return index && index % 2 === 0
        ? 'bg-orange-50 dark:bg-orange-400/70'
        : 'bg-orange-100 dark:bg-orange-600/70'
    case SystemLevel.SubsystemsAndParts:
      return index && index % 2 === 0
        ? 'bg-sky-50 dark:bg-sky-600 dark:text-gray-200'
        : 'bg-sky-100 dark:bg-sky-700 dark:text-gray-200'
    case SystemLevel.TechnologyUnit:
      return index && index % 2 === 0
        ? 'bg-lime-50 dark:bg-lime-600'
        : 'bg-lime-100 dark:bg-lime-700'
    default:
      return ''
  }
}

export const getBorderBySystemLevel = (level?: SystemLevel) => {
  switch (level) {
    case SystemLevel.KeySystems:
      return 'border-4 border-orange-500 dark:border-orange-400'
    case SystemLevel.SubsystemsAndParts:
      return 'border-4 border-sky-500 dark:border-sky-400'
    case SystemLevel.TechnologyUnit:
      return 'border-4 border-lime-500 dark:border-lime-400'
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
