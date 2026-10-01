import type { ColumnFilter } from '@tanstack/react-table'

/**
 * Reads a query param straight from the address bar.
 *
 * `useQueryState` (nuqs) derives its value from the Pages Router's `router.query`,
 * which stays empty until Next marks the router ready. For statically optimized
 * pages opened *with* a query string that happens one tick after hydration, so a
 * component mounting inside that window sees `null` even though the param is in
 * the URL. Use this for the initial read only — once the router is ready, nuqs is
 * the source of truth and this would resurrect params the user has just cleared.
 */
export const readQueryParamFromUrl = (key: string): string | null => {
    if (typeof window === 'undefined') return null
    return new URLSearchParams(window.location.search).get(key)
}

/**
 * Parses a JSON-encoded query param. Query strings are user input — hand-edited,
 * truncated or double-encoded links must not crash the page, so anything
 * unparseable falls back instead of throwing.
 */
export const parseJsonParam = <T>(raw: string | null | undefined, fallback: T): T => {
    if (!raw) return fallback
    try {
        return JSON.parse(raw) as T
    } catch {
        return fallback
    }
}

/**
 * Parses a positive-integer query param (`page`, `pageSize`).
 *
 * `parseInt` alone yields `NaN` for `?page=abc`, and a `NaN` interpolated into a
 * serialized pagination object produces invalid JSON that throws in whichever
 * consumer parses it back — a blank page from one hand-edited link.
 */
export const parsePositiveIntParam = (raw: string | null | undefined, fallback: number): number => {
    if (!raw) return fallback
    const parsed = parseInt(raw, 10)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

const isColumnFilter = (value: unknown): value is ColumnFilter => {
    if (typeof value !== 'object' || value === null) return false
    const candidate = value as ColumnFilter
    // A filter needs both halves to be usable: the id keys the badge and the
    // store, the value is what the API actually filters on. `[{"id":"name"}]`
    // would otherwise reach both and render a badge with no label.
    return (
        typeof candidate.id === 'string' &&
        candidate.id.length > 0 &&
        candidate.value !== undefined &&
        candidate.value !== null
    )
}

/**
 * Parses the serialized `filter` query param into table column filters.
 *
 * Entries are shape-checked, not just array-checked: these go straight into the
 * table store, get serialized into the `columnFilter` the API receives, and are
 * rendered as badges keyed by `id`. `?filter=[1,2]` must not reach any of that.
 */
export const parseColumnFilterParam = (raw?: string | null): ColumnFilter[] => {
    const parsed = parseJsonParam<unknown>(raw, [])
    return Array.isArray(parsed) ? parsed.filter(isColumnFilter) : []
}
