import type { ColumnFiltersState } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'
import { startTransition, useCallback, useEffect, useMemo } from 'react'
import { useIsFirstRender } from 'usehooks-ts'

import { useUrlQueryState } from '@/hooks/useUrlQueryState'
import useTableStateStore from '@/store/useTableStateStore'
import { parseColumnFilterParam } from '@/utils/urlQuery'

export const useFilters = (
    tableId: string,
    enableQueryURL?: boolean,
    useFirstRender = true,
): [ColumnFiltersState, Dispatch<SetStateAction<ColumnFiltersState>>] => {
    const { setColumnFilter, instances } = useTableStateStore()

    const filterInstance = useMemo(
        () => instances[tableId]?.columnFilter || [],
        [instances, tableId],
    )

    const [filterQuery, setFilterQuery] = useUrlQueryState('filter', {
        history: 'replace',
    })

    const isFirstRender = useIsFirstRender()

    const setFiltering: Dispatch<SetStateAction<ColumnFiltersState>> = useCallback(
        (filtering: SetStateAction<ColumnFiltersState>) => {
            if (typeof filtering === 'function') {
                const updatedFiltering = filtering(filterInstance)
                setColumnFilter(tableId, updatedFiltering)
                if (enableQueryURL)
                    setFilterQuery(
                        updatedFiltering.length === 0 ? null : JSON.stringify(updatedFiltering),
                    )
            } else {
                setColumnFilter(tableId, filtering)
                if (enableQueryURL)
                    setFilterQuery(filtering.length === 0 ? null : JSON.stringify(filtering))
            }
        },
        [enableQueryURL, setColumnFilter, setFilterQuery, tableId, filterInstance],
    )

    // Hydrate the table state on first render. The URL is read, never written:
    // writing an empty store back would delete the `filter` param of a shared
    // deep link before anything had a chance to read it (ELIPANDA-505).
    useEffect(() => {
        if (!isFirstRender || !useFirstRender) return

        startTransition(() => {
            if (!enableQueryURL) {
                setColumnFilter(tableId, filterInstance)
                return
            }

            // Filters already in the store (e.g. coming back to the table
            // client-side) win, and get mirrored into the URL.
            if (filterInstance.length > 0) {
                setFiltering(filterInstance)
                return
            }

            const urlFilters = parseColumnFilterParam(filterQuery)
            if (urlFilters.length > 0) {
                // The URL is already correct — only the store needs filling in.
                setColumnFilter(tableId, urlFilters)
            }
        })
    }, [
        isFirstRender,
        setFiltering,
        setColumnFilter,
        tableId,
        filterInstance,
        filterQuery,
        useFirstRender,
        enableQueryURL,
    ])

    return [filterInstance, setFiltering]
}
