import type { SortingState } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useIsFirstRender } from 'usehooks-ts'

import { useUrlQueryState } from '@/hooks/useUrlQueryState'
import useTableStateStore from '@/store/useTableStateStore'
import { parseJsonParam } from '@/utils/urlQuery'

export const useSorting = (
    tableId,
    enableQueryURL,
): [SortingState, Dispatch<SetStateAction<SortingState>>] => {
    const { setSortBy, setSortByQueryString, instances } = useTableStateStore()
    const sortByInstance = instances[tableId]?.sortBy
    const sortByStringInstance = instances[tableId]?.sortByQueryString

    const [sortByQuery, setSortByQuery] = useUrlQueryState('sortBy', {
        history: 'replace',
    })
    // table state
    const [sorting, setSorting] = useState<SortingState>(sortByInstance || [])

    const isFirstRender = useIsFirstRender()

    // Hydrate once from the URL (or mirror the store into the URL). Keyed on
    // "have we hydrated yet" rather than the first render: on a server-rendered
    // page the URL value only reaches us after hydration, so first-render-only
    // would never see a ?sortBy deep link.
    const hasHydrated = useRef(false)

    useEffect(() => {
        if (hasHydrated.current || !enableQueryURL) return

        if (sortByQuery) {
            const decoded = parseJsonParam<unknown>(sortByQuery, [])
            const parsed: SortingState = Array.isArray(decoded) ? (decoded as SortingState) : []
            hasHydrated.current = true

            if (parsed.length === 0) {
                // `?sortBy=[]` (or unparseable) carries no sort. Drop it rather
                // than leave it in every link the user copies from here on: the
                // publish effect below cannot clear it, since an empty sort that
                // never came from the user is deliberately not published.
                setSortByQueryString(tableId, undefined)
                setSortByQuery(null)
                return
            }

            setSorting(parsed)
            setSortBy(tableId, parsed)
            // Store the canonical serialization, not the raw param: the sync
            // effect below republishes `JSON.stringify(sorting)`, and anything
            // comparing the two (PaginationV2's reset baseline) would otherwise
            // see a hand-formatted `?sortBy` change out from under it.
            setSortByQueryString(tableId, JSON.stringify(parsed))
        } else if (sortByStringInstance) {
            hasHydrated.current = true
            setSortByQuery(sortByStringInstance)
        }
        // Otherwise stay unlatched: a URL value arriving on a later render must
        // still be picked up.
    }, [
        tableId,
        sortByQuery,
        sortByStringInstance,
        enableQueryURL,
        setSortBy,
        setSortByQueryString,
        setSortByQuery,
    ])

    // Publish user-driven sort changes to the store and the URL.
    // Latched in an effect, not during render, so a render React throws away
    // cannot flip it and re-enable the empty-sort publish below.
    const hasEverSorted = useRef(false)
    useEffect(() => {
        if (sorting.length > 0) hasEverSorted.current = true
    }, [sorting])

    useEffect(() => {
        if (isFirstRender) return

        // An empty sort that never came from the user is "not loaded yet", not
        // "cleared": publishing it would delete the ?sortBy of a shared deep
        // link before the hydration effect above got to read it.
        if (sorting.length === 0 && !hasEverSorted.current) return

        setSortBy(tableId, sorting)
        setSortByQueryString(tableId, sorting.length === 0 ? undefined : JSON.stringify(sorting))
        if (enableQueryURL) {
            setSortByQuery(sorting.length === 0 ? null : JSON.stringify(sorting))
        }
        // reason for disabling eslint: isFirstRender is a dependency but it should not trigger a re-render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableId, sorting, enableQueryURL, setSortByQuery, setSortBy, setSortByQueryString])

    return [sorting, setSorting]
}
