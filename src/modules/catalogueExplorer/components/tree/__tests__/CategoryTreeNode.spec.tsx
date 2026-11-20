import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import type { CatalogueCategoryTreeNode } from '../../../types'
import { CategoryTreeNode } from '../CategoryTreeNode.comp'

const makeNode = (
    overrides: Partial<CatalogueCategoryTreeNode> = {},
): CatalogueCategoryTreeNode => ({
    uid: overrides.uid ?? 'n1',
    name: overrides.name ?? 'Node 1',
    code: overrides.code ?? 'N1',
    miniImageUrl: null,
    systemType: null,
    parentCategory: null,
    itemCount: 0,
    children: overrides.children ?? [],
})

const renderNode = (props: Partial<Parameters<typeof CategoryTreeNode>[0]> = {}) =>
    render(
        <IntlProvider locale="en" messages={{}}>
            <CategoryTreeNode
                node={props.node ?? makeNode()}
                depth={props.depth ?? 0}
                isExpanded={props.isExpanded ?? false}
                isSelected={props.isSelected ?? false}
                onToggle={props.onToggle ?? jest.fn()}
                onSelect={props.onSelect ?? jest.fn()}
                search={props.search}
                canEditCategory={props.canEditCategory ?? false}
                canEditItem={props.canEditItem ?? false}
                onCreateSubCategory={props.onCreateSubCategory}
                onCreateItem={props.onCreateItem}
                onEditCategory={props.onEditCategory}
                onCopyCategory={props.onCopyCategory}
                onDeleteCategory={props.onDeleteCategory}
            />
        </IntlProvider>,
    )

describe('CategoryTreeNode context menu permission gating', () => {
    it('renders plain node without context menu when no handlers provided', () => {
        renderNode()
        expect(screen.queryByTestId('context-create-subcategory')).toBeNull()
        expect(screen.queryByTestId('context-create-item')).toBeNull()
    })

    it('renders click on node calling onSelect', async () => {
        const onSelect = jest.fn()
        renderNode({ onSelect })
        fireEvent.click(screen.getByText('Node 1'))
        expect(onSelect).toHaveBeenCalledWith('n1')
    })

    it('invokes onCreateSubCategory with parent uid when context item clicked', async () => {
        const onCreateSubCategory = jest.fn()
        renderNode({
            canEditCategory: true,
            onCreateSubCategory,
            onEditCategory: jest.fn(),
            onCopyCategory: jest.fn(),
            onDeleteCategory: jest.fn(),
        })

        const trigger = screen.getByText('Node 1')
        fireEvent.contextMenu(trigger)

        const menuItem = await screen.findByTestId('context-create-subcategory')
        fireEvent.click(menuItem)
        expect(onCreateSubCategory).toHaveBeenCalledWith('n1')
    })

    it('hides category-edit menu items when canEditCategory is false', async () => {
        renderNode({
            canEditCategory: false,
            canEditItem: true,
            onCreateItem: jest.fn(),
            onCreateSubCategory: jest.fn(),
            onEditCategory: jest.fn(),
            onCopyCategory: jest.fn(),
            onDeleteCategory: jest.fn(),
        })

        const trigger = screen.getByText('Node 1')
        fireEvent.contextMenu(trigger)

        await screen.findByTestId('context-create-item')
        expect(screen.queryByTestId('context-create-subcategory')).toBeNull()
        expect(screen.queryByTestId('context-edit-category')).toBeNull()
        expect(screen.queryByTestId('context-delete-category')).toBeNull()
    })

    it('shows copy and delete items when canEditCategory is true', async () => {
        renderNode({
            canEditCategory: true,
            onCopyCategory: jest.fn(),
            onDeleteCategory: jest.fn(),
            onCreateSubCategory: jest.fn(),
        })

        const trigger = screen.getByText('Node 1')
        fireEvent.contextMenu(trigger)

        expect(await screen.findByTestId('context-copy-category')).toBeInTheDocument()
        expect(screen.getByTestId('context-delete-category')).toBeInTheDocument()
    })
})
