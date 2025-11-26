import { SystemLevel } from '@/types/gql/graphql'

export const getColorBySystemLevel = (level?: SystemLevel) => {
  switch (level) {
    case SystemLevel.KeySystems:
      return 'border-orange-600 dark:border-orange-300 backend border-1'
    case SystemLevel.SubsystemsAndParts:
      return 'border-sky-600 dark:border-sky-300 backend border-1'
    case SystemLevel.TechnologyUnit:
      return 'border-lime-600 dark:border-lime-300 backend border-1'
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
    case SystemLevel.Trash:
      return 'border-red-600 bg-red-50 text-red-700 dark:border-red-300 dark:bg-red-950 dark:text-red-300'
    default:
      return 'border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
  }
}

export const formatParentPath = (
  parentPath?:
    | Array<
        | { name?: string | null | undefined; uid?: string | null | undefined }
        | null
        | undefined
      >
    | null
    | undefined,
  currentName?: string
): string => {
  const path = parentPath ? [...parentPath].reverse() : []
  const names = currentName ? [...path, { name: currentName }] : path

  return names
    .filter(
      (v): v is { name: string; uid?: string | null | undefined } =>
        v != null && v.name != null && typeof v.name === 'string'
    )
    .map(v => v.name)
    .join(' > ')
}
