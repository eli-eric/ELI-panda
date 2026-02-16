// Re-export shared system level utilities from @/utils
export {
    getBadgeVariantBySystemLevel,
    getBorderBySystemLevel,
    getColorBySystemLevel,
    getFontBySystemLevel,
} from '@/utils/systemLevel'

export const formatParentPath = (
    parentPath?:
        | Array<
              | { name?: string | null | undefined; uid?: string | null | undefined }
              | null
              | undefined
          >
        | null
        | undefined,
    currentName?: string,
): string => {
    const path = parentPath || []
    const names = currentName ? [...path, { name: currentName }] : path

    return names
        .filter(
            (v): v is { name: string; uid?: string | null | undefined } =>
                v != null && v.name != null && typeof v.name === 'string',
        )
        .map(v => v.name)
        .join(' > ')
}
