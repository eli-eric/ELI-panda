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

/** Parses the serialized `filter` query param into table column filters. */
export const parseColumnFilterParam = (raw?: string | null): ColumnFilter[] => {
    const parsed = parseJsonParam<unknown>(raw, [])
    return Array.isArray(parsed) ? (parsed as ColumnFilter[]) : []
}
