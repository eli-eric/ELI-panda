import { fetchRequestDetailed } from '@/core/http/fetchClient'

import axiosInstance from '../axiosInstance'

jest.mock('@/core/http/fetchClient', () => ({
    fetchRequestDetailed: jest.fn(),
}))

const mockFetch = fetchRequestDetailed as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('axiosInstance wrapper', () => {
    it.each([
        ['get', 'GET'],
        ['post', 'POST'],
        ['put', 'PUT'],
        ['delete', 'DELETE'],
    ] as const)('%s dispatches HTTP %s to fetchRequestDetailed', async (method, expected) => {
        mockFetch.mockResolvedValueOnce({
            data: { ok: true },
            status: 200,
            statusText: 'OK',
            headers: { 'x-h': 'v' },
        })

        const fn = (axiosInstance as any)[method]
        const res =
            method === 'get' || method === 'delete'
                ? await fn('/url')
                : await fn('/url', { body: 1 })

        expect(mockFetch).toHaveBeenCalledWith(
            '/url',
            expect.objectContaining({ method: expected }),
        )
        expect(res.data).toEqual({ ok: true })
        expect(res.status).toBe(200)
        expect(res.statusText).toBe('OK')
        expect(res.headers).toEqual({ 'x-h': 'v' })
        expect(res.config).toEqual({})
    })

    it('throws AxiosError-shaped object on failure', async () => {
        mockFetch.mockRejectedValueOnce({
            isAxiosError: true,
            response: { status: 500 },
        })
        await expect(axiosInstance.get('/x')).rejects.toMatchObject({
            isAxiosError: true,
            response: { status: 500 },
        })
    })

    it('passes body through for POST', async () => {
        mockFetch.mockResolvedValueOnce({
            data: null,
            status: 201,
            statusText: 'Created',
            headers: {},
        })
        await axiosInstance.post('/x', { a: 1 })
        expect(mockFetch.mock.calls[0][1]).toMatchObject({ method: 'POST', body: { a: 1 } })
    })
})
