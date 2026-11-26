import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { SystemDetail } from '../../types'
import { useSystemScopedWrite } from './useSystemScopedWrite'

/**
 * POST /system/:uid/system-code — the server generates the code from the system's
 * current type / zone / location / parent and saves it in one step (no
 * generate-then-save race). Releasing a code is a PATCH `systemCode: null`.
 */
export const useGenerateSystemCode = (uid: string) => {
    const { formatMessage: fm } = useIntl()
    const { write, isPending } = useSystemScopedWrite<Record<string, never>>(
        uid,
        'systemCodeSave',
        'post',
    )

    const generateCode = useCallback(
        (): Promise<SystemDetail> =>
            write({}, ['systemCode'], {
                loading: fm({ id: message.systemHierarchy.toast.generatingCode }),
                success: fm({ id: message.systemHierarchy.toast.codeGenerated }),
            }),
        [fm, write],
    )

    return { generateCode, isGenerating: isPending }
}
