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

  // Ensure that defaultColumnOrder is always the first part of the column order
  const enforceDefaultOrder = useCallback(
    (columnOrder: ColumnOrderState): ColumnOrderState => {
      const filteredOrder = columnOrder.filter(
        col => !defaultColumnOrder.includes(col)
      )
      return [...defaultColumnOrder, ...filteredOrder]
    },
    [defaultColumnOrder]
  )

  const setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>> =
    useCallback(
      (columnOrder: SetStateAction<ColumnOrderState>) => {
        if (typeof columnOrder === 'function') {
          const updatedColumnOrder = columnOrder(storedOrder)
          setStoredOrder(enforceDefaultOrder(updatedColumnOrder))
        } else {
          setStoredOrder(enforceDefaultOrder(columnOrder))
        }
      },
      [storedOrder, setStoredOrder, enforceDefaultOrder]
    )

  return [storedOrder, setColumnOrder]
}
