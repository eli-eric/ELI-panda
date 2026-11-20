import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react'
import React from 'react'

const fetchMock = jest.fn()

jest.mock('@/core/http/fetchClient', () => ({
    fetchRequestDetailed: (...args: unknown[]) => fetchMock(...args),
    fetchRequest: jest.fn(),
}))

jest.mock('sonner', () => ({ toast: { promise: jest.fn() } }))
jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

describe('useCategoryPropertyMutations', () => {
    let qc: QueryClient
    const wrapper = ({ children }: { children: React.ReactNode }) =>
        React.createElement(QueryClientProvider, { client: qc }, children)

    beforeEach(() => {
        qc = new QueryClient({
            defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        })
        fetchMock.mockReset()
        fetchMock.mockResolvedValue({
            data: { uid: 'p1', name: 'P1' },
            status: 200,
            statusText: 'OK',
            headers: {},
        })
    })

    it('createProperty POSTs to /category/{uid}/group/{gid}/property', async () => {
        const { useCategoryPropertyMutations } = await import('../useCategoryPropertyMutations')
        const { result } = renderHook(() => useCategoryPropertyMutations('cat-1'), { wrapper })

        await act(async () => {
            await result.current.createProperty('grp-1', {
                name: 'Voltage',
                type: { uid: 'text-type' },
            })
        })

        const [url, options] = fetchMock.mock.calls[0]
        expect(url).toMatch(/\/catalogue\/category\/cat-1\/group\/grp-1\/property$/)
        expect(options).toMatchObject({
            method: 'POST',
            body: { name: 'Voltage', type: { uid: 'text-type' } },
        })
    })

    it('updateProperty PATCHes /category/{uid}/property/{pid}', async () => {
        const { useCategoryPropertyMutations } = await import('../useCategoryPropertyMutations')
        const { result } = renderHook(() => useCategoryPropertyMutations('cat-1'), { wrapper })

        await act(async () => {
            await result.current.updateProperty('prop-1', { name: 'Peak V' })
        })

        const [url, options] = fetchMock.mock.calls[0]
        expect(url).toMatch(/\/catalogue\/category\/cat-1\/property\/prop-1$/)
        expect(options).toMatchObject({
            method: 'PATCH',
            body: { name: 'Peak V' },
        })
    })

    it('updateProperty supports unit clear via null', async () => {
        const { useCategoryPropertyMutations } = await import('../useCategoryPropertyMutations')
        const { result } = renderHook(() => useCategoryPropertyMutations('cat-1'), { wrapper })

        await act(async () => {
            await result.current.updateProperty('prop-1', { unit: null })
        })

        const [, options] = fetchMock.mock.calls[0]
        expect(options.body).toEqual({ unit: null })
    })

    it('updateProperty move between groups via groupUid', async () => {
        const { useCategoryPropertyMutations } = await import('../useCategoryPropertyMutations')
        const { result } = renderHook(() => useCategoryPropertyMutations('cat-1'), { wrapper })

        await act(async () => {
            await result.current.updateProperty('prop-1', { groupUid: 'grp-target' })
        })

        const [, options] = fetchMock.mock.calls[0]
        expect(options.body).toEqual({ groupUid: 'grp-target' })
    })

    it('deleteProperty DELETEs /category/{uid}/property/{pid}', async () => {
        const { useCategoryPropertyMutations } = await import('../useCategoryPropertyMutations')
        const { result } = renderHook(() => useCategoryPropertyMutations('cat-1'), { wrapper })

        await act(async () => {
            await result.current.deleteProperty('prop-1')
        })

        const [url, options] = fetchMock.mock.calls[0]
        expect(url).toMatch(/\/catalogue\/category\/cat-1\/property\/prop-1$/)
        expect(options.method).toBe('DELETE')
    })
})
