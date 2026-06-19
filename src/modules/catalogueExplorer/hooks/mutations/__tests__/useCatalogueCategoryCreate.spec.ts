import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react'
import React from 'react'

const fetchMock = jest.fn().mockResolvedValue({
    data: { uid: 'new-uid', name: 'Widget', code: 'widget' },
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
        fetchMock.mockClear()
    })

    it('POSTs to /catalogue/category with parentUID when parentUid provided', async () => {
        const { useCatalogueCategoryCreate } = await import('../useCatalogueCategoryCreate')
        const { result } = renderHook(() => useCatalogueCategoryCreate(), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            await result.current.createCategory({
                name: 'Widget',
                code: 'widget',
                parentUid: 'parent-1',
            })
        })

        const [url, options] = fetchMock.mock.calls[0]
        expect(url).toMatch(/\/catalogue\/category$/)
        expect(options.method).toBe('POST')
        expect(options.body).toEqual({
            name: 'Widget',
            code: 'widget',
            parentUID: 'parent-1',
        })
    })

    it('omits parentUID when parentUid is null (top-level)', async () => {
        const { useCatalogueCategoryCreate } = await import('../useCatalogueCategoryCreate')
        const { result } = renderHook(() => useCatalogueCategoryCreate(), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            await result.current.createCategory({
                name: 'Widget',
                code: 'widget',
                parentUid: null,
            })
        })

        const [, options] = fetchMock.mock.calls[0]
        expect(options.body.parentUID).toBeUndefined()
    })

    it('returns newly created category from response data', async () => {
        const { useCatalogueCategoryCreate } = await import('../useCatalogueCategoryCreate')
        const { result } = renderHook(() => useCatalogueCategoryCreate(), {
            wrapper: createWrapper(),
        })

        let created
        await act(async () => {
            created = await result.current.createCategory({ name: 'Widget', code: 'widget' })
        })

        expect(created).toMatchObject({ uid: 'new-uid' })
    })
})
