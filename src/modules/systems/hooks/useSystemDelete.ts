import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { useRecalculate } from '@/modules/systemItem/hooks/useRecalculate'
import type { AxiosError } from '@/types/http'
import type { SystemDetail, SystemsResponse } from '@/types/responses/systems'
import { queryMutate } from '@/utils/fetcher'
import { createMessageValues } from '@/utils/formatters'
import type { EndpointProps } from '@/utils/getEndpoints'

import { filterSubsystem } from '../utils'
const messages = message.systemsPage.systemDetail.deleteModal

type Props = {
    system: SystemDetail
    queryKey?: [string, EndpointProps]
}

export const useSystemDelete = ({ system, queryKey }: Props) => {
    const queryClient = useQueryClient()
    const { formatMessage: fm } = useIntl()

    const withWarningModal = useWarningModal(
        fm({ id: messages.message }, createMessageValues({ name: system.name })),
    )

    const onRecalculateFinish = () => {
        if (queryKey) {
            queryClient.setQueryData<SystemsResponse>(queryKey, prev => {
                if (prev) {
                    return filterSubsystem(system.uid, prev)
                }
                return prev
            })
        }
        toast.success(fm({ id: messages.onSuccess }, createMessageValues({ name: system.name })))
    }

    const [recalculate, isRecalculating] = useRecalculate({
        onSuccess: onRecalculateFinish,
    })

    const { mutate, isPending } = useMutation<unknown, AxiosError>({
        mutationFn: queryMutate('system', 'delete', system.uid),
        onSuccess: () => {
            recalculate(null)
        },
        onError: error => {
            if (error.response?.status === 409) {
                toast.error(
                    fm({ id: messages.onConflict }, createMessageValues({ name: system.name })),
                )
            } else {
                toast.error(
                    fm({ id: messages.onError }, createMessageValues({ name: system.name })),
                )
            }
        },
    })

    return {
        deleteSystem: withWarningModal(mutate),
        isPending: isPending || isRecalculating,
    }
}
