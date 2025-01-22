import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { ROLE } from '@/types/constants/roles'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { OrderDetailFormType } from '../types/form'

const useOrderDetail = () => {
  const router = useRouter()
  const uid = router.query.uid as string | undefined
  const { order: orderEndpoint } = useEndpoint({ uid })

  const queryKey: QueryFetcherKey = ['order', { uid }]

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: queryFetcher<OrderDetailFormType>('order'),
    enabled: !!uid,
    refetchOnMount: true
  })

  const { data: session } = useSession()
  const disabledEdit = !session?.user.roles.includes(ROLE.ORDERS_EDIT)

  return {
    orderDetail: data,
    loading: isLoading,
    error,
    queryKey,
    disabledEdit,
    uid,
    orderEndpoint,
    refetch
  }
}

export default useOrderDetail
