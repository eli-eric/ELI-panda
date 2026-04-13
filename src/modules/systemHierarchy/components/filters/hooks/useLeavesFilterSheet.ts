import { useCallback } from 'react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { LEAVES_TABLE_ID } from '../../../types/constants'
import { LeavesFilterSheet } from '../LeavesFilterSheet.cont'

interface UseLeavesFilterSheetProps {
    side?: 'top' | 'right' | 'bottom' | 'left'
}

export const useLeavesFilterSheet = () => {
    const { openModal } = useDynamicModalStore()

    const openFilterSheet = useCallback(
        ({ side = 'left' }: UseLeavesFilterSheetProps = {}) => {
            const modalId = openModal('sheet', {
                id: `leaves-filters-${LEAVES_TABLE_ID}`,
                component: LeavesFilterSheet,
                props: {
                    title: 'Leaves Filters',
                    size: 'l',
                    side,
                    tableId: LEAVES_TABLE_ID,
                    enableQueryURL: true,
                },
            })

            return modalId
        },
        [openModal],
    )

    return openFilterSheet
}
