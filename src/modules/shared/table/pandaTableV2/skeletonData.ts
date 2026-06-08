/**
 * Resolves the `data` prop for {@link PandaTableV2} so the skeleton shows on the
 * first load and dims (keeps stale rows) on refetch.
 *
 * Returns `undefined` while the first page is still loading — PandaTableV2 keys
 * `isInitialLoad` off `isUndefined(data)` — otherwise the array as-is.
 *
 * Unifies the guard across modals whose data source is a guaranteed array
 * (transformed to `[]`) as well as queries that are `undefined` until loaded.
 */
export const skeletonData = <T>(data: T[] | undefined, loading: boolean): T[] | undefined =>
    loading && !data?.length ? undefined : data
