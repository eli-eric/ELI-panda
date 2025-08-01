import { SystemLevel } from '@/types/gql/graphql'

export const getColorBySystemLevel = (level?: SystemLevel, index?: number) => {
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
  console.log('getFontBySystemLevel', level)
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
