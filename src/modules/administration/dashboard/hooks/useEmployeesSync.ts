import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import type { AxiosError } from '@/types/http'
import { queryMutate } from '@/utils/fetcher'
import { createMessageValues } from '@/utils/formatters'

import type { SyncEmployeesResult } from '../types/cron.types'
import { CRON_HISTORY_QUERY_KEY } from './useCronHistory'

const labels = message.adminPage.employeesSync

const ERROR_MESSAGE_BY_STATUS: Record<number, string> = {
    409: labels.alreadyRunning,
    502: labels.hrUnavailable,
}

/**
 * Triggers the HR employees sync on demand and refreshes the cron history.
 */
export const useEmployeesSync = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: queryMutate<SyncEmployeesResult, undefined>('cronSyncEmployees', 'post'),
        // a run is recorded in the history even when it fails
        onSettled: () => queryClient.invalidateQueries({ queryKey: [CRON_HISTORY_QUERY_KEY] }),
    })

    const runSync = useCallback(() => {
        const promise = mutateAsync(undefined)

        toast.promise(promise, {
            loading: fm({ id: labels.running }),
            success: response => fm({ id: labels.success }, createMessageValues(response.data)),
            error: (error: AxiosError) =>
                fm({ id: ERROR_MESSAGE_BY_STATUS[error?.response?.status ?? 0] ?? labels.failed }),
        })

        return promise.catch(() => undefined)
    }, [fm, mutateAsync])

    return { runSync, isPending }
}
