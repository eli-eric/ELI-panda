import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import { request } from 'graphql-request'
import React from 'react'

jest.mock('graphql-request', () => ({
    request: jest.fn(),
}))

jest.mock('sonner', () => ({ toast: { promise: jest.fn() } }))

jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

const mockRequest = request as jest.Mock

const mockSuccessResponse = {
    updateCatalogueItems: {
        catalogueItems: [
            {
                uid: 'item-1',
                name: 'Widget',
                catalogueNumber: 'WID-001',
                description: 'desc',
                manufacturerUrl: null,
                catalogueCategory: { uid: 'cat-1', name: 'Cat 1' },
                supplier: null,
            },
        ],
    },
    updatedByResolver: 'ok',
}

describe('useCatalogueItemFieldUpdate', () => {
    let queryClient: QueryClient

    const createWrapper = () => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false },
            },
        })
        const Wrapper = ({ children }: { children: React.ReactNode }) =>
            React.createElement(QueryClientProvider, { client: queryClient }, children)
        Wrapper.displayName = 'TestWrapper'
        return Wrapper
    }

    beforeEach(() => {
        jest.clearAllMocks()
        mockRequest.mockResolvedValue(mockSuccessResponse)
    })

    it('sends scalar field update with updatedByResolver params', async () => {
        const { useCatalogueItemFieldUpdate } = await import('../useCatalogueItemFieldUpdate')

        const { result } = renderHook(() => useCatalogueItemFieldUpdate(), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            await result.current.updateField('item-1', 'name', 'New Name')
        })

        await waitFor(() => expect(mockRequest).toHaveBeenCalledTimes(1))
        const variables = mockRequest.mock.calls[0][2]
        expect(variables).toMatchObject({
            where: { uid: 'item-1' },
            update: { name: 'New Name' },
            node: 'CatalogueItem',
            nodeUid: 'item-1',
            action: 'UPDATE',
        })
    })

    it('sends category relationship connect+disconnect', async () => {
        const { useCatalogueItemFieldUpdate } = await import('../useCatalogueItemFieldUpdate')
        const current = { catalogueCategory: { uid: 'old-cat' } }

        const { result } = renderHook(() => useCatalogueItemFieldUpdate(current), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            await result.current.updateField('item-1', 'categoryUid', 'new-cat')
        })

        const variables = mockRequest.mock.calls[0][2]
        expect(variables.update).toEqual({
            catalogueCategory: {
                connect: { where: { node: { uid: 'new-cat' } } },
                disconnect: { where: { node: { uid: 'old-cat' } } },
            },
        })
    })

    it('omits disconnect when there is no current relationship value', async () => {
        const { useCatalogueItemFieldUpdate } = await import('../useCatalogueItemFieldUpdate')

        const { result } = renderHook(
            () => useCatalogueItemFieldUpdate({ catalogueCategory: null }),
            { wrapper: createWrapper() },
        )

        await act(async () => {
            await result.current.updateField('item-1', 'categoryUid', 'new-cat')
        })

        const variables = mockRequest.mock.calls[0][2]
        expect(variables.update.catalogueCategory.connect).toBeDefined()
        expect(variables.update.catalogueCategory.disconnect).toBeUndefined()
    })

    it('invalidates catalogueItemDetail, history, and tree queries on success', async () => {
        const { useCatalogueItemFieldUpdate } = await import('../useCatalogueItemFieldUpdate')

        const { result } = renderHook(() => useCatalogueItemFieldUpdate(), {
            wrapper: createWrapper(),
        })
        const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

        await act(async () => {
            await result.current.updateField('item-1', 'name', 'X')
        })

        await waitFor(() => {
            const keys = invalidateSpy.mock.calls.map(
                c => (c[0] as { queryKey: string[] }).queryKey[0],
            )
            expect(keys).toEqual(
                expect.arrayContaining([
                    'catalogueItemDetail',
                    'catalogueItemHistory',
                    'catalogueCategoriesTree',
                    'catalogueItem',
                ]),
            )
        })

        invalidateSpy.mockRestore()
    })

    it('handles mutation error without hanging isPending', async () => {
        mockRequest.mockRejectedValue(new Error('boom'))
        const { useCatalogueItemFieldUpdate } = await import('../useCatalogueItemFieldUpdate')

        const { result } = renderHook(() => useCatalogueItemFieldUpdate(), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            try {
                await result.current.updateField('item-1', 'name', 'fail')
            } catch {
                // expected
            }
        })

        await waitFor(() => expect(result.current.isPending).toBe(false))
    })
})
