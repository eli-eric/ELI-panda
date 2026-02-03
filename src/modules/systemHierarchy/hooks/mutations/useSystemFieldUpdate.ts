import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import { queryMutate } from '@/utils/fetcher'

import { LEAVES_QUERY_KEY, SYSTEM_DETAIL_QUERY_KEY } from '../../types/constants'

interface FieldUpdatePayload {
    [key: string]: unknown
}

export const useSystemFieldUpdate = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: ({ uid, payload }: { uid: string; payload: FieldUpdatePayload }) => {
            const mutateFn = queryMutate<unknown, FieldUpdatePayload>('system', 'put', uid)
            return mutateFn(payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [LEAVES_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [SYSTEM_DETAIL_QUERY_KEY] })
        },
    })

    const updateField = async (uid: string, fieldName: string, value: unknown) => {
        const promise = mutation.mutateAsync({ uid, payload: { [fieldName]: value } })
        toast.promise(promise, {
            loading: fm({ id: message.systemsPage.systemDetail.updateModal.onSuccess }),
            success: fm({ id: message.systemsPage.systemDetail.updateModal.onSuccess }),
            error: fm({ id: message.common.errors.somethingWentWrong }),
        })
        return promise
    }

    return {
        updateField,
        isPending: mutation.isPending,
    }
}
