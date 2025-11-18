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
 * Opens system filter sheet using new dynamic modal system
 * Supports proper z-index layering when opened from other modals
 */
export const useSystemsFilterSheet = () => {
  const { openModal } = useDynamicModalStore()

  const openFilterSheet = useCallback(
    ({
      tableId = 'systems',
      enableQueryURL = true,
      disabledFields,
      side = 'left'
    }: UseSystemsFilterSheetProps = {}) => {
      // Open with custom ID for easy reference and proper z-index management
      const modalId = openModal('sheet', {
        id: `system-filters-${tableId}`,
        component: SystemsFilterSheet,
        props: {
          title: 'System Filters',
          size: 'l',
          side,
          tableId,
          enableQueryURL,
          disabledFields
        }
      })

      return modalId
    },
    [openModal]
  )

  return openFilterSheet
}
