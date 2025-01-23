import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'

import { queryMutate } from '@/utils/fetcher'

import type { OrderLineFormType } from '../types/form'
import useOrderDetail from './useOrderDetail'

export const useDeliverAll = () => {
  const { uid, refetch } = useOrderDetail()

  const { setValue, control } = useFormContext()

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
    setValue('lastUpdateTime', data.data[0].lastUpdateTime)
    const updatedOrderLines = data.data.map(orderLine => {
      return {
        ...orderLine,
        isDelivered: true,
        uuid: orderLine.uid
      }
    })

    updatedOrderLines.forEach(orderLine => {
      const index = fields.findIndex(
        (field: any) => field.uuid === orderLine.uid
      )
      update(index, orderLine)
    })

    refetch()
    toast.success('Order all delivered successfully')
  }

  const handleDelivery = () => {
    if (
      orderLines?.some((orderLine: OrderLineFormType) => !orderLine.isDelivered)
    ) {
      const uidsToDeliver = (orderLines as OrderLineFormType[])
        ?.filter(orderLine => !orderLine.isDelivered && orderLine.uid)
        .map(orderLine => orderLine.uid)

      mutate(uidsToDeliver, { onSuccess })
    }
  }

  return { handleDelivery, isPending }
}
