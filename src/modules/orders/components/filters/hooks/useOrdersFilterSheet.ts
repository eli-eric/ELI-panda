import { useCallback } from 'react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { OrdersFilterSheet } from '../OrdersFilterSheet.cont'

interface UseOrdersFilterSheetProps {
    tableId?: string
    enableQueryURL?: boolean
    side?: 'top' | 'right' | 'bottom' | 'left'
}

export const useOrdersFilterSheet = () => {
    const { openModal } = useDynamicModalStore()

    const openFilterSheet = useCallback(
        ({
            tableId = 'orders',
            enableQueryURL = true,
            side = 'left',
        }: UseOrdersFilterSheetProps = {}) => {
            const modalId = openModal('sheet', {
                id: `orders-filters-${tableId}`,
                component: OrdersFilterSheet,
                props: {
                    title: 'Order Filters',
                    size: 'l',
                    side,
                    tableId,
                    enableQueryURL,
                },
            })

            return modalId
        },
        [openModal],
    )

    return openFilterSheet
}
