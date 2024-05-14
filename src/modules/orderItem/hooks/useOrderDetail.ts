import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { ROLE } from '@/types/constants/roles'

import type { OrderDetailFormType } from '../types/form'
import { useQuery } from '@tanstack/react-query'
import { queryFetcher } from '@/utils/fetcher'

const useOrderDetail = () => {
  const router = useRouter()
  const uid = router.query.uid as string | undefined
  const { order: orderEndpoint } = useEndpoint({ uid })

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['order', { uid }],
    queryFn: queryFetcher<OrderDetailFormType>('order'),
    enabled: !!uid,
    refetchOnMount: true
  })

  const { data: session } = useSession()
  const disabledEdit = !session?.user.roles.includes(ROLE.ORDERS_EDIT)

  return {
    orderDetail: data,
    invalidateQuery: refetch,
    loading: isLoading,
    error,
    disabledEdit,
    uid,
    orderEndpoint
  }
}

export default useOrderDetail
