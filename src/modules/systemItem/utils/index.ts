import { SystemLevel } from '@/types/gql/graphql'

export const getColorBySystemLevel = (level?: SystemLevel) => {
  switch (level) {
    case SystemLevel.KeySystems:
      return 'bg-primary-100'
    case SystemLevel.SubsystemsAndParts:
      return 'bg-sky-100'
    case SystemLevel.TechnologyUnit:
      return 'bg-lime-100'
    default:
      return ''
  }
}

export const getFontBySystemLevel = (level?: SystemLevel) => {
  switch (level) {
    case SystemLevel.KeySystems:
      return 'font-medium'
    case SystemLevel.TechnologyUnit:
      return 'font-light'
    default:
      return ''
  }
}
