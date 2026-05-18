import { getSession } from 'next-auth/react'

import { fetchRequest, fetchRequestDetailed } from '../fetchClient'

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

describe('fetchRequest (data-only)', () => {
    it('unwraps data from fetchRequestDetailed', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValueOnce(
            buildResponse({ body: { value: 42 } }),
        )
        const data = await fetchRequest<{ value: number }>('/x')
        expect(data).toEqual({ value: 42 })
    })
})
