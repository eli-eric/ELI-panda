import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

jest.mock('@/hooks/usePermission', () => ({
    usePermission: () => true,
}))

jest.mock('@/modules/shared/imageManager/v2/ImageGalleryV2', () => ({
    ImageGalleryV2: () => null,
}))

import { ItemSidebar } from '../ItemSidebar.comp'

const baseItem = {
    uid: 'item-1',
    name: 'Widget',
    createdAt: '2026-04-01T10:00:00Z',
    createdBy: { fullName: 'Alice' },
    modifiedAt: '2026-04-15T10:00:00Z',
    modifiedBy: { fullName: 'Bob' },
    physicalItemsCount: 3,
    ordersCount: 2,
    relatedItemsCount: 1,
}

describe('ItemSidebar', () => {
    it('renders metadata and statistics', () => {
        render(
            <IntlProvider locale="en" messages={{}}>
                <ItemSidebar
                    item={baseItem as any}
                    onSelectCategory={jest.fn()}
                    onViewRelated={jest.fn()}
                />
            </IntlProvider>,
        )
        expect(screen.getByText('Alice')).toBeInTheDocument()
        expect(screen.getByText('Bob')).toBeInTheDocument()
        expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('calls onSelectCategory when breadcrumb link clicked', () => {
        const onSelectCategory = jest.fn()
        render(
            <IntlProvider locale="en" messages={{}}>
                <ItemSidebar
                    item={
                        {
                            ...baseItem,
                            catalogueCategory: {
                                uid: 'cat-child',
                                name: 'Child',
                                parentPath: [{ uid: 'cat-root', name: 'Root' }],
                            },
                        } as any
                    }
                    onSelectCategory={onSelectCategory}
                    onViewRelated={jest.fn()}
                />
            </IntlProvider>,
        )
        fireEvent.click(screen.getByTestId('item-sidebar-breadcrumb-cat-root'))
        expect(onSelectCategory).toHaveBeenCalledWith('cat-root')
    })

    it('calls onViewRelated when view-related button clicked', () => {
        const onViewRelated = jest.fn()
        render(
            <IntlProvider locale="en" messages={{}}>
                <ItemSidebar
                    item={baseItem as any}
                    onSelectCategory={jest.fn()}
                    onViewRelated={onViewRelated}
                />
            </IntlProvider>,
        )
        fireEvent.click(screen.getByTestId('item-sidebar-view-related'))
        expect(onViewRelated).toHaveBeenCalled()
    })
})
