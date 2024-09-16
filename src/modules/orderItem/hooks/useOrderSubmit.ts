import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { useOrders } from '@/modules/orders/hooks/useOrders'
import { PATH } from '@/types/constants/paths'
import { navigateBack } from '@/utils'

import useOrderDetail from './useOrderDetail'

export const useOrderSubmit = (formReset: (t: any) => void) => {
  const router = useRouter()
  const { uid, orderDetail, queryKey } = useOrderDetail()
  const { order: orderEndpoint } = useEndpoint({ uid })
  const { mutate } = useOrders()

  const queryClient = useQueryClient()

  const { submit, loading } = useSubmit<string>({
    endpoint: orderEndpoint,
    method: uid ? 'put' : 'post',
    onSuccess: (uid, _, custom) => {
      queryClient.invalidateQueries({ queryKey })

      mutate()
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
      if (custom?.saveAndExit) {
        const navigateExit = () => router.push(PATH.ORDERS)
        navigateBack(navigateExit)
      } else {
        if (uid) {
          router.push(PATH.ORDER + '/' + uid)
        } else {
          router.reload()
        }
      }
      toast.success(`Order was successfully saved.`)
    },
    onError: e => {
      if (e.response?.status === 409) {
        toast.error(
          'Order was updated by another user. Please refresh the page. And try again.'
        )
      } else {
        toast.error(e.message)
      }
    }
  })

  return { loading, submit }
}
