import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { PhysicalItemPatchFields, SystemDetail } from '../../types'
import { useSystemScopedWrite } from './useSystemScopedWrite'

/**
 * PATCH /system/:uid/physical-item — the item contained in the system. Uses the
 * SYSTEM concurrency token and mutation scope, and is audited on the System node,
 * so item edits show up in the system's history like any other field.
 */
export const usePhysicalItemPatch = (systemUid: string) => {
    const { formatMessage: fm } = useIntl()
    const { write, isPending } = useSystemScopedWrite<PhysicalItemPatchFields>(
        systemUid,
        'systemPhysicalItem',
        'patch',
    )

    const patchPhysicalItem = useCallback(
        (fields: PhysicalItemPatchFields): Promise<SystemDetail> =>
            write(fields, Object.keys(fields), {
                loading: fm({ id: message.systemHierarchy.toast.saving }),
                success: fm({ id: message.systemHierarchy.toast.saved }),
            }),
        [fm, write],
    )

    return { patchPhysicalItem, isPending }
}
