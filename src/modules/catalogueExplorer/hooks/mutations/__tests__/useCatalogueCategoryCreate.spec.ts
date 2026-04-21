import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react'
import { request } from 'graphql-request'
import React from 'react'

jest.mock('graphql-request', () => ({ request: jest.fn() }))
jest.mock('sonner', () => ({ toast: { promise: jest.fn() } }))
jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

const mockRequest = request as jest.Mock

const mockSuccess = {
    createCatalogueCategories: {
        catalogueCategories: [{ uid: 'new-uid', name: 'Widget', code: 'WID' }],
    },
}

describe('useCatalogueCategoryCreate', () => {
    const createWrapper = () => {
        const qc = new QueryClient({
            defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        })
        const Wrapper = ({ children }: { children: React.ReactNode }) =>
            React.createElement(QueryClientProvider, { client: qc }, children)
        Wrapper.displayName = 'TestWrapper'
        return Wrapper
    }

    beforeEach(() => {
        jest.clearAllMocks()
        mockRequest.mockResolvedValue(mockSuccess)
    })

    it('connects parentCategory when parentUid provided', async () => {
        const { useCatalogueCategoryCreate } = await import('../useCatalogueCategoryCreate')
        const { result } = renderHook(() => useCatalogueCategoryCreate(), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            await result.current.createCategory({
                name: 'Widget',
                code: 'WID',
                parentUid: 'parent-1',
            })
        })

        const vars = mockRequest.mock.calls[0][2]
        expect(vars.input[0]).toMatchObject({
            name: 'Widget',
            code: 'WID',
            parentCategory: { connect: { where: { node: { uid: 'parent-1' } } } },
        })
    })

    it('omits parentCategory when parentUid is null (top-level)', async () => {
        const { useCatalogueCategoryCreate } = await import('../useCatalogueCategoryCreate')
        const { result } = renderHook(() => useCatalogueCategoryCreate(), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            await result.current.createCategory({ name: 'Widget', code: 'WID', parentUid: null })
        })

        const vars = mockRequest.mock.calls[0][2]
        expect(vars.input[0].parentCategory).toBeUndefined()
    })

    it('returns newly created category', async () => {
        const { useCatalogueCategoryCreate } = await import('../useCatalogueCategoryCreate')
        const { result } = renderHook(() => useCatalogueCategoryCreate(), {
            wrapper: createWrapper(),
        })

        let created
        await act(async () => {
            created = await result.current.createCategory({ name: 'Widget', code: 'WID' })
        })

        expect(created).toMatchObject({ uid: 'new-uid' })
    })
})
