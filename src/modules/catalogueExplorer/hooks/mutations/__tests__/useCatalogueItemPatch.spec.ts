import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import React from 'react'

const fetchMock = jest.fn().mockResolvedValue({
    data: { uid: 'item-1' },
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

describe('useCatalogueItemPatch', () => {
    let qc: QueryClient
    const wrapper = ({ children }: { children: React.ReactNode }) =>
        React.createElement(QueryClientProvider, { client: qc }, children)

    beforeEach(() => {
        qc = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false },
            },
        })
        fetchMock.mockClear()
    })

    it('patchItem sends PATCH to /catalogue/item/{uid} with body', async () => {
        const { useCatalogueItemPatch } = await import('../useCatalogueItemPatch')
        const { result } = renderHook(() => useCatalogueItemPatch('item-1'), { wrapper })

        await act(async () => {
            await result.current.patchItem({ name: 'Renamed' })
        })

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
        const [url, options] = fetchMock.mock.calls[0]
        expect(url).toMatch(/\/catalogue\/item\/item-1$/)
        expect(options).toMatchObject({ method: 'PATCH', body: { name: 'Renamed' } })
    })

    it('patchDetail wraps single detail into details array', async () => {
        const { useCatalogueItemPatch } = await import('../useCatalogueItemPatch')
        const { result } = renderHook(() => useCatalogueItemPatch('item-1'), { wrapper })

        const detail = {
            property: { uid: 'prop-1' },
            propertyGroup: 'Specs',
            value: '240V',
        }

        await act(async () => {
            await result.current.patchDetail(detail as any)
        })

        const [, options] = fetchMock.mock.calls[0]
        expect(options.method).toBe('PATCH')
        expect(options.body).toEqual({ details: [detail] })
    })

    it('invalidates catalogueItem, catalogueItems, and history query keys on success', async () => {
        const { useCatalogueItemPatch } = await import('../useCatalogueItemPatch')
        const { result } = renderHook(() => useCatalogueItemPatch('item-1'), { wrapper })
        const invalidateSpy = jest.spyOn(qc, 'invalidateQueries')

        await act(async () => {
            await result.current.patchItem({ name: 'X' })
        })

        await waitFor(() => {
            const keys = invalidateSpy.mock.calls.map(
                c => (c[0] as { queryKey: string[] }).queryKey[0],
            )
            expect(keys).toEqual(
                expect.arrayContaining([
                    'catalogueItem',
                    'catalogueItems',
                    'catalogueItemHistory',
                ]),
            )
        })
        invalidateSpy.mockRestore()
    })

    it('handles error without hanging isPending', async () => {
        fetchMock.mockRejectedValueOnce(new Error('boom'))
        const { useCatalogueItemPatch } = await import('../useCatalogueItemPatch')
        const { result } = renderHook(() => useCatalogueItemPatch('item-1'), { wrapper })

        await act(async () => {
            try {
                await result.current.patchItem({ name: 'fail' })
            } catch {
                /* expected */
            }
        })

        await waitFor(() => expect(result.current.isPending).toBe(false))
    })
})
