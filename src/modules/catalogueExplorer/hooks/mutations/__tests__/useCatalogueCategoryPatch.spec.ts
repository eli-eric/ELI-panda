import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import React from 'react'

const fetchMock = jest.fn().mockResolvedValue({
    data: { uid: 'cat-1', name: 'X', code: 'x' },
    status: 200,
    statusText: 'OK',
    headers: {},
})

jest.mock('@/core/http/fetchClient', () => ({
    fetchRequestDetailed: (...args: unknown[]) => fetchMock(...args),
    fetchRequest: jest.fn(),
}))

jest.mock('sonner', () => ({ toast: { promise: jest.fn() } }))
jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

describe('useCatalogueCategoryPatch', () => {
    let qc: QueryClient
    const wrapper = ({ children }: { children: React.ReactNode }) =>
        React.createElement(QueryClientProvider, { client: qc }, children)

    beforeEach(() => {
        qc = new QueryClient({
            defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        })
        fetchMock.mockClear()
    })

    it('PATCHes /catalogue/category/{uid} with body', async () => {
        const { useCatalogueCategoryPatch } = await import('../useCatalogueCategoryPatch')
        const { result } = renderHook(() => useCatalogueCategoryPatch('cat-1'), { wrapper })

        await act(async () => {
            await result.current.patchCategory({ name: 'Renamed', code: 'renamed' })
        })

        const [url, options] = fetchMock.mock.calls[0]
        expect(url).toMatch(/\/catalogue\/category\/cat-1$/)
        expect(options).toMatchObject({
            method: 'PATCH',
            body: { name: 'Renamed', code: 'renamed' },
        })
    })

    it('sends systemType as { uid, name } object', async () => {
        const { useCatalogueCategoryPatch } = await import('../useCatalogueCategoryPatch')
        const { result } = renderHook(() => useCatalogueCategoryPatch('cat-1'), { wrapper })

        await act(async () => {
            await result.current.patchCategory({
                systemType: { uid: 'st-1', name: 'System X' },
            })
        })

        const [, options] = fetchMock.mock.calls[0]
        expect(options.body).toEqual({ systemType: { uid: 'st-1', name: 'System X' } })
    })

    it('sends systemType: null to clear', async () => {
        const { useCatalogueCategoryPatch } = await import('../useCatalogueCategoryPatch')
        const { result } = renderHook(() => useCatalogueCategoryPatch('cat-1'), { wrapper })

        await act(async () => {
            await result.current.patchCategory({ systemType: null })
        })

        const [, options] = fetchMock.mock.calls[0]
        expect(options.body).toEqual({ systemType: null })
    })

    it('invalidates category detail + tree + history + edit query keys', async () => {
        const { useCatalogueCategoryPatch } = await import('../useCatalogueCategoryPatch')
        const { result } = renderHook(() => useCatalogueCategoryPatch('cat-1'), { wrapper })
        const invalidateSpy = jest.spyOn(qc, 'invalidateQueries')

        await act(async () => {
            await result.current.patchCategory({ name: 'X' })
        })

        await waitFor(() => {
            const keys = invalidateSpy.mock.calls.map(
                c => (c[0] as { queryKey: string[] }).queryKey[0],
            )
            expect(keys).toEqual(
                expect.arrayContaining([
                    'catalogueCategoryDetail',
                    'catalogueCategoriesTree',
                    'catalogueCategoryHistory',
                    'catalogueCategoryEdit',
                ]),
            )
        })
        invalidateSpy.mockRestore()
    })
})
