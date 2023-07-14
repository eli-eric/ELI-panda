import type { ColumnOrderState } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import { useIsFirstRender, useLocalStorage } from 'usehooks-ts'

import useTableStateStore from '@/store/useTableStateStore'

export const useColumnOrder = (tableId, columns): [ColumnOrderState, Dispatch<SetStateAction<ColumnOrderState>>] => {
  const { instances, setOrder } = useTableStateStore()
  const columnOrderInstance = instances[tableId]?.columnOrder

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(columnOrderInstance || [])
  const [storedOrder, setStoredOrder] = useLocalStorage<ColumnOrderState>(
    'columnOrder' + '-' + tableId,
    columns.map(column => column.id as string)
  )

  const isFirstRender = useIsFirstRender()

  // set column order on first render
  useEffect(() => {
    if (isFirstRender) {
      !columnOrderInstance && setColumnOrder(storedOrder)
    }
  }, [isFirstRender, columnOrderInstance, storedOrder])

  // update column order
  useEffect(() => {
    if (!isFirstRender) {
      setOrder(tableId, columnOrder)
      setStoredOrder(columnOrder)
    }
  }, [columnOrder, setOrder, tableId, setStoredOrder, isFirstRender])

  return [columnOrder, setColumnOrder]
}
