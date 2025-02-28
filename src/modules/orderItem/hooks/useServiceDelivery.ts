import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

import { queryMutate } from '@/utils/fetcher'

import type { OrderLineFormType, ServiceLine } from '../types/form'
import { useServiceLine } from './useServiceLine'

export const useServiceLineDeliver = (serviceLine: ServiceLine) => {
  const { setServiceLine } = useServiceLine()

  const uid = useRouter().query.uid as string

  const onSuccess = (data: AxiosResponse<OrderLineFormType>) => {
    setServiceLine({
      ...serviceLine,
      isDelivered: data.data?.isDelivered
    })
    toast.success('Service delivered successfully')
  }

  return useMutation({
    mutationFn: queryMutate<OrderLineFormType, { isDelivered: boolean }>(
      'serviceLineDelivery',
      'put',
      uid,
      undefined,
      { itemUid: serviceLine?.uid || '' }
    ),
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
