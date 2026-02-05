import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import { queryMutate } from '@/utils/fetcher'

import type { ServiceLine } from '../types/form'
import { useDeliveryHandler } from './useDeliveryHandler'
import useOrderDetail from './useOrderDetail'

export const useServiceDeliveryAll = (setServiceLine: (line: ServiceLine) => void) => {
    const { uid, refetch, queryKey } = useOrderDetail()
    const { control } = useFormContext()
    const { handleSuccessfulDelivery } = useDeliveryHandler()
    const queryClient = useQueryClient()

    const serviceLines = useWatch({ control, name: 'serviceLines' })

    const { mutate, isPending } = useMutation({
        mutationFn: queryMutate<ServiceLine[], string[]>('serviceLinesDeliverAll', 'put', uid),
        onError: (e: AxiosError) => {
            if (e.response?.status === 409) {
                toast.error(
                    'Order was updated by another user. Please refresh the page. And try again.',
                )
            } else {
                toast.error(e.message)
            }
        },
    })

    const onSuccess = (data: AxiosResponse<ServiceLine[]>) => {
        handleSuccessfulDelivery(data.data, { setOrderLine: setServiceLine, refetch })
        queryClient.invalidateQueries({ queryKey })
        queryClient.invalidateQueries({ queryKey: ['orders'] })
        toast.success('Services all delivered successfully')
    }

    const handleDelivery = () => {
        if (serviceLines?.some((line: ServiceLine) => !line.isDelivered)) {
            const uidsToDeliver = (serviceLines as ServiceLine[])
                ?.filter(line => !line.isDelivered && line.uid)
                .map(line => line.uid)
                .filter((uid): uid is string => uid !== undefined)

            if (uidsToDeliver.length > 0) {
                mutate(uidsToDeliver, { onSuccess })
            }
        }
    }

    return { handleDelivery, isPending }
}
