import { mockSonner, mockUsePermission, renderHookWithProviders } from '@/testutils'

let mockCategoryUidReturn: string | undefined = undefined
jest.mock('../useCategoryUid', () => ({
    useCategoryUid: () => mockCategoryUidReturn,
}))

const mockUseGraphQL = jest.fn()
jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: (...args: unknown[]) => mockUseGraphQL(...args),
}))

jest.mock('sonner', () => mockSonner())
jest.mock('@/hooks/usePermission', () => mockUsePermission())

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { useCategory } = require('../useCategory')

describe('useCategory', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockUseGraphQL.mockReturnValue({
            data: { catalogueCategories: [{ uid: 'c-1', name: 'Cat' }] },
            isLoading: false,
            error: null,
        })
    })

    it('prefers URL uid over argument uid', () => {
        mockCategoryUidReturn = 'url-uid'
        renderHookWithProviders(() => useCategory('arg-uid'))
        expect(mockUseGraphQL).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({ variables: { uid: 'url-uid' } }),
        )
    })

    it('falls back to argument uid when URL uid absent', () => {
        mockCategoryUidReturn = undefined
        renderHookWithProviders(() => useCategory('arg-uid'))
        expect(mockUseGraphQL).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({ variables: { uid: 'arg-uid' } }),
        )
    })

    it('returns first catalogue category from response', () => {
        mockCategoryUidReturn = 'c-1'
        const { result } = renderHookWithProviders(() => useCategory())
        expect(result.current.catalogueCategory).toEqual({ uid: 'c-1', name: 'Cat' })
        expect(result.current.loading).toBe(false)
    })

    it('returns undefined when no results', () => {
        mockUseGraphQL.mockReturnValue({
            data: { catalogueCategories: [] },
            isLoading: false,
            error: null,
        })
        mockCategoryUidReturn = 'c-1'
        const { result } = renderHookWithProviders(() => useCategory())
        expect(result.current.catalogueCategory).toBeUndefined()
    })
})
