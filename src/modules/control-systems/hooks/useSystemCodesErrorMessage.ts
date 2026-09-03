import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { getErrorMessageText, isBadRequestError } from '@/types/http'

import type { SystemCodesErrorKind } from '../utils/systemCodesErrors'
import { getSystemCodesErrorKind, SYSTEM_CODES_ERROR } from '../utils/systemCodesErrors'

const errors = message.controlSystems.errors

const ERROR_MESSAGE_IDS: Record<SystemCodesErrorKind, string> = {
    [SYSTEM_CODES_ERROR.MISSING_DEFAULT_PARENT_SYSTEM]: errors.missingDefaultParentSystem,
    [SYSTEM_CODES_ERROR.ZONE_NOT_FOUND]: errors.zoneNotFound,
    [SYSTEM_CODES_ERROR.SYSTEM_TYPE_NOT_FOUND]: errors.systemTypeNotFound,
    [SYSTEM_CODES_ERROR.INVALID_BATCH]: errors.invalidBatch,
    [SYSTEM_CODES_ERROR.NO_SYSTEM_CODE_MASK]: errors.noSystemCodeMask,
}

/**
 * Turns a system-codes API error into a message worth showing a user. Recognised 400s
 * get a translated explanation; unrecognised ones fall back to the backend's own text,
 * which beats a generic failure string.
 */
export const useSystemCodesErrorMessage = () => {
    const { formatMessage: fm } = useIntl()

    return useCallback(
        (error: unknown): string => {
            const kind = getSystemCodesErrorKind(error)
            if (kind) return fm({ id: ERROR_MESSAGE_IDS[kind] })

            if (isBadRequestError(error)) {
                const raw = getErrorMessageText(error)
                if (raw) return raw
            }

            return fm({ id: message.controlSystems.toast.failedToCreate })
        },
        [fm],
    )
}
