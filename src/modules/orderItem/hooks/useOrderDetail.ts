import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { ROLE } from '@/types/constants/roles'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { OrderDetailFormType } from '../types/form'

const useOrderDetail = () => {
  const router = useRouter()
  const uid = router.query.uid as string | undefined

  // Memoizujeme endpoint, aby nedocházelo k zbytečným re-renderům
  const { order: orderEndpoint } = useEndpoint({ uid })

  // Memoizujeme queryKey pro zamezení zbytečných re-fetchů
  const queryKey = useMemo<QueryFetcherKey>(() => ['order', { uid }], [uid])

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: queryFetcher<OrderDetailFormType>('order'),
    enabled: !!uid,
    refetchOnMount: true,
    // Přidání staleTime pro omezení zbytečných dotazů
    staleTime: 30 * 1000 // 30 sekund
  })

  const { data: session } = useSession()

  // Memoizujeme výslednou hodnotu disabledEdit
  const disabledEdit = useMemo(
    () => !session?.user.roles.includes(ROLE.ORDERS_EDIT),
    [session?.user.roles]
  )

  // Memoizujeme návratový objekt, aby měl vždy stejnou referenční identitu
  return useMemo(() => {
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
  }, [
    data,
    isLoading,
    error,
    queryKey,
    disabledEdit,
    uid,
    orderEndpoint,
    refetch
  ])
}

export default useOrderDetail
