import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { SystemDetail, SystemPatchFields } from '../../types'
import { useSystemScopedWrite } from './useSystemScopedWrite'

const toastMessages = message.systemHierarchy.toast

/**
 * PATCH /system/:uid — partial update (absent key = unchanged, null = clear).
 * The server diffs, audits (WAS_UPDATED_BY) and returns the fresh detail.
 * Rejects with SystemEditCancelledError when the user declines the soft-lock prompt.
 */
export const useSystemPatch = (uid: string) => {
    const { formatMessage: fm } = useIntl()
    const { write, isPending } = useSystemScopedWrite<SystemPatchFields>(
        uid,
        'systemDetail',
        'patch',
    )

    const patchSystem = useCallback(
        (fields: SystemPatchFields): Promise<SystemDetail> => {
            const isCodeChange = 'systemCode' in fields
            const releasesCode = isCodeChange && !fields.systemCode
            const messages = releasesCode
                ? {
                      loading: fm({ id: toastMessages.releasingCode }),
                      success: fm({ id: toastMessages.codeReleased }),
                  }
                : {
                      loading: fm({ id: toastMessages.saving }),
                      success: fm({ id: toastMessages.saved }),
                  }
            return write(fields, Object.keys(fields), {
                ...messages,
                systemCode: isCodeChange ? fields.systemCode : undefined,
            })
        },
        [fm, write],
    )

    return { patchSystem, isPending }
}
