import type { PreviewParams } from '../hooks/useSystemCodesPreview'

interface Selection {
    zoneUid?: string
    systemTypeUid?: string
    batch: number
}

/**
 * The previewed params are the only record of what the backend actually validated, so the
 * form checks the current selection against them rather than against its own debounced
 * copies. That covers the ~500ms debounce window, an emptied field, and the moment after
 * a create — when the previewed codes are already taken and the preview is refetching.
 */
export const isPreviewCurrent = (
    previewed: PreviewParams | null | undefined,
    selection: Selection,
): boolean =>
    !!previewed &&
    previewed.zoneUid === selection.zoneUid &&
    previewed.systemTypeUid === selection.systemTypeUid &&
    previewed.batch === selection.batch
