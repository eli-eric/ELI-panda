import { SystemLevel } from '@/types/gql/graphql'

export const getColorBySystemLevel = (level?: SystemLevel, index?: number) => {
  switch (level) {
    default:
      return ''
  }
}

export const getBorderBySystemLevel = (level?: SystemLevel) => {
  switch (level) {
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
