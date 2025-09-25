import { useCallback } from 'react'

import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import type { DisabledFields } from '../SystemsFilterButton.cont'
import { SystemsFilterSheet } from '../SystemsFilterSheet.cont'

interface UseSystemsFilterSheetProps {
  tableId?: string
  enableQueryURL?: boolean
  disabledFields?: DisabledFields
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export const useSystemsFilterSheet = () => {
  const { openModal } = useModalGlobalStore()

  const openFilterSheet = useCallback(
    ({ tableId = 'systems', enableQueryURL = true, disabledFields, side = 'left' }: UseSystemsFilterSheetProps = {}) => {
      openModal('sheet', {
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
    },
    [openModal]
  )

  return openFilterSheet
}