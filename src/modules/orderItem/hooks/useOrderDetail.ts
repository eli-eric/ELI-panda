import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import useSubmit from '@/hooks/fetch/useSubmit'
import useOrders from '@/modules/orders/hooks/useOrders'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import type { OrderDetailFormType } from '../types'

const useOrderDetail = () => {
  const router = useRouter()
  const uid = router.query.uid as string | undefined
  const { order: orderEndpoint } = useEndpoint({ uid })
  const { mutate } = useOrders()
  const {
    response,
    loading,
    error,
    mutate: mutateDetail
  } = useFetch<OrderDetailFormType>({
    url: uid && orderEndpoint,
    config: {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      revalidateIfStale: true,
      suspense: false
    }
  })
  const { data: session } = useSession()
  const disabledEdit = !session?.user.roles.includes(ROLE.ORDERS_EDIT)

  const { submit, loading: loadingSubmit } = useSubmit<string>({
    endpoint: orderEndpoint,
    method: uid ? 'put' : 'post',
    onSuccess: uid => {
      toast.success(`Order ${uid} saved successfully`)
      router.push(uid ? PATH.ORDER + '/' + uid : PATH.ORDERS)
      mutate()
      mutateDetail()
    },
    onError: e => toast.error(e.message)
  })

  return {
    orderDetail: response,
    loading: loading || loadingSubmit,
    error,
    mutate,
    disabledEdit,
    uid,
    orderEndpoint,
    submit
  }
}

export default useOrderDetail
