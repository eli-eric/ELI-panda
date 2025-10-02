import { useCallback } from 'react'

import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { OrdersFilterSheet } from '../OrdersFilterSheet.cont'

interface UseOrdersFilterSheetProps {
  tableId?: string
  enableQueryURL?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export const useOrdersFilterSheet = () => {
  const { openModal } = useModalGlobalStore()

  const openFilterSheet = useCallback(
    ({
      tableId = 'orders',
      enableQueryURL = true,
      side = 'left'
    }: UseOrdersFilterSheetProps = {}) => {
      openModal('sheet', {
        component: OrdersFilterSheet,
        props: {
          title: 'Order Filters',
          size: 'l',
          side,
          tableId,
          enableQueryURL
        }
      })
    },
    [openModal]
  )

  return openFilterSheet
}
