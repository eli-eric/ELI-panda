import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

import { PATH } from '@/types/constants/paths'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryMutate } from '@/utils/fetcher'

import type { OrderDetailFormType } from '../types/form'
import { addUuidsToOrderData } from '../utils/order-transforms'
import useOrderDetail from './useOrderDetail'

/**
 * Updates cache and invalidates relevant queries
 */
const updateCacheAndInvalidate = async (
  queryClient: ReturnType<typeof useQueryClient>,
  queryKey: QueryFetcherKey,
  orderDetail: OrderDetailFormType
) => {
  // Immediate cache update for order detail
  queryClient.setQueryData(queryKey, orderDetail)

  // Invalidate all relevant queries (await to ensure completion)
  await Promise.all([
    queryClient.invalidateQueries({ queryKey }),
    queryClient.invalidateQueries({ queryKey: ['orders'] })
  ])
}

/**
 * Handles navigation and displays notifications after successful save
 */
const handleNavigation = (
  router: ReturnType<typeof useRouter>,
  saveAndExit: boolean,
  orderDetail: OrderDetailFormType,
  currentUid: string | undefined
) => {
  if (saveAndExit) {
    router.push(PATH.ORDERS)
  } else {
    // After creating a new order, redirect to its detail
    if (!currentUid) {
      router.push(PATH.ORDER + '/' + orderDetail.uid)
    }
    toast.success('Order was successfully saved.')
  }
}

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

      // Prepare data for form reset (add uuid)
      const resetData = addUuidsToOrderData(orderDetail)
      formReset(resetData)

      // Cache management
      await updateCacheAndInvalidate(queryClient, queryKey, orderDetail)

      // Navigation and UI feedback
      handleNavigation(router, saveAndExit, orderDetail, uid)
    }

  const submit = (data: OrderDetailFormType, saveAndExit: boolean) => {
    mutate(data, {
      onSuccess: handleOnSuccess(saveAndExit)
    })
  }

  return { loading: isPending, submit }
}
