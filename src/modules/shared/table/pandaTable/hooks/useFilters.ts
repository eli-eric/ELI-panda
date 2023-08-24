import type { ColumnFiltersState } from '@tanstack/react-table'
import { useQueryState } from 'next-usequerystate'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import { useIsFirstRender } from 'usehooks-ts'

import useTableStateStore from '@/store/useTableStateStore'

export const useFilters = (
  tableId,
  enableQueryURL
): [ColumnFiltersState, Dispatch<SetStateAction<ColumnFiltersState>>] => {
  const { setColumnFilter, instances } = useTableStateStore()

  const filterInstance = instances[tableId]?.columnFilter

  const [filterQuery, setFilterQuery] = useQueryState('filter', { history: 'replace' })

  // table state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(filterInstance || [])

  const isFirstRender = useIsFirstRender()

  // initialize update table state and query state and instance on first render
  useEffect(() => {
    if (isFirstRender) {
      if (enableQueryURL) {
        if (filterQuery) {
          setColumnFilters(JSON.parse(filterQuery))
          setColumnFilter(tableId, JSON.parse(filterQuery))
        } else if (filterInstance) {
          setFilterQuery(JSON.stringify(filterInstance))
        }
      }
    }
  }, [isFirstRender, enableQueryURL, filterQuery, tableId, setColumnFilter, filterInstance, setFilterQuery])

  // update effect
  useEffect(() => {
    if (!isFirstRender) {
      setColumnFilter(tableId, columnFilters)
      if (enableQueryURL) setFilterQuery(JSON.stringify(columnFilters))
    }
    // reason for disabling eslint: isFirstRender is a dependency but it should not trigger a re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId, columnFilters, enableQueryURL, setFilterQuery, setColumnFilter])

  return [columnFilters, setColumnFilters]
}
