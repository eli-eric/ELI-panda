import { getSession } from 'next-auth/react'

import { clearAuthToken, fetchRequest, fetchRequestDetailed, setAuthToken } from '../fetchClient'

jest.mock('next-auth/react', () => ({
    getSession: jest.fn(),
}))

jest.mock('@/config/featureFlags', () => ({
    isFeatureEnabled: jest.fn(() => false),
}))

const mockGetSession = getSession as unknown as jest.Mock

interface FakeResponseInit {
    status?: number
    statusText?: string
    headers?: Record<string, string>
    body?: unknown
}

const buildResponse = ({
    status = 200,
    statusText = 'OK',
    headers = {},
    body,
}: FakeResponseInit) => {
    const text =
        body === undefined
            ? ''
            : typeof body === 'string'
              ? body
              : JSON.stringify(body)
    return {
        ok: status >= 200 && status < 300,
        status,
        statusText,
        url: '/x',
        headers: {
            entries: () => Object.entries(headers),
            get: (k: string) => headers[k] ?? null,
        },
        text: async () => text,
        clone: function () {
            return {
                ...this,
                json: async () => JSON.parse(text),
                text: async () => text,
            }
        },
        json: async () => JSON.parse(text),
    } as unknown as Response
}

beforeEach(() => {
    jest.clearAllMocks()
    clearAuthToken() // reset module-level token cache between tests
    mockGetSession.mockResolvedValue(null)
    global.fetch = jest.fn() as any
})

describe('fetchRequestDetailed', () => {
    it('adds Bearer token from session', async () => {
        mockGetSession.mockResolvedValue({ user: { apiAccessToken: 'TOK' } })
        ;(global.fetch as jest.Mock).mockResolvedValueOnce(
            buildResponse({ body: { ok: true } }),
        )
        await fetchRequestDetailed('/x')
        const headers = (global.fetch as jest.Mock).mock.calls[0][1].headers
        expect(headers.authorization).toBe('Bearer TOK')
    })

    it('JSON-stringifies object body + sets Content-Type', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValueOnce(
            buildResponse({ body: { ok: true } }),
        )
        await fetchRequestDetailed('/x', { method: 'POST', body: { a: 1 } })
        const init = (global.fetch as jest.Mock).mock.calls[0][1]
        expect(init.body).toBe('{"a":1}')
        expect(init.headers['Content-Type']).toBe('application/json')
    })

    it('returns parsed JSON + headers + status', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValueOnce(
            buildResponse({
                body: { ok: true },
                status: 200,
                statusText: 'OK',
                headers: { 'x-h': 'v' },
            }),
        )
        const res = await fetchRequestDetailed<{ ok: boolean }>('/x')
        expect(res.data).toEqual({ ok: true })
        expect(res.status).toBe(200)
        expect(res.statusText).toBe('OK')
        expect(res.headers['x-h']).toBe('v')
    })

    it('returns undefined for 204 No Content', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValueOnce(
            buildResponse({ status: 204, statusText: 'No Content' }),
        )
        const res = await fetchRequestDetailed<undefined>('/x')
        expect(res.data).toBeUndefined()
        expect(res.status).toBe(204)
    })

    it('honors responseType=text', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValueOnce(
            buildResponse({ body: 'raw payload' }),
        )
        const res = await fetchRequestDetailed<string>('/x', { responseType: 'text' })
        expect(res.data).toBe('raw payload')
    })

    it('throws NormalizedHttpError with status for !response.ok', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValueOnce(
            buildResponse({
                body: { message: 'forbidden', code: 'F' },
                status: 403,
                statusText: 'Forbidden',
            }),
        )
        await expect(fetchRequestDetailed('/x')).rejects.toMatchObject({
            status: 403,
            message: 'forbidden',
            code: 'F',
        })
    })

    it('throws "Network request failed" when fetch rejects (non-abort)', async () => {
        ;(global.fetch as jest.Mock).mockRejectedValueOnce(new TypeError('socket'))
        await expect(fetchRequestDetailed('/x')).rejects.toMatchObject({
            message: 'Network request failed',
        })
    })

    it('propagates AbortError unchanged', async () => {
        const abortErr = Object.assign(new Error('abort'), { name: 'AbortError' })
        ;(global.fetch as jest.Mock).mockRejectedValueOnce(abortErr)
        await expect(fetchRequestDetailed('/x')).rejects.toBe(abortErr)
    })
})

