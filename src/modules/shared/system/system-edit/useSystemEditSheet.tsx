import { lazy, useCallback } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

const SystemEditContainer = lazy(() =>
    import('./system-edit.cont').then(module => ({
        default: module.SystemEditContainer,
    })),
)

export const getSystemEditSheetId = (uid: string) => `system-edit-${uid}`

/**
 * Opens the Edit System sheet for a system. Every field saves on its own (inline
 * PATCH), so there is no form state and no unsaved-changes guard on close.
 */
export const useSystemEditSheet = () => {
    const { formatMessage: fm } = useIntl()
    const { openModal } = useDynamicModalStore()

    return useCallback(
        (uid?: string | null) => {
            if (!uid) return undefined
            return openModal('sheet', {
                id: getSystemEditSheetId(uid),
                component: SystemEditContainer,
                props: { uid, size: 'xl', title: fm({ id: message.systemHierarchy.sheet.title }) },
            })
        },
        [fm, openModal],
    )
}
