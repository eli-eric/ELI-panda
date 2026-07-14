import type { QueryClient } from '@tanstack/react-query'
import type { IntlShape } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'

import { ensureSystemCanEdit } from '../hooks/useSystemCanEdit'
import { formatResponsibleName } from '../hooks/useSystemEditPermission'

/**
 * Imperative per-system edit gate. Reads the (cached) can-edit result and, when
 * the user isn't permitted, fires a toast naming the responsibles and returns
 * false. Used by mutation hooks and check-on-click action guards so an
 * unpermitted GraphQL patch can never reach the server.
 *
 * Returns true when permitted, false when blocked (or on verification failure —
 * fail closed). Callers should abort the mutation when this returns false.
 */
export const guardSystemEdit = async (
    queryClient: QueryClient,
    uid: string,
    fm: IntlShape['formatMessage'],
): Promise<boolean> => {
    try {
        const { result, responsibles } = await ensureSystemCanEdit(queryClient, uid)
        if (result) return true

        const names = responsibles.map(formatResponsibleName).filter(Boolean).join(', ')
        toast.error(
            names
                ? fm({ id: message.systemPermission.blockedToast }, { names })
                : fm({ id: message.systemPermission.blockedToastNoResponsibles }),
        )
        return false
    } catch {
        // Fail closed: if we can't verify permission, don't let the mutation through.
        toast.error(fm({ id: message.systemPermission.errorTitle }))
        return false
    }
}
