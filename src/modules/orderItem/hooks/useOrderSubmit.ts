import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import { PATH } from '@/types/constants/paths'
import { queryMutate } from '@/utils/fetcher'

import type { OrderDetailFormType } from '../types/form'
import useOrderDetail from './useOrderDetail'

export const useOrderSubmit = (formReset: (t: any) => void) => {
  const router = useRouter()
  const { uid, queryKey } = useOrderDetail()

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
    async (data: AxiosResponse<OrderDetailFormType, any>) => {
      const orderDetail = data.data

      // Příprava dat pro reset formu s uuid
      const resetData = {
        ...orderDetail,
        orderLines:
          orderDetail?.orderLines &&
          orderDetail?.orderLines.map(orderLine => ({
            ...orderLine,
            uuid: orderLine.uid
          })),
        serviceLines:
          orderDetail?.serviceLines &&
          orderDetail?.serviceLines.map(serviceLine => ({
            ...serviceLine,
            uuid: serviceLine.uid
          })),
        orderDate: orderDetail?.orderDate,
        orderStatus: orderDetail?.orderStatus || {
          uid: 'c5ef9d00-ac38-44c1-b48a-fde0d7095c54',
          name: 'Requested'
        }
      }

      formReset(resetData)

      // Okamžitá aktualizace cache detailu objednávky
      queryClient.setQueryData(queryKey, orderDetail)

      // Invalidovat všechny relevantní queries (awaitat pro zajištění dokončení)
      await Promise.all([
        queryClient.invalidateQueries({ queryKey }),
        queryClient.invalidateQueries({ queryKey: ['orders'] })
      ])

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
