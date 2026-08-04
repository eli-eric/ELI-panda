import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { SystemLevel } from '@/types/gql/graphql'

import { useSystemLeavesCount } from '../../../hooks/queries/useSystemLeavesCount'
import type { HierarchyNode } from '../../../types'
import { TreeNode } from '../TreeNode.comp'

jest.mock('../../../hooks/queries/useSystemLeavesCount', () => ({
    useSystemLeavesCount: jest.fn(),
}))

const mockUseSystemLeavesCount = useSystemLeavesCount as jest.MockedFunction<
    typeof useSystemLeavesCount
>

const baseNode: HierarchyNode = {
    uid: 'node-1',
    name: 'Node 1',
    systemCode: 'SYS-001',
    systemLevel: SystemLevel.KeySystems,
    hasLeafChildren: true,
    children: [],
}

const messages = {
    'systemHierarchy.copy.copySystem': 'Copy System',
    'systemHierarchy.copy.pasteSystem': 'Paste System',
    'systemHierarchy.create.menuItem': 'Create System',
    'systemHierarchy.delete.menuItem': 'Delete System',
    'systemHierarchy.tree.hasDirectLeaves': 'Has end systems directly under it',
}

const renderTreeNode = (props: Partial<React.ComponentProps<typeof TreeNode>> = {}) =>
    render(
        <IntlProvider locale="en" messages={messages}>
            <TreeNode
                node={baseNode}
                depth={0}
                isExpanded={false}
                isSelected={false}
                onToggle={jest.fn()}
                onSelect={jest.fn()}
                {...props}
            />
        </IntlProvider>,
    )

