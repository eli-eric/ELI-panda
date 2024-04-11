import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { useOrders } from '@/modules/orders/hooks/useOrders'
import { PATH } from '@/types/constants/paths'

import useOrderDetail from './useOrderDetail'

export const useOrderSubmit = () => {
  const router = useRouter()
  const { mutate: mutateDetail, uid } = useOrderDetail()
  const { order: orderEndpoint } = useEndpoint({ uid })
  const { mutate } = useOrders()

  const { submit, loading } = useSubmit<string>({
    endpoint: orderEndpoint,
    method: uid ? 'put' : 'post',
    onSuccess: (uid, _, custom) => {
      toast.success(`Order ${uid} saved successfully`)
      if (custom?.saveAndExit) router.push(uid ? PATH.ORDER + '/' + uid : PATH.ORDERS)
      mutate()
      mutateDetail()
    },
    onError: e => toast.error(e.message)
  })

  return { loading, submit }
}
