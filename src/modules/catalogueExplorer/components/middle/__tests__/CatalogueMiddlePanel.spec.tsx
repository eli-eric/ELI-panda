import { render, screen } from '@testing-library/react'
import React from 'react'

let mockNav = {
    selectedCategoryUid: null as string | null,
    selectedItemUid: null as string | null,
    isCategoryDetailView: false,
}

jest.mock('../../../hooks/useCatalogueNavigation', () => ({
    useCatalogueNavigation: () => mockNav,
}))

jest.mock('../CatalogueItemDetailView.cont', () => ({
    CatalogueItemDetailViewContainer: () => <div data-testid="item-detail" />,
}))
jest.mock('../CategoryDetailView.cont', () => ({
    CategoryDetailViewContainer: () => <div data-testid="category-detail" />,
}))
jest.mock('../CatalogueItemsPanel.cont', () => ({
    CatalogueItemsPanelContainer: () => <div data-testid="items-panel" />,
}))

import { CatalogueMiddlePanel } from '../CatalogueMiddlePanel.cont'

describe('CatalogueMiddlePanel', () => {
    beforeEach(() => {
        mockNav = {
            selectedCategoryUid: null,
            selectedItemUid: null,
            isCategoryDetailView: false,
        }
    })

    it('renders CatalogueItemsPanel when no params', () => {
        render(<CatalogueMiddlePanel />)
        expect(screen.getByTestId('items-panel')).toBeInTheDocument()
    })

    it('renders CatalogueItemsPanel when only category selected', () => {
        mockNav.selectedCategoryUid = 'cat-1'
        render(<CatalogueMiddlePanel />)
        expect(screen.getByTestId('items-panel')).toBeInTheDocument()
    })

    it('renders CategoryDetailView when category + view=categoryDetail', () => {
        mockNav.selectedCategoryUid = 'cat-1'
        mockNav.isCategoryDetailView = true
        render(<CatalogueMiddlePanel />)
        expect(screen.getByTestId('category-detail')).toBeInTheDocument()
    })

    it('renders CatalogueItemDetailView when item selected', () => {
        mockNav.selectedItemUid = 'item-1'
        render(<CatalogueMiddlePanel />)
        expect(screen.getByTestId('item-detail')).toBeInTheDocument()
    })

    it('item detail takes precedence over category detail view', () => {
        mockNav.selectedItemUid = 'item-1'
        mockNav.selectedCategoryUid = 'cat-1'
        mockNav.isCategoryDetailView = true
        render(<CatalogueMiddlePanel />)
        expect(screen.getByTestId('item-detail')).toBeInTheDocument()
        expect(screen.queryByTestId('category-detail')).not.toBeInTheDocument()
    })
})
