import type { Options, UseQueryStateReturn } from 'nuqs'
import { useQueryState } from 'nuqs'
import { useRef } from 'react'

import { readQueryParamFromUrl } from '@/utils/urlQuery'

type UrlQueryStateReturn = UseQueryStateReturn<string, undefined>

/**
 * `useQueryState`, readable during the pages-router "not ready" window.
 *
 * nuqs derives its value from `router.query`, which the Pages Router leaves
 * empty until it marks itself ready. For a statically optimized page opened
 * *with* a query string that happens a tick after hydration, so anything
 * mounting inside that window — notably our `dynamic(..., { ssr: false })`
 * modules — reads `null` for params that are sitting in the address bar. That is
 * what broke shared deep links (ELIPANDA-505).
 *
 * Until nuqs reports a value for the key, fall back to the address bar. The
 * fallback is dropped permanently the first time nuqs does report one, so a
 * param the user has since cleared is never resurrected.
 *
 * Writes are untouched — the setter is nuqs' own.
 */
export const useUrlQueryState = (key: string, options: Options = {}): UrlQueryStateReturn => {
    const [routerValue, setValue] = useQueryState(key, options)

    const hasRouterValue = useRef(false)
    if (routerValue !== null) hasRouterValue.current = true

    const value = hasRouterValue.current ? routerValue : readQueryParamFromUrl(key)

    return [value, setValue]
}
