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
    })
})
