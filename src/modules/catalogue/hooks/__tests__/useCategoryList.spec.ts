import { mockSonner, renderHookWithProviders } from '@/testutils'

let mockCategoryUidReturn: string | undefined = undefined
jest.mock('../useCategoryUid', () => ({
    useCategoryUid: () => mockCategoryUidReturn,
}))

const mockUseGraphQL = jest.fn()
jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: (...args: unknown[]) => mockUseGraphQL(...args),
}))

jest.mock('sonner', () => mockSonner())

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { useCategoryList } = require('../useCategoryList')

describe('useCategoryList', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockUseGraphQL.mockReturnValue({
            data: {
                catalogueCategories: [
                    { uid: 'c-1', name: 'A' },
                    { uid: 'c-2', name: 'B' },
                ],
            },
            isLoading: false,
            error: null,
            refetch: jest.fn(),
        })
    })

    it('filters by parentCategory uid when URL uid present', () => {
        mockCategoryUidReturn = 'parent-uid'
        renderHookWithProviders(() => useCategoryList())
        expect(mockUseGraphQL).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
                variables: { where: { parentCategory: { uid: 'parent-uid' } } },
            }),
        )
    })

    it('queries root categories (parentCategoryAggregate count 0) when no URL uid', () => {
        mockCategoryUidReturn = undefined
        renderHookWithProviders(() => useCategoryList())
        expect(mockUseGraphQL).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
                variables: { where: { parentCategoryAggregate: { count: 0 } } },
            }),
        )
    })

    it('returns catalogueCategories from response', () => {
        mockCategoryUidReturn = undefined
        const { result } = renderHookWithProviders(() => useCategoryList())
        expect(result.current.catalogueCategories).toHaveLength(2)
        expect(result.current.loading).toBe(false)
    })

    it('exposes refetch function', () => {
        const refetch = jest.fn()
        mockUseGraphQL.mockReturnValue({
            data: { catalogueCategories: [] },
            isLoading: false,
            error: null,
            refetch,
        })
        mockCategoryUidReturn = undefined
        const { result } = renderHookWithProviders(() => useCategoryList())
        expect(result.current.refetch).toBe(refetch)
    })
})
