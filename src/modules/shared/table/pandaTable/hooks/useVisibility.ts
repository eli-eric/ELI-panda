import type { VisibilityState } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useIsFirstRender, useLocalStorage } from 'usehooks-ts'

import useTableStateStore from '@/store/useTableStateStore'

export const useVisibility = (tableId): [VisibilityState, Dispatch<SetStateAction<VisibilityState>>] => {
  const { instances, setVisibility } = useTableStateStore()
  const columnVisibilityInstance = useMemo(() => instances[tableId]?.columnVisibility, [instances, tableId])

  const isFirstRender = useIsFirstRender()

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(columnVisibilityInstance || {})

  const [storedVisibility, setStoredVisibility] = useLocalStorage<VisibilityState>(
    'columnVisibility' + '-' + tableId,
    columnVisibilityInstance || {}
  )

  // set column visibility on first render
  useEffect(() => {
    if (isFirstRender) {
      !columnVisibilityInstance && setColumnVisibility(storedVisibility)
    }
  }, [isFirstRender, columnVisibilityInstance, storedVisibility])

  // update column visibility
  useEffect(() => {
    if (!isFirstRender) {
      setVisibility(tableId, columnVisibility)
      setStoredVisibility(columnVisibility)
    }
  }, [columnVisibility, setVisibility, tableId, setStoredVisibility, isFirstRender])

  return [columnVisibility, setColumnVisibility]
}
