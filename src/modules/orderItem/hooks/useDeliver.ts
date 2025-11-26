import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

import { queryMutate } from '@/utils/fetcher'

import type { OrderLineFormType } from '../types/form'
import { useOrderLine } from './useOrderLine'

export const useDeliver = (orderLine: OrderLineFormType) => {
  const { setOrderLine } = useOrderLine()
  const uid = useRouter().query.uid as string

  const onSuccess = (data: AxiosResponse<OrderLineFormType>) => {
    setOrderLine({
      ...orderLine,
      id: orderLine.id,
      isDelivered: data.data?.isDelivered,
      serialNumber: data.data?.serialNumber,
      eun: data.data?.eun
    })
    toast.success('Order delivered successfully')
  }

  return useMutation({
    mutationFn: queryMutate<
      OrderLineFormType,
      { isDelivered: boolean; eun?: string; serialNumber?: string }
    >('orderLineDelivery', 'put', uid, undefined, { itemUid: orderLine.uid! }),
    onError: (e: AxiosError) => {
      if (e.response?.status === 409) {
        toast.error(
          'Order was updated by another user. Please refresh the page. And try again.'
        )
      } else {
        toast.error(e.message)
      }
    },
    onSuccess
  })
}
