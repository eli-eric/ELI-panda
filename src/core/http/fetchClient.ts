import { getSession } from 'next-auth/react'

import { isFeatureEnabled } from '@/config/featureFlags'

export interface FetchRequestOptions {
    method?: string
    body?: any
    headers?: Record<string, string>
    signal?: AbortSignal
    timeoutMs?: number
    responseType?: 'json' | 'text' | 'blob'
}

export interface NormalizedHttpError extends Error {
    status?: number
    code?: string
    details?: unknown
}

export interface FetchRequestResult<T = unknown> {
    data: T
    status: number
    statusText: string
    headers: Record<string, string>
}

const DEFAULT_TIMEOUT = 15000

// apiAccessToken is a stable, per-session JWT (no mid-session rotation), so we
// resolve it once and reuse it instead of hitting /api/auth/session on every
// request — which previously added a ~270ms round-trip per call and stormed the
// Next server. The SessionSync bridge keeps this in lockstep with the live
// session (login / logout / user-switch); a single-flight getSession() fallback
// covers the cold-start window before the bridge has run, and non-React callers.
const isBrowser = typeof window !== 'undefined'
let cachedAuthToken: string | null = null
let inFlightSession: Promise<string | null> | null = null

/** Set by the SessionSync bridge whenever the session changes. */
export const setAuthToken = (token: string | null | undefined): void => {
    cachedAuthToken = token ?? null
}

/** Clear the cached token — on logout, or after a 401. */
export const clearAuthToken = (): void => {
    cachedAuthToken = null
    inFlightSession = null
}

const resolveAuthToken = async (): Promise<string | null> => {
    if (cachedAuthToken) return cachedAuthToken
    // Never share a module-level token across users on the server.
    if (!isBrowser) {
        const session = await getSession()
        return session?.user?.apiAccessToken ?? null
    }
    if (!inFlightSession) {
        inFlightSession = getSession()
            .then(session => {
                cachedAuthToken = session?.user?.apiAccessToken ?? null
                return cachedAuthToken
            })
            .finally(() => {
                inFlightSession = null
            })
    }
    return inFlightSession
}

const withTimeout = (signal: AbortSignal | undefined, ms: number) => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), ms)
    if (signal) {
        signal.addEventListener('abort', () => controller.abort(), { once: true })
    }
    return {
        signal: controller.signal,
        clear: () => clearTimeout(timer),
    }
}

const toHeadersObject = (headers: Headers): Record<string, string> => {
    return Object.fromEntries(headers.entries())
}

const parseResponseBody = async <T>(
    response: Response,
    responseType: FetchRequestOptions['responseType'] = 'json',
): Promise<T> => {
    if (responseType === 'text') return (await response.text()) as T
    if (responseType === 'blob') return (await response.blob()) as T
    if (response.status === 204) return undefined as T

    const rawText = await response.text()

    if (isFeatureEnabled('enableHttpLogging')) {
        //eslint-disable-next-line
        console.log('[fetchClient] Response details:', {
            url: response.url,
            status: response.status,
            statusText: response.statusText,
            contentType: response.headers.get('content-type'),
            rawText: rawText.substring(0, 200),
            rawTextLength: rawText.length,
        })
    }

    try {
        return JSON.parse(rawText) as T
    } catch (error) {
        if (isFeatureEnabled('enableHttpLogging')) {
            //eslint-disable-next-line
            console.error('[fetchClient] JSON parse error:', {
                error,
                rawText: rawText.substring(0, 500),
            })
        }
        throw error
    }
}

export async function fetchRequestDetailed<T = unknown>(
    url: string,
    options: FetchRequestOptions = {},
): Promise<FetchRequestResult<T>> {
    const token = await resolveAuthToken()
    const headers: Record<string, string> = { ...(options.headers || {}) }

    if (token) {
        headers['authorization'] = `Bearer ${token}`
    }

    let body = options.body
    if (body && typeof body === 'object' && !(body instanceof FormData)) {
        if (!headers['Content-Type']) headers['Content-Type'] = 'application/json'
        body = JSON.stringify(body)
    }

    const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT
    const { signal, clear } = withTimeout(options.signal, timeoutMs)

    let response: Response
    try {
        response = await fetch(url, {
            method: options.method || 'GET',
            headers,
            body,
            signal,
        })
    } catch (err) {
        clear()
        if ((err as any)?.name === 'AbortError') {
            throw err
        }
        const error: NormalizedHttpError = new Error('Network request failed')
        error.details = err
        throw error
    }

    clear()

    if (!response.ok) {
        // A stale/expired session yields a 401; drop the cached token so the
        // next request re-resolves a fresh session (self-healing).
        if (response.status === 401) {
            clearAuthToken()
        }
        let details: any
        try {
            details = await response.clone().json()
        } catch {
            try {
                details = await response.text()
            } catch {
                details = undefined
            }
        }
        const error: NormalizedHttpError = new Error(
            (details && (details.message || details.error)) || `HTTP ${response.status}`,
        )
        error.status = response.status
        error.code = details?.code
        error.details = details
        throw error
    }

    const data = await parseResponseBody<T>(response, options.responseType)

    return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: toHeadersObject(response.headers),
    }
}

export async function fetchRequest<T = unknown>(
    url: string,
    options: FetchRequestOptions = {},
): Promise<T> {
    const result = await fetchRequestDetailed<T>(url, options)
    return result.data
}