describe('TreeNode', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders loading state for async leaves count', () => {
        mockUseSystemLeavesCount.mockReturnValue({
            count: 0,
            isLoading: true,
            error: null,
        })

        renderTreeNode()

        expect(mockUseSystemLeavesCount).toHaveBeenCalledWith('node-1')
        expect(screen.getByText('…')).toBeInTheDocument()
    })

    it('renders resolved leaves count', () => {
        mockUseSystemLeavesCount.mockReturnValue({
            count: 7,
            isLoading: false,
            error: null,
        })

        renderTreeNode()

        expect(screen.getByText('7')).toBeInTheDocument()
    })

    describe('direct end-systems marker', () => {
        beforeEach(() => {
            mockUseSystemLeavesCount.mockReturnValue({ count: 7, isLoading: false, error: null })
        })

        it('marks a node that has end systems directly under it', () => {
            renderTreeNode()
            expect(screen.getByTestId('tree-node-direct-leaves-node-1')).toBeInTheDocument()
        })

        it('exposes the marker to assistive tech, not just to hover', () => {
            // The tooltip is hover-only; without a name the one cue that end systems are
            // hiding under this node is invisible to screen-reader users.
            renderTreeNode()
            expect(
                screen.getByRole('img', { name: 'Has end systems directly under it' }),
            ).toBeInTheDocument()
        })

        it('omits the marker when every end system sits deeper', () => {
            renderTreeNode({ node: { ...baseNode, hasLeafChildren: false } })
            expect(screen.queryByTestId('tree-node-direct-leaves-node-1')).toBeNull()
        })

        it('leaves the count badge untouched — it stays the total, not the direct one', () => {
            renderTreeNode()
            expect(screen.getByText('7')).toBeInTheDocument()
            expect(mockUseSystemLeavesCount).toHaveBeenCalledWith('node-1')
        })
    })

    it('calls onToggle and does not trigger onSelect when chevron button is clicked', () => {
        mockUseSystemLeavesCount.mockReturnValue({
            count: 3,
            isLoading: false,
            error: null,
        })

        const onToggle = jest.fn()
        const onSelect = jest.fn()
        const nodeWithChildren: HierarchyNode = {
            ...baseNode,
            children: [
                {
                    uid: 'child-1',
                    name: 'Child 1',
                    systemCode: null,
                    systemLevel: SystemLevel.SubsystemsAndParts,
                    hasLeafChildren: false,
                    children: [],
                },
            ],
        }

        renderTreeNode({ node: nodeWithChildren, onToggle, onSelect })

        fireEvent.click(screen.getByRole('button', { name: 'Expand' }))

        expect(onToggle).toHaveBeenCalledWith('node-1')
        expect(onSelect).not.toHaveBeenCalled()
    })

    describe('context menu', () => {
        beforeEach(() => {
            mockUseSystemLeavesCount.mockReturnValue({ count: 0, isLoading: false, error: null })
        })

        it('shows Copy System on right-click when onCopySystem provided', () => {
            const onCopySystem = jest.fn()
            renderTreeNode({ onCopySystem })

            fireEvent.contextMenu(screen.getByTestId('tree-node-node-1').firstChild!)
            expect(screen.getByText('Copy System')).toBeInTheDocument()
        })

        it('calls onCopySystem with node uid when Copy System clicked', () => {
            const onCopySystem = jest.fn()
            renderTreeNode({ onCopySystem })

            fireEvent.contextMenu(screen.getByTestId('tree-node-node-1').firstChild!)
            fireEvent.click(screen.getByText('Copy System'))
            expect(onCopySystem).toHaveBeenCalledWith('node-1')
        })

        it('shows disabled Paste System when copiedSystemUid is same as node', () => {
            renderTreeNode({
                onCopySystem: jest.fn(),
                onPasteSystem: jest.fn(),
                copiedSystemUid: 'node-1',
            })

            fireEvent.contextMenu(screen.getByTestId('tree-node-node-1').firstChild!)
            const pasteItem = screen.getByTestId('context-paste-system')
            expect(pasteItem).toHaveAttribute('data-disabled')
        })

        it('shows enabled Paste System when copiedSystemUid differs from node', () => {
            renderTreeNode({
                onCopySystem: jest.fn(),
                onPasteSystem: jest.fn(),
                copiedSystemUid: 'other-node',
            })

            fireEvent.contextMenu(screen.getByTestId('tree-node-node-1').firstChild!)
            const pasteItem = screen.getByTestId('context-paste-system')
            expect(pasteItem).not.toHaveAttribute('data-disabled')
        })

        it('does not show context menu when no copy/paste handlers provided', () => {
            renderTreeNode()

            fireEvent.contextMenu(screen.getByTestId('tree-node-node-1').firstChild!)
            expect(screen.queryByText('Copy System')).not.toBeInTheDocument()
        })

        it('shows Delete System and calls handler with uid and name', () => {
            const onDeleteSystem = jest.fn()
            renderTreeNode({ onDeleteSystem, canEdit: true })

            fireEvent.contextMenu(screen.getByTestId('tree-node-node-1').firstChild!)
            const deleteItem = screen.getByTestId('context-delete-system')
            expect(deleteItem).not.toHaveAttribute('data-disabled')

            fireEvent.click(deleteItem)
            expect(onDeleteSystem).toHaveBeenCalledWith('node-1', 'Node 1')
        })

        it('disables Delete System and does not fire handler when canEdit is false', () => {
            const onDeleteSystem = jest.fn()
            renderTreeNode({ onDeleteSystem, canEdit: false })

            fireEvent.contextMenu(screen.getByTestId('tree-node-node-1').firstChild!)
            const deleteItem = screen.getByTestId('context-delete-system')
            expect(deleteItem).toHaveAttribute('data-disabled')

            fireEvent.click(deleteItem)
            expect(onDeleteSystem).not.toHaveBeenCalled()
        })

        it('enables Create System when canEdit and parent level allows children, calls handler on click', () => {
            const onCreateSubsystem = jest.fn()
            renderTreeNode({ onCreateSubsystem, canEdit: true })

            fireEvent.contextMenu(screen.getByTestId('tree-node-node-1').firstChild!)
            const createItem = screen.getByTestId('context-create-system')
            expect(createItem).not.toHaveAttribute('data-disabled')

            fireEvent.click(createItem)
            expect(onCreateSubsystem).toHaveBeenCalledWith(
                'node-1',
                'Node 1',
                SystemLevel.KeySystems,
            )
        })

        it('disables Create System under Trash node and does not fire handler', () => {
            const onCreateSubsystem = jest.fn()
            renderTreeNode({
                node: { ...baseNode, systemLevel: SystemLevel.Trash },
                onCreateSubsystem,
                canEdit: true,
            })

            fireEvent.contextMenu(screen.getByTestId('tree-node-node-1').firstChild!)
            const createItem = screen.getByTestId('context-create-system')
            expect(createItem).toHaveAttribute('data-disabled')

            fireEvent.click(createItem)
            expect(onCreateSubsystem).not.toHaveBeenCalled()
        })

        it('disables all three actions when canEdit is false', () => {
            const onCopySystem = jest.fn()
            const onPasteSystem = jest.fn()
            const onCreateSubsystem = jest.fn()
            renderTreeNode({
                onCopySystem,
                onPasteSystem,
                onCreateSubsystem,
                copiedSystemUid: 'other',
                canEdit: false,
            })

            fireEvent.contextMenu(screen.getByTestId('tree-node-node-1').firstChild!)

            expect(screen.getByTestId('context-copy-system')).toHaveAttribute('data-disabled')
            expect(screen.getByTestId('context-paste-system')).toHaveAttribute('data-disabled')
            expect(screen.getByTestId('context-create-system')).toHaveAttribute('data-disabled')

            fireEvent.click(screen.getByTestId('context-copy-system'))
            fireEvent.click(screen.getByTestId('context-paste-system'))
            fireEvent.click(screen.getByTestId('context-create-system'))
            expect(onCopySystem).not.toHaveBeenCalled()
            expect(onPasteSystem).not.toHaveBeenCalled()
            expect(onCreateSubsystem).not.toHaveBeenCalled()
        })
    })
})
