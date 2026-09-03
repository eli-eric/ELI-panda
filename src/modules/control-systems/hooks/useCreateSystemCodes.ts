import { useMutation } from '@tanstack/react-query'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import { queryMutate } from '@/utils/fetcher'

import type { SystemCodeRequest, SystemCodeResult } from '../types'
import { useSystemCodesErrorMessage } from './useSystemCodesErrorMessage'

export const useCreateSystemCodes = () => {
    const { formatMessage: fm } = useIntl()
    const getErrorMessage = useSystemCodesErrorMessage()

    const createMutation = useMutation({
        mutationFn: queryMutate<SystemCodeResult[], SystemCodeRequest>('systemCodesCreate', 'post'),
    })

    const create = async (data: SystemCodeRequest) => {
        const promise = createMutation.mutateAsync(data)
        toast.promise(promise, {
            loading: fm({ id: message.controlSystems.toast.creating }),
            success: fm({ id: message.controlSystems.toast.created }),
            error: err => getErrorMessage(err),
        })
        return promise
    }

    return {
        create,
        isPending: createMutation.isPending,
    }
}
