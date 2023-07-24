import type { SortingState } from '@tanstack/react-table'
import { useQueryState } from 'next-usequerystate'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import { useIsFirstRender } from 'usehooks-ts'

import useTableStateStore from '@/store/useTableStateStore'

export const useSorting = (tableId, enableQueryURL): [SortingState, Dispatch<SetStateAction<SortingState>>] => {
  const { setSortBy, setSortByQueryString, instances } = useTableStateStore()
  const sortByInstance = instances[tableId]?.sortBy
  const sortByStringInstance = instances[tableId]?.sortByQueryString

  const [sortByQuery, setSortByQuery] = useQueryState('sortBy', { history: 'replace' })
  // table state
  const [sorting, setSorting] = useState<SortingState>(sortByInstance || [])

  const isFirstRender = useIsFirstRender()

  // initialize update table state and query state and instance on first render
  useEffect(() => {
    if (isFirstRender) {
      if (enableQueryURL) {
        // check if sortByQuery is set
        if (sortByQuery) {
          const parsed = JSON.parse(sortByQuery)
          setSorting(parsed)
          setSortBy(tableId, parsed)
          setSortByQueryString(tableId, parsed.length === 0 ? undefined : sortByQuery)
          // check if sortByStringInstance is set
        } else if (sortByStringInstance) {
          setSortByQuery(sortByStringInstance)
        }
      }
    }
  }, [
    isFirstRender,
    tableId,
    sortByQuery,
    sortByStringInstance,
    enableQueryURL,
    setSortBy,
    setSortByQueryString,
    setSortByQuery
  ])

  // update effect
  useEffect(() => {
    if (!isFirstRender) {
      setSortBy(tableId, sorting)
      setSortByQueryString(tableId, sorting.length === 0 ? undefined : JSON.stringify(sorting))
      if (enableQueryURL) {
        setSortByQuery(sorting.length === 0 ? null : JSON.stringify(sorting))
      }
    }
    // reason for disabling eslint: isFirstRender is a dependency but it should not trigger a re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId, sorting, enableQueryURL, setSortByQuery, setSortBy, setSortByQueryString])

  return [sorting, setSorting]
}
