import { useCallback } from 'react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import type { DisabledFields } from '../SystemsFilterButton.cont'
import { SystemsFilterSheet } from '../SystemsFilterSheet.cont'

interface UseSystemsFilterSheetProps {
    tableId?: string
    enableQueryURL?: boolean
    disabledFields?: DisabledFields
    side?: 'top' | 'right' | 'bottom' | 'left'
}

/**
 * V2 Hook using new dynamic modal system
 * Opens system filter sheet with automatic z-index management
 * Can be used alongside other modals/dialogs without z-index conflicts
 *
 * Returns modalId for potential manual closing if needed
 */
export const useSystemsFilterSheetV2 = () => {
    const { openModal } = useDynamicModalStore()

    const openFilterSheet = useCallback(
        ({
            tableId = 'systems',
            enableQueryURL = true,
            disabledFields,
            side = 'left',
        }: UseSystemsFilterSheetProps = {}) => {
            // Open with custom ID for easy reference
            const modalId = openModal('sheet', {
                id: `system-filters-${tableId}`,
                component: SystemsFilterSheet,
                props: {
                    title: 'System Filters',
                    size: 'l',
                    side,
                    tableId,
                    enableQueryURL,
                    disabledFields,
                },
            })

            return modalId
        },
        [openModal],
    )

    return openFilterSheet
}
