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

describe('useCategoryGroupMutations', () => {
    let qc: QueryClient
    const wrapper = ({ children }: { children: React.ReactNode }) =>
        React.createElement(QueryClientProvider, { client: qc }, children)

    beforeEach(() => {
        qc = new QueryClient({
            defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        })
        fetchMock.mockReset()
        fetchMock.mockResolvedValue({
            data: { uid: 'g1', name: 'G1', order: 10 },
            status: 200,
            statusText: 'OK',
            headers: {},
        })
    })

    it('createGroup POSTs to /catalogue/category/{uid}/group with body', async () => {
        const { useCategoryGroupMutations } = await import('../useCategoryGroupMutations')
        const { result } = renderHook(() => useCategoryGroupMutations('cat-1'), { wrapper })

        await act(async () => {
            await result.current.createGroup({ name: 'Specs' })
        })

        const [url, options] = fetchMock.mock.calls[0]
        expect(url).toMatch(/\/catalogue\/category\/cat-1\/group$/)
        expect(options).toMatchObject({ method: 'POST', body: { name: 'Specs' } })
    })

    it('updateGroup PATCHes /catalogue/category/{uid}/group/{gid}', async () => {
        const { useCategoryGroupMutations } = await import('../useCategoryGroupMutations')
        const { result } = renderHook(() => useCategoryGroupMutations('cat-1'), { wrapper })

        await act(async () => {
            await result.current.updateGroup('g1', { name: 'Renamed', order: 25 })
        })

        const [url, options] = fetchMock.mock.calls[0]
        expect(url).toMatch(/\/catalogue\/category\/cat-1\/group\/g1$/)
        expect(options).toMatchObject({
            method: 'PATCH',
            body: { name: 'Renamed', order: 25 },
        })
    })

    it('deleteGroup DELETEs /catalogue/category/{uid}/group/{gid}', async () => {
        const { useCategoryGroupMutations } = await import('../useCategoryGroupMutations')
        const { result } = renderHook(() => useCategoryGroupMutations('cat-1'), { wrapper })

        await act(async () => {
            await result.current.deleteGroup('g1')
        })

        const [url, options] = fetchMock.mock.calls[0]
        expect(url).toMatch(/\/catalogue\/category\/cat-1\/group\/g1$/)
        expect(options.method).toBe('DELETE')
    })
})
