import type { ColumnOrderState } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export const useOrdering = (
  tableId: string,
  defaultColumnOrder: string[] = []
): [ColumnOrderState, Dispatch<SetStateAction<ColumnOrderState>>] => {
  const [storedOrder, setStoredOrder] = useLocalStorage<ColumnOrderState>(
    'columnOrder' + '-' + tableId,
    defaultColumnOrder
  )

  const setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>> =
    useCallback(
      (columnOrder: SetStateAction<ColumnOrderState>) => {
        if (typeof columnOrder === 'function') {
          const updatedColumnOrder = columnOrder(storedOrder)
          setStoredOrder(updatedColumnOrder)
        } else {
          setStoredOrder(columnOrder)
        }
      },
      [storedOrder, setStoredOrder]
    )

  return [storedOrder, setColumnOrder]
}
