import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { useOrders } from '@/modules/orders/hooks/useOrders'
import { PATH } from '@/types/constants/paths'
import { navigateBack } from '@/utils'

import useOrderDetail from './useOrderDetail'

export const useOrderSubmit = () => {
  const router = useRouter()
  const { invalidateQuery, uid } = useOrderDetail()
  const { order: orderEndpoint } = useEndpoint({ uid })
  const { mutate } = useOrders()

  const { submit, loading } = useSubmit<string>({
    endpoint: orderEndpoint,
    method: uid ? 'put' : 'post',
    onSuccess: (uid, _, custom) => {
      toast.success(`Order was successfully saved.`)

      mutate()
      invalidateQuery()
      if (custom?.saveAndExit) {
        const navigateExit = () => router.push(PATH.ORDERS)
        navigateBack(navigateExit)
      } else {
        if (uid) {
          router.push(PATH.ORDER + '/' + uid)
        }
      }
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
