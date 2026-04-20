import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import { request } from 'graphql-request'
import React from 'react'

jest.mock('graphql-request', () => ({ request: jest.fn() }))
jest.mock('sonner', () => ({ toast: { promise: jest.fn() } }))
jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

const mockRequest = request as jest.Mock

const mockSuccess = {
    updateCatalogueCategories: {
        catalogueCategories: [
            {
                uid: 'cat-1',
                name: 'Cat One',
                code: 'C1',
                systemType: null,
            },
        ],
    },
    updatedByResolver: 'ok',
}

describe('useCatalogueCategoryFieldUpdate', () => {
    let queryClient: QueryClient

    const createWrapper = () => {
        queryClient = new QueryClient({
            defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        })
        const Wrapper = ({ children }: { children: React.ReactNode }) =>
            React.createElement(QueryClientProvider, { client: queryClient }, children)
        Wrapper.displayName = 'TestWrapper'
        return Wrapper
    }

    beforeEach(() => {
        jest.clearAllMocks()
        mockRequest.mockResolvedValue(mockSuccess)
    })

    it('sends scalar field update with CatalogueCategory node identifier', async () => {
        const { useCatalogueCategoryFieldUpdate } = await import(
            '../useCatalogueCategoryFieldUpdate'
        )
        const { result } = renderHook(() => useCatalogueCategoryFieldUpdate(), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            await result.current.updateField('cat-1', 'name', 'Renamed')
        })

        const variables = mockRequest.mock.calls[0][2]
        expect(variables).toMatchObject({
            where: { uid: 'cat-1' },
            update: { name: 'Renamed' },
            node: 'CatalogueCategory',
            nodeUid: 'cat-1',
            action: 'UPDATE',
        })
    })

    it('sends systemType relationship connect+disconnect', async () => {
        const { useCatalogueCategoryFieldUpdate } = await import(
            '../useCatalogueCategoryFieldUpdate'
        )
        const current = { systemType: { uid: 'old-type' } }

        const { result } = renderHook(() => useCatalogueCategoryFieldUpdate(current), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            await result.current.updateField('cat-1', 'systemTypeUid', 'new-type')
        })

        const variables = mockRequest.mock.calls[0][2]
        expect(variables.update).toEqual({
            systemType: {
                connect: { where: { node: { uid: 'new-type' } } },
                disconnect: { where: { node: { uid: 'old-type' } } },
            },
        })
    })

    it('invalidates catalogueCategoryDetail, tree, and history on success', async () => {
        const { useCatalogueCategoryFieldUpdate } = await import(
            '../useCatalogueCategoryFieldUpdate'
        )
        const { result } = renderHook(() => useCatalogueCategoryFieldUpdate(), {
            wrapper: createWrapper(),
        })
        const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

        await act(async () => {
            await result.current.updateField('cat-1', 'name', 'X')
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
