import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import { queryMutate } from '@/utils/fetcher'

import type { OrderLineFormType } from '../types/form'
import { useDeliveryHandler } from './useDeliveryHandler'
import useOrderDetail from './useOrderDetail'

export const useDeliverAll = () => {
  const { uid, refetch } = useOrderDetail()
  const { control } = useFormContext()
  const { handleSuccessfulDelivery } = useDeliveryHandler()

  const orderLines = useWatch({ control, name: 'orderLines' })

  const { update, fields } = useFieldArray({
    control,
    name: 'orderLines'
  })

  const { mutate, isPending } = useMutation({
    mutationFn: queryMutate<OrderLineFormType[], string[]>(
      'orderLinesDeliverAll',
      'put',
      uid
    ),
    onError: (e: AxiosError) => {
      if (e.response?.status === 409) {
        toast.error(
          'Order was updated by another user. Please refresh the page. And try again.'
        )
      } else {
        toast.error(e.message)
      }
    }
  })

  const onSuccess = (data: AxiosResponse<OrderLineFormType[]>) => {
    handleSuccessfulDelivery(data.data, { fields, update, refetch })
    toast.success('Order all delivered successfully')
  }

  const handleDelivery = () => {
    if (
      orderLines?.some((orderLine: OrderLineFormType) => !orderLine.isDelivered)
    ) {
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
