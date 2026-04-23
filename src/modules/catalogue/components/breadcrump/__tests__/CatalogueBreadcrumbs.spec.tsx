import { fireEvent, screen } from '@testing-library/react'

import { mockUsePermission, renderWithProviders } from '@/testutils'

jest.mock('@/hooks/usePermission', () => mockUsePermission())
jest.mock('../../categoryEdit/components/AddCateforyButton', () => ({
    AddCategoryButton: () => <div data-testid="add-category-button" />,
}))

const mockHookReturn = { catalogueCategory: null as unknown }
jest.mock('../../../hooks/useCategory', () => ({
    useCategory: () => mockHookReturn,
}))

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { CatalogueBreadcrumbs } = require('../CatalogueBreadcrumbs')

describe('CatalogueBreadcrumbs', () => {
    beforeEach(() => {
        mockHookReturn.catalogueCategory = null
    })

    it('renders home button even when no category', () => {
        renderWithProviders(<CatalogueBreadcrumbs setCategoryFilter={jest.fn()} />)
        expect(screen.getByTestId('add-category-button')).toBeInTheDocument()
        // Home icon renders as svg inside button — find first button
        expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
    })

    it('calls setCategoryFilter(null) when home clicked', () => {
        const setCategoryFilter = jest.fn()
        renderWithProviders(<CatalogueBreadcrumbs setCategoryFilter={setCategoryFilter} />)
        const homeBtn = screen.getAllByRole('button')[0]
        fireEvent.click(homeBtn)
        expect(setCategoryFilter).toHaveBeenCalledWith(null)
    })

    it('renders parentPath breadcrumbs and current category name', () => {
        mockHookReturn.catalogueCategory = {
            uid: 'cat-3',
            name: 'Current',
            parentPath: [
                { uid: 'p-1', name: 'Root' },
                { uid: 'p-2', name: 'Mid' },
            ],
        }
        renderWithProviders(<CatalogueBreadcrumbs setCategoryFilter={jest.fn()} />)
        expect(screen.getByText('Root')).toBeInTheDocument()
        expect(screen.getByText('Mid')).toBeInTheDocument()
        expect(screen.getByText('Current')).toBeInTheDocument()
    })

    it('calls setCategoryFilter with parent on parent click', () => {
        const setCategoryFilter = jest.fn()
        mockHookReturn.catalogueCategory = {
            uid: 'cat-3',
            name: 'Current',
            parentPath: [{ uid: 'p-1', name: 'Root' }],
        }
        renderWithProviders(<CatalogueBreadcrumbs setCategoryFilter={setCategoryFilter} />)
        fireEvent.click(screen.getByText('Root'))
        expect(setCategoryFilter).toHaveBeenCalledWith({ uid: 'p-1', name: 'Root' })
    })

    it('calls setCategoryFilter with current category on current click', () => {
        const setCategoryFilter = jest.fn()
        mockHookReturn.catalogueCategory = {
            uid: 'cat-3',
            name: 'Current',
            parentPath: [{ uid: 'p-1', name: 'Root' }],
        }
        renderWithProviders(<CatalogueBreadcrumbs setCategoryFilter={setCategoryFilter} />)
        fireEvent.click(screen.getByText('Current'))
        expect(setCategoryFilter).toHaveBeenCalledWith({ uid: 'cat-3', name: 'Current' })
    })
})
