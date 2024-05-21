import type { VisibilityState } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export const useVisibility = (
  tableId
): [VisibilityState, Dispatch<SetStateAction<VisibilityState>>] => {
  const [storedVisibility, setStoredVisibility] =
    useLocalStorage<VisibilityState>('columnVisibility' + '-' + tableId, {})
  const setColumnVisibility: Dispatch<
    SetStateAction<VisibilityState>
  > = columnVisibility => {
    if (typeof columnVisibility === 'function') {
      const updatedColumnVisibility = columnVisibility(storedVisibility)
      setStoredVisibility(updatedColumnVisibility)
    } else {
      setStoredVisibility(columnVisibility)
    }
  }

  return [storedVisibility, setColumnVisibility]
}
