import type { RowSelectionState } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useMemo } from 'react'

import useTableStateStore from '@/store/useTableStateStore'

export const useRowSelection = (tableId: string): [RowSelectionState, Dispatch<SetStateAction<RowSelectionState>>] => {
  const { setRowSelection: setSelection, instances } = useTableStateStore()

  const rowSelectionInstance = useMemo(() => instances[tableId]?.rowSelection || {}, [instances, tableId])

  const setRowSelection: Dispatch<SetStateAction<RowSelectionState>> = useCallback(
    (selection: SetStateAction<RowSelectionState>) => {
      if (typeof selection === 'function') {
        const updatedFiltering = selection(rowSelectionInstance)
        setSelection(tableId, updatedFiltering)
      } else {
        setSelection(tableId, selection)
      }
    },
    [setSelection, tableId, rowSelectionInstance]
  )

  return [rowSelectionInstance, setRowSelection]
}
