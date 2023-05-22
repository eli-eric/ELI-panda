import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import { ROLE } from '@/types/constants/roles'

import type { OrderDetailFormType } from '../types'

const useOrderDetail = () => {
  const router = useRouter()
  const uid = router.query.uid as string
  const { order: orderEndpoint } = useEndpoint({ uid })
  const { response, loading, error, mutate } = useFetch<OrderDetailFormType>({
    url: uid && orderEndpoint,
    config: {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateOnMount: true
    }
  })
  const { data: session } = useSession()
  const disabledEdit = !session?.user.roles.includes(ROLE.ORDERS_EDIT)

  return { orderDetail: response, loading, error, mutate, disabledEdit, uid, orderEndpoint }
}

export default useOrderDetail
