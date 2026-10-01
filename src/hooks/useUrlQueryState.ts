import type { Options, UseQueryStateReturn } from 'nuqs'
import { useQueryState } from 'nuqs'
import { useEffect, useRef, useSyncExternalStore } from 'react'

import { readQueryParamFromUrl } from '@/utils/urlQuery'

type UrlQueryStateReturn = UseQueryStateReturn<string, undefined>

/** Nothing to subscribe to: the address bar is only read, never watched. */
const subscribeToNothing = () => () => undefined

const readNothing = () => null

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
 * The address bar fills that gap, read through `useSyncExternalStore` so that it
 * cannot reach the hydration render: prerendered HTML has no query string, so
 * `getServerSnapshot` returns `null` for both SSR and hydration and the two
 * trees agree. React swaps in the real value immediately afterwards, and
 * anything mounting after hydration sees it on its first render.
 *
 * Once nuqs reports a value for the key the fallback is dropped for good, so a
 * param the user has cleared is never resurrected. Consumers must therefore
 * treat the value as something that can arrive late — hydrate when it shows up
 * rather than only on first render.
 *
 * Writes are untouched — the setter is nuqs' own.
 */
export const useUrlQueryState = (key: string, options: Options = {}): UrlQueryStateReturn => {
    const [routerValue, setValue] = useQueryState(key, options)

    const urlValue = useSyncExternalStore(
        subscribeToNothing,
        () => readQueryParamFromUrl(key),
        readNothing,
    )

    // The fallback is for the gap before the router is ready, so it is spent as
    // soon as either source has actually produced something — not left live for
    // the life of the hook. Otherwise a component mounting inside nuqs' throttle
    // window, just after another component cleared the param, would read the
    // not-yet-rewritten address bar and resurrect it.
    //
    // Latched in an effect rather than during render, so a render React throws
    // away cannot spend it, and only once a value was really available: on a
    // server-rendered page the hydration commit legitimately sees nothing.
    const isFallbackSpent = useRef(false)
    useEffect(() => {
        if (routerValue !== null || urlValue !== null) isFallbackSpent.current = true
    }, [routerValue, urlValue])

    const value = routerValue ?? (isFallbackSpent.current ? null : urlValue)

    return [value, setValue]
}
