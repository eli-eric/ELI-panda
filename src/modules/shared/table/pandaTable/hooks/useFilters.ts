import type { ColumnFiltersState } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'
import { startTransition, useCallback, useEffect, useMemo, useRef } from 'react'

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

    // Hydrate the table state once. The URL is read, never written: writing an
    // empty store back would delete the `filter` param of a shared deep link
    // before anything had a chance to read it (ELIPANDA-505).
    //
    // Keyed on "have we hydrated yet", not on the first render: on a
    // server-rendered page the URL value only reaches us after hydration, so
    // first-render-only would miss it entirely.
    const hasHydrated = useRef(false)

    useEffect(() => {
        if (!useFirstRender || hasHydrated.current) return

        if (!enableQueryURL) {
            hasHydrated.current = true
            startTransition(() => setColumnFilter(tableId, filterInstance))
            return
        }

        // Filters already in the store (e.g. coming back to the table
        // client-side) win, and get mirrored into the URL.
        if (filterInstance.length > 0) {
            hasHydrated.current = true
            startTransition(() => setFiltering(filterInstance))
            return
        }

        // Nothing to hydrate from yet. Stay unlatched so a URL value arriving
        // on a later render is still picked up.
        const urlFilters = parseColumnFilterParam(filterQuery)
        if (urlFilters.length === 0) return

        // The URL is already correct — only the store needs filling in.
        hasHydrated.current = true
        startTransition(() => setColumnFilter(tableId, urlFilters))
    }, [
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
