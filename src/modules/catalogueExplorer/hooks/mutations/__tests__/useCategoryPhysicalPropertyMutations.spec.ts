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

describe('useCategoryPhysicalPropertyMutations', () => {
    let qc: QueryClient
    const wrapper = ({ children }: { children: React.ReactNode }) =>
        React.createElement(QueryClientProvider, { client: qc }, children)

    beforeEach(() => {
        qc = new QueryClient({
            defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        })
        fetchMock.mockReset()
        fetchMock.mockResolvedValue({
            data: { uid: 'pp1', name: 'PP1' },
            status: 200,
            statusText: 'OK',
            headers: {},
        })
    })

    it('create POSTs to /category/{uid}/physical-property', async () => {
        const { useCategoryPhysicalPropertyMutations } = await import(
            '../useCategoryPhysicalPropertyMutations'
        )
        const { result } = renderHook(
            () => useCategoryPhysicalPropertyMutations('cat-1'),
            { wrapper },
        )

        await act(async () => {
            await result.current.createPhysicalProperty({
                name: 'Weight',
                type: { uid: 'num' },
            })
        })

        const [url, options] = fetchMock.mock.calls[0]
        expect(url).toMatch(/\/catalogue\/category\/cat-1\/physical-property$/)
        expect(options.method).toBe('POST')
    })

    it('update PATCHes /category/{uid}/physical-property/{pid}', async () => {
        const { useCategoryPhysicalPropertyMutations } = await import(
            '../useCategoryPhysicalPropertyMutations'
        )
        const { result } = renderHook(
            () => useCategoryPhysicalPropertyMutations('cat-1'),
            { wrapper },
        )

        await act(async () => {
            await result.current.updatePhysicalProperty('pp-1', { name: 'Mass' })
        })

        const [url, options] = fetchMock.mock.calls[0]
        expect(url).toMatch(/\/catalogue\/category\/cat-1\/physical-property\/pp-1$/)
        expect(options.method).toBe('PATCH')
    })

    it('delete DELETEs /category/{uid}/physical-property/{pid}', async () => {
        const { useCategoryPhysicalPropertyMutations } = await import(
            '../useCategoryPhysicalPropertyMutations'
        )
        const { result } = renderHook(
            () => useCategoryPhysicalPropertyMutations('cat-1'),
            { wrapper },
        )

        await act(async () => {
            await result.current.deletePhysicalProperty('pp-1')
        })

        const [url, options] = fetchMock.mock.calls[0]
        expect(url).toMatch(/\/catalogue\/category\/cat-1\/physical-property\/pp-1$/)
        expect(options.method).toBe('DELETE')
    })
})
