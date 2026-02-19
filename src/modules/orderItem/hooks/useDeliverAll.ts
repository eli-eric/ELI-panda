import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import type { AxiosError, AxiosResponse } from '@/types/http'
import { queryMutate } from '@/utils/fetcher'

import type { OrderLineFormType } from '../types/form'
import { useDeliveryHandler } from './useDeliveryHandler'
import useOrderDetail from './useOrderDetail'

export const useDeliverAll = (setOrderLine: (line: OrderLineFormType) => void) => {
    const { uid, refetch, queryKey } = useOrderDetail()
    const { control } = useFormContext()
    const { handleSuccessfulDelivery } = useDeliveryHandler()
    const queryClient = useQueryClient()

    const orderLines = useWatch({ control, name: 'orderLines' })

    const { mutate, isPending } = useMutation({
        mutationFn: queryMutate<OrderLineFormType[], string[]>('orderLinesDeliverAll', 'put', uid),
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

    const onSuccess = (data: AxiosResponse<OrderLineFormType[]>) => {
        handleSuccessfulDelivery(data.data, { setOrderLine, refetch })
        queryClient.invalidateQueries({ queryKey })
        queryClient.invalidateQueries({ queryKey: ['orders'] })
        toast.success('Order all delivered successfully')
    }

    const handleDelivery = () => {
        if (orderLines?.some((orderLine: OrderLineFormType) => !orderLine.isDelivered)) {
            const uidsToDeliver = (orderLines as OrderLineFormType[])
                ?.filter(orderLine => !orderLine.isDelivered && orderLine.uid)
                .map(orderLine => orderLine.uid)
                .filter((uid): uid is string => uid !== undefined)

            if (uidsToDeliver.length > 0) {
                mutate(uidsToDeliver, { onSuccess })
            }
        }
    }

    return { handleDelivery, isPending }
}