describe('auth token caching', () => {
    it('resolves the session once and reuses the token across requests', async () => {
        mockGetSession.mockResolvedValue({ user: { apiAccessToken: 'TOK' } })
        ;(global.fetch as jest.Mock).mockResolvedValue(buildResponse({ body: { ok: true } }))

        await fetchRequestDetailed('/a')
        await fetchRequestDetailed('/b')

        expect(mockGetSession).toHaveBeenCalledTimes(1)
        const second = (global.fetch as jest.Mock).mock.calls[1][1].headers
        expect(second.authorization).toBe('Bearer TOK')
    })

    it('single-flights concurrent cold-start requests into one getSession call', async () => {
        mockGetSession.mockResolvedValue({ user: { apiAccessToken: 'TOK' } })
        ;(global.fetch as jest.Mock).mockResolvedValue(buildResponse({ body: { ok: true } }))

        await Promise.all([
            fetchRequestDetailed('/a'),
            fetchRequestDetailed('/b'),
            fetchRequestDetailed('/c'),
        ])

        expect(mockGetSession).toHaveBeenCalledTimes(1)
    })

    it('clears the cached token on 401 so the next request re-resolves the session', async () => {
        mockGetSession.mockResolvedValue({ user: { apiAccessToken: 'TOK' } })
        ;(global.fetch as jest.Mock)
            .mockResolvedValueOnce(buildResponse({ status: 401, statusText: 'Unauthorized' }))
            .mockResolvedValueOnce(buildResponse({ body: { ok: true } }))

        await expect(fetchRequestDetailed('/x')).rejects.toMatchObject({ status: 401 })
        await fetchRequestDetailed('/y')

        expect(mockGetSession).toHaveBeenCalledTimes(2)
    })

    it('does not let an in-flight getSession overwrite a token set by the bridge', async () => {
        let resolveSession!: (v: unknown) => void
        mockGetSession.mockReturnValueOnce(
            new Promise(r => {
                resolveSession = r
            }),
        )
        ;(global.fetch as jest.Mock).mockResolvedValue(buildResponse({ body: { ok: true } }))

        const pending = fetchRequestDetailed('/a') // cold start → getSession in-flight
        setAuthToken('BRIDGE') // bridge writes a fresh token mid-flight
        resolveSession({ user: { apiAccessToken: 'STALE' } }) // stale session resolves
        await pending

        // even the originating request must use BRIDGE, never the superseded STALE
        const originating = (global.fetch as jest.Mock).mock.calls[0][1].headers
        expect(originating.authorization).toBe('Bearer BRIDGE')

        ;(global.fetch as jest.Mock).mockClear()
        await fetchRequestDetailed('/b')
        const headers = (global.fetch as jest.Mock).mock.calls[0][1].headers
        expect(headers.authorization).toBe('Bearer BRIDGE')
    })

    it('caches null on logout (setAuthToken) and serves it without re-resolving', async () => {
        let resolveSession!: (v: unknown) => void
        mockGetSession.mockReturnValueOnce(
            new Promise(r => {
                resolveSession = r
            }),
        )
        ;(global.fetch as jest.Mock).mockResolvedValue(buildResponse({ body: { ok: true } }))

        const pending = fetchRequestDetailed('/a') // cold start → getSession in-flight
        setAuthToken(null) // logout caches the null token mid-flight
        resolveSession({ user: { apiAccessToken: 'STALE' } }) // stale session resolves, must not win
        await pending

        // the originating request must not carry the superseded STALE token either
        const originating = (global.fetch as jest.Mock).mock.calls[0][1].headers
        expect(originating.authorization).toBeUndefined()

        mockGetSession.mockClear()
        ;(global.fetch as jest.Mock).mockClear()
        await fetchRequestDetailed('/b')

        expect(mockGetSession).not.toHaveBeenCalled() // null is a resolved cache hit
        const headers = (global.fetch as jest.Mock).mock.calls[0][1].headers
        expect(headers.authorization).toBeUndefined()
    })

    it('caches a token-less session instead of re-resolving it every request', async () => {
        mockGetSession.mockResolvedValue({ user: {} }) // authenticated, no apiAccessToken
        ;(global.fetch as jest.Mock).mockResolvedValue(buildResponse({ body: { ok: true } }))

        await fetchRequestDetailed('/a')
        await fetchRequestDetailed('/b')

        expect(mockGetSession).toHaveBeenCalledTimes(1)
        const headers = (global.fetch as jest.Mock).mock.calls[1][1].headers
        expect(headers.authorization).toBeUndefined()
    })

    it('stops re-resolving the session after a persistent 401 (no getSession storm)', async () => {
        mockGetSession.mockResolvedValue({ user: { apiAccessToken: 'TOK' } })
        ;(global.fetch as jest.Mock).mockResolvedValue(
            buildResponse({ status: 401, statusText: 'Unauthorized' }),
        )

        await expect(fetchRequestDetailed('/a')).rejects.toMatchObject({ status: 401 })
        await expect(fetchRequestDetailed('/b')).rejects.toMatchObject({ status: 401 })
        await expect(fetchRequestDetailed('/c')).rejects.toMatchObject({ status: 401 })

        // first 401 clears + re-resolves once; later 401s do not re-resolve
        expect(mockGetSession).toHaveBeenCalledTimes(2)
    })

    it('ignores a 401 once the token has succeeded (authorization, not auth)', async () => {
        mockGetSession.mockResolvedValue({ user: { apiAccessToken: 'TOK' } })
        ;(global.fetch as jest.Mock)
            .mockResolvedValueOnce(buildResponse({ body: { ok: true } })) // /a → validates token
            .mockResolvedValueOnce(buildResponse({ status: 401, statusText: 'Unauthorized' })) // /b authz 401
            .mockResolvedValue(buildResponse({ body: { ok: true } })) // /c

        await fetchRequestDetailed('/a') // resolve #1, 200 → validated
        await expect(fetchRequestDetailed('/b')).rejects.toMatchObject({ status: 401 })
        await fetchRequestDetailed('/c')

        // a 401 on a validated token must not clear the cache or re-resolve
        expect(mockGetSession).toHaveBeenCalledTimes(1)
        const headers = (global.fetch as jest.Mock).mock.calls[2][1].headers
        expect(headers.authorization).toBe('Bearer TOK')
    })

    it('re-arms the breaker when the token changes (setAuthToken)', async () => {
        mockGetSession.mockResolvedValue({ user: { apiAccessToken: 'BAD' } })
        ;(global.fetch as jest.Mock).mockResolvedValue(
            buildResponse({ status: 401, statusText: 'Unauthorized' }),
        )

        await expect(fetchRequestDetailed('/a')).rejects.toMatchObject({ status: 401 }) // resolve #1, trip
        await expect(fetchRequestDetailed('/b')).rejects.toMatchObject({ status: 401 }) // resolve #2, breaker holds
        expect(mockGetSession).toHaveBeenCalledTimes(2)

        setAuthToken('GOOD') // new token re-arms validation + breaker
        await expect(fetchRequestDetailed('/c')).rejects.toMatchObject({ status: 401 }) // cached GOOD → trip again
        await expect(fetchRequestDetailed('/d')).rejects.toMatchObject({ status: 401 }) // resolve #3

        expect(mockGetSession).toHaveBeenCalledTimes(3)
    })

    it('omits the Authorization header when there is no token', async () => {
        mockGetSession.mockResolvedValue(null)
        ;(global.fetch as jest.Mock).mockResolvedValueOnce(buildResponse({ body: { ok: true } }))

        await fetchRequestDetailed('/x')

        const headers = (global.fetch as jest.Mock).mock.calls[0][1].headers
        expect(headers.authorization).toBeUndefined()
    })
})

