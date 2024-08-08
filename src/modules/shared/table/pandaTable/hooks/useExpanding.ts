import type { ExpandedState } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useMemo } from 'react'

import useTableStateStore from '@/store/useTableStateStore'

export const useExpanding = (
  tableId
): [ExpandedState, Dispatch<SetStateAction<ExpandedState>>] => {
  const { instances, setExpand } = useTableStateStore()
  const expandedInstance = useMemo(
    () => instances[tableId]?.expanded || {},
    [instances, tableId]
  )

  const setExpandedCallback: Dispatch<SetStateAction<ExpandedState>> =
    useCallback(
      (expandedState: SetStateAction<ExpandedState>) => {
        if (typeof expandedState === 'function') {
          const updatedExpanded = expandedState(expandedInstance)
          setExpand(tableId, updatedExpanded)
        } else {
          setExpand(tableId, expandedState)
        }
      },
      [expandedInstance, setExpand, tableId]
    )

  return [expandedInstance, setExpandedCallback]
}
