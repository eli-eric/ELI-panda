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

  const [columnFiltering, setFiltering] = useState<ColumnFiltersState>(filterInstance || [])

  const isFirstRender = useIsFirstRender()

  // initialize update table state and query state and instance on first render
  useEffect(() => {
    if (isFirstRender) {
      if (enableQueryURL) {
        if (filterQuery) {
          setFiltering(JSON.parse(filterQuery))
          setColumnFilter(tableId, JSON.parse(filterQuery))
        }
        if (filterInstance) {
          setFilterQuery(JSON.stringify(filterInstance))
          setFiltering(filterInstance)
        }
      }
    }
  }, [isFirstRender, enableQueryURL, filterQuery, tableId, setColumnFilter, filterInstance, setFilterQuery])

  // update effect
  useEffect(() => {
    if (!isFirstRender) {
      setColumnFilter(tableId, columnFiltering)
      if (enableQueryURL) setFilterQuery(JSON.stringify(columnFiltering))
    }
    // reason for disabling eslint: isFirstRender is a dependency but it should not trigger a re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId, columnFiltering, enableQueryURL, setFilterQuery, setColumnFilter])

  return [columnFiltering, setFiltering]
}
