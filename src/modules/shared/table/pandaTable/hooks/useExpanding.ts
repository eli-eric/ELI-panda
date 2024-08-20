import type { ExpandedState } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

import useTableStateStore from '@/store/useTableStateStore'

export const useExpanding = (
  tableId
): [ExpandedState, Dispatch<SetStateAction<ExpandedState>>] => {
  const { instances, setExpand } = useTableStateStore()
  const expandedInstance = instances[tableId]?.expanded

  const [expanded, setExpanded] = useState<ExpandedState>(
    expandedInstance || {}
  )
  useEffect(() => {
    setExpand(tableId, expanded)
  }, [expanded, setExpand, tableId])

  return [expanded, setExpanded]
}
