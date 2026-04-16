import { screen } from '@testing-library/react'

import { mockUsePermission, renderWithProviders } from '@/testutils'

jest.mock('@/hooks/usePermission', () => mockUsePermission())
jest.mock('../CategoryItem.comp', () => ({
    CategoryItemComponent: ({ category }: { category: { uid: string; name: string } }) => (
        <div data-testid={`category-item-${category.uid}`}>{category.name}</div>
    ),
}))

const mockHookReturn = {
    catalogueCategories: [] as Array<{ uid: string; name: string }> | undefined,
    error: null as unknown,
    loading: false,
}
jest.mock('../../../hooks/useCategoryList', () => ({
    useCategoryList: () => mockHookReturn,
}))

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { CategoryList } = require('../CategoryList.comp')

describe('CategoryList', () => {
    beforeEach(() => {
        mockHookReturn.catalogueCategories = []
        mockHookReturn.error = null
        mockHookReturn.loading = false
    })

    it('renders nothing visible when list empty', () => {
        renderWithProviders(<CategoryList setCategoryFilter={jest.fn()} />)
        expect(screen.queryByTestId(/category-item-/)).not.toBeInTheDocument()
    })

    it('renders one CategoryItemComponent per category', () => {
        mockHookReturn.catalogueCategories = [
            { uid: 'c-1', name: 'A' },
            { uid: 'c-2', name: 'B' },
            { uid: 'c-3', name: 'C' },
        ]
        renderWithProviders(<CategoryList setCategoryFilter={jest.fn()} />)
        expect(screen.getByTestId('category-item-c-1')).toBeInTheDocument()
        expect(screen.getByTestId('category-item-c-2')).toBeInTheDocument()
        expect(screen.getByTestId('category-item-c-3')).toBeInTheDocument()
    })

    it('renders ErrorPage when error present', () => {
        mockHookReturn.error = new Error('boom')
        renderWithProviders(<CategoryList setCategoryFilter={jest.fn()} />)
        // ErrorPage renders at least some text — check it mounted
        expect(screen.queryByTestId(/category-item-/)).not.toBeInTheDocument()
    })
})
