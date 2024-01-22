import type { ColumnFiltersState } from '@tanstack/react-table'
import { useQueryState } from 'next-usequerystate'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useEffect, useMemo } from 'react'
import { useIsFirstRender } from 'usehooks-ts'

import useTableStateStore from '@/store/useTableStateStore'

export const useFilters = (
  tableId,
  enableQueryURL,
  useFirstRender = true
): [ColumnFiltersState, Dispatch<SetStateAction<ColumnFiltersState>>] => {
  const { setColumnFilter, instances } = useTableStateStore()

  const filterInstance = useMemo(() => instances[tableId]?.columnFilter || [], [instances, tableId])

  const [filterQuery, setFilterQuery] = useQueryState('filter', { history: 'replace' })

  //const [columnFiltering] = useState<ColumnFiltersState>(filterInstance || [])

  const isFirstRender = useIsFirstRender()

  const setFiltering: Dispatch<SetStateAction<ColumnFiltersState>> = useCallback(
    (filtering: SetStateAction<ColumnFiltersState>) => {
      if (typeof filtering === 'function') {
        const updatedFiltering = filtering(filterInstance)

        setColumnFilter(tableId, updatedFiltering)
        if (enableQueryURL) setFilterQuery(updatedFiltering.length === 0 ? null : JSON.stringify(updatedFiltering))
      } else {
        setColumnFilter(tableId, filtering)
        if (enableQueryURL) setFilterQuery(filtering.length === 0 ? null : JSON.stringify(filtering))
      }
    },
    [enableQueryURL, setColumnFilter, setFilterQuery, tableId, filterInstance]
  )

  // initialize update table state and query state and instance on first render
  useEffect(() => {
    if (isFirstRender && useFirstRender) {
      console.log('isFirstRender', { filterInstance, filterQuery: JSON.parse(filterQuery || '[]') })
      setFiltering(filterInstance?.length > 0 ? filterInstance : JSON.parse(filterQuery || '[]'))
    }
  }, [isFirstRender, setFiltering, filterInstance, filterQuery, useFirstRender])

  // update effect
  /*  useEffect(() => {
    if (!isFirstRender) {
      setColumnFilter(tableId, columnFiltering)
      if (enableQueryURL) setFilterQuery(columnFiltering.length === 0 ? null : JSON.stringify(columnFiltering))
    }
    // reason for disabling eslint: isFirstRender is a dependency but it should not trigger a re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId, columnFiltering, enableQueryURL, setFilterQuery, setColumnFilter]) */

  return [filterInstance, setFiltering]
}
