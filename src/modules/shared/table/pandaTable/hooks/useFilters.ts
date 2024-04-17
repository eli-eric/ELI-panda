import type { ColumnFiltersState } from '@tanstack/react-table'
import { useQueryState } from 'next-usequerystate'
import type { Dispatch, SetStateAction } from 'react'
import { startTransition, useCallback, useEffect, useMemo } from 'react'
import { useIsFirstRender } from 'usehooks-ts'

import useTableStateStore from '@/store/useTableStateStore'

export const useFilters = (
  tableId,
  enableQueryURL,
  useFirstRender = true
): [ColumnFiltersState, Dispatch<SetStateAction<ColumnFiltersState>>] => {
  const { setColumnFilter, instances } = useTableStateStore()

  const filterInstance = useMemo(
    () => instances[tableId]?.columnFilter || [],
    [instances, tableId]
  )

  const [filterQuery, setFilterQuery] = useQueryState('filter', {
    history: 'replace'
  })

  const isFirstRender = useIsFirstRender()

  const setFiltering: Dispatch<SetStateAction<ColumnFiltersState>> =
    useCallback(
      (filtering: SetStateAction<ColumnFiltersState>) => {
        if (typeof filtering === 'function') {
          const updatedFiltering = filtering(filterInstance)
          setColumnFilter(tableId, updatedFiltering)
          if (enableQueryURL)
            setFilterQuery(
              updatedFiltering.length === 0
                ? null
                : JSON.stringify(updatedFiltering)
            )
        } else {
          setColumnFilter(tableId, filtering)
          if (enableQueryURL)
            setFilterQuery(
              filtering.length === 0 ? null : JSON.stringify(filtering)
            )
        }
      },
      [enableQueryURL, setColumnFilter, setFilterQuery, tableId, filterInstance]
    )

  // initialize update table state and query state and instance on first render
  useEffect(() => {
    if (isFirstRender && useFirstRender) {
      startTransition(() => {
        if (enableQueryURL) {
          setFiltering(
            filterInstance?.length > 0
              ? filterInstance
              : JSON.parse(filterQuery || '[]')
          )
        } else {
          setFiltering(filterInstance)
        }
      })
    }
  }, [
    isFirstRender,
    setFiltering,
    filterInstance,
    filterQuery,
    useFirstRender,
    enableQueryURL
  ])

  return [filterInstance, setFiltering]
}
