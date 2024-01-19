import type { ColumnFiltersState } from '@tanstack/react-table'
import { useQueryState } from 'next-usequerystate'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useIsFirstRender, useLocalStorage } from 'usehooks-ts'

import useTableStateStore from '@/store/useTableStateStore'

export const useFilters = (
  tableId,
  enableQueryURL
): [ColumnFiltersState, Dispatch<SetStateAction<ColumnFiltersState>>] => {
  const { setColumnFilter, instances } = useTableStateStore()

  const filterInstance = useMemo(() => instances[tableId]?.columnFilter || [], [instances, tableId])

  const [filterQuery, setFilterQuery] = useQueryState('filter', { history: 'replace' })

  const [columnFiltering, setFiltering] = useState<ColumnFiltersState>(filterInstance || [])

  const [storedFilter, setStoredFilter] = useLocalStorage<ColumnFiltersState>(
    'tableFilters' + '-' + tableId,
    filterInstance
  )

  const isFirstRender = useIsFirstRender()

  // initialize update table state and query state and instance on first render
  useEffect(() => {
    if (isFirstRender) {
      if (enableQueryURL) {
        if (filterQuery) {
          setFiltering(JSON.parse(filterQuery))
          setColumnFilter(tableId, JSON.parse(filterQuery))
        } else if (filterInstance) {
          setFilterQuery(JSON.stringify(filterInstance))
          setFiltering(filterInstance)
        } else if (storedFilter) {
          setFilterQuery(JSON.stringify(storedFilter))
          setFiltering(storedFilter)
        }
      }
    }
  }, [
    isFirstRender,
    enableQueryURL,
    filterQuery,
    tableId,
    setColumnFilter,
    filterInstance,
    setFilterQuery,
    storedFilter
  ])

  // update effect
  useEffect(() => {
    if (!isFirstRender) {
      setColumnFilter(tableId, columnFiltering)
      setStoredFilter(columnFiltering)
      if (enableQueryURL) setFilterQuery(columnFiltering.length === 0 ? null : JSON.stringify(columnFiltering))
    }
    // reason for disabling eslint: isFirstRender is a dependency but it should not trigger a re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId, columnFiltering, enableQueryURL, setFilterQuery, setColumnFilter])

  return [filterInstance, setFiltering]
}
