import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import {
    confirmSystemEdit,
    SystemEditCancelledError,
} from '@/modules/shared/system/edit-permission'
import type { AxiosError } from '@/types/http'
import type { EndpointKey } from '@/utils/fetcher'
import { queryMutate } from '@/utils/fetcher'

import type { SystemDetail, WithConcurrencyToken } from '../../types'
import { refreshAfterSystemWrite } from '../../utils/refreshAfterSystemWrite'
import { isDuplicateSystemCodeConflict, isStaleConflict } from '../../utils/systemErrors'
import { getCachedSystemDetail, getSystemDetailQueryKey } from '../queries/useSystemDetail'

export interface SystemWriteMessages {
    loading: string
    success: string
    // value shown in the duplicate-code toast, when the write sets a system code
    systemCode?: string | null
}

interface SystemWriteVariables<TBody> {
    body: TBody
    changedFields: readonly string[]
}

// Every write to one system shares this scope, so TanStack runs them one after
// another — each picks up the concurrency token the previous one wrote to the cache.
export const getSystemMutationScope = (uid: string) => ({ id: `system-${uid}` })

/**
 * Shared engine for writes that return the fresh SystemDetail (PATCH system,
 * PATCH physical item, generate code). Adds the soft-lock confirmation, the
 * `lastUpdateTime` token, cache write-back and conflict-aware toasts.
 */
export const useSystemScopedWrite = <TBody extends object>(
    uid: string,
    endpoint: EndpointKey,
    method: 'patch' | 'post',
) => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation<
        SystemDetail,
        AxiosError,
        SystemWriteVariables<TBody>
    >({
        mutationKey: ['systemWrite', { uid, endpoint }],
        scope: getSystemMutationScope(uid),
        mutationFn: async ({ body }) => {
            // Read at execution time (not at call time): a queued write must carry the
            // token produced by the write that ran before it.
            // A navigation seed (dataUpdatedAt 0) has no real token — send none rather
            // than a placeholder null that would trip a spurious 409.
            const cached = getCachedSystemDetail(queryClient, uid)
            const isSeed = !queryClient.getQueryState(getSystemDetailQueryKey(uid))?.dataUpdatedAt
            const payload: WithConcurrencyToken<TBody> =
                cached && !isSeed ? { ...body, lastUpdateTime: cached.lastUpdateTime } : body
            const response = await queryMutate<SystemDetail, WithConcurrencyToken<TBody>>(
                endpoint,
                method,
                { uid },
            )(payload)
            return response.data
        },
        onSuccess: (detail, { changedFields }) =>
            refreshAfterSystemWrite(queryClient, detail, changedFields),
        onError: error => {
            // Someone else won the race — reload so the user sees what they'd overwrite.
            if (isStaleConflict(error)) {
                void queryClient.invalidateQueries({ queryKey: getSystemDetailQueryKey(uid) })
            }
        },
    })

    const resolveErrorMessage = useCallback(
        (error: unknown, systemCode?: string | null) => {
            if (isStaleConflict(error))
                return fm({ id: message.systemHierarchy.toast.staleConflict })
            if (isDuplicateSystemCodeConflict(error)) {
                return systemCode
                    ? fm({ id: message.systemHierarchy.toast.duplicateCode }, { code: systemCode })
                    : fm({ id: message.systemHierarchy.toast.duplicateCodeGeneric })
            }
            return fm({ id: message.common.errors.somethingWentWrong })
        },
        [fm],
    )

    const write = useCallback(
        async (
            body: TBody,
            changedFields: readonly string[],
            messages: SystemWriteMessages,
        ): Promise<SystemDetail> => {
            if (!(await confirmSystemEdit(queryClient, uid, fm))) {
                throw new SystemEditCancelledError()
            }
            const promise = mutateAsync({ body, changedFields })
            toast.promise(promise, {
                loading: messages.loading,
                success: messages.success,
                error: error => resolveErrorMessage(error, messages.systemCode),
            })
            return promise
        },
        [queryClient, uid, fm, mutateAsync, resolveErrorMessage],
    )

    return { write, isPending }
}