describe('auth token caching (server path)', () => {
    // On the server, a module-level cache would leak one user's token to another.
    // The !isBrowser branch must resolve the session fresh every time.
    const originalWindow = global.window

    afterEach(() => {
        global.window = originalWindow
        jest.resetModules()
    })

    it('never caches the token across requests when window is undefined', async () => {
        jest.resetModules()
        // @ts-expect-error simulate a server environment (no window)
        delete global.window

        const serverGetSession = jest
            .fn()
            .mockResolvedValue({ user: { apiAccessToken: 'TOK' } })
        jest.doMock('next-auth/react', () => ({ getSession: serverGetSession }))
        jest.doMock('@/config/featureFlags', () => ({ isFeatureEnabled: () => false }))

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { fetchRequestDetailed: serverFetch } = require('../fetchClient')
        global.fetch = jest
            .fn()
            .mockResolvedValue(buildResponse({ body: { ok: true } })) as any

        await serverFetch('/a')
        await serverFetch('/b')

        expect(serverGetSession).toHaveBeenCalledTimes(2)
    })
})

describe('fetchRequest (data-only)', () => {
    it('unwraps data from fetchRequestDetailed', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValueOnce(
            buildResponse({ body: { value: 42 } }),
        )
        const data = await fetchRequest<{ value: number }>('/x')
        expect(data).toEqual({ value: 42 })
    })
})
