import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import { useOrders } from '@/modules/orders/hooks/useOrders'
import { PATH } from '@/types/constants/paths'
import { queryMutate } from '@/utils/fetcher'

import type { OrderDetailFormType } from '../types/form'
import useOrderDetail from './useOrderDetail'

export const useOrderSubmit = (formReset: (t: any) => void) => {
  const router = useRouter()
  const { uid, queryKey } = useOrderDetail()
  const { mutate: refetchOrders } = useOrders()

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: queryMutate<OrderDetailFormType, OrderDetailFormType>(
      'order',
      uid ? 'put' : 'post',
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

  const handleOnSuccess =
    (saveAndExit: boolean) =>
    (data: AxiosResponse<OrderDetailFormType, any>) => {
      const orderDetail = data.data
      formReset({
        ...orderDetail,
        orderLines:
          orderDetail?.orderLines &&
          orderDetail?.orderLines.map(orderLine => ({
            ...orderLine,
            uuid: orderLine.uid
          })),
        orderDate: orderDetail?.orderDate,
        orderStatus: orderDetail?.orderStatus || {
          uid: 'c5ef9d00-ac38-44c1-b48a-fde0d7095c54',
          name: 'Requested'
        }
      })
      queryClient.invalidateQueries({ queryKey })

      refetchOrders()
      if (saveAndExit) {
        router.push(PATH.ORDERS)
      } else {
        if (!uid) {
          router.push(PATH.ORDER + '/' + orderDetail.uid)
        }
        toast.success(`Order was successfully saved.`)
      }
    }

  const submit = (data: OrderDetailFormType, saveAndExit: boolean) => {
    mutate(data, {
      onSuccess: handleOnSuccess(saveAndExit)
    })
  }

  return { loading: isPending, submit }
}
