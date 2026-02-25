import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

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

        render(
            <TreeNode
                node={baseNode}
                depth={0}
                isExpanded={false}
                isSelected={false}
                onToggle={jest.fn()}
                onSelect={jest.fn()}
            />,
        )

        expect(mockUseSystemLeavesCount).toHaveBeenCalledWith('node-1')
        expect(screen.getByText('…')).toBeInTheDocument()
    })

    it('renders resolved leaves count', () => {
        mockUseSystemLeavesCount.mockReturnValue({
            count: 7,
            isLoading: false,
            error: null,
        })

        render(
            <TreeNode
                node={baseNode}
                depth={0}
                isExpanded={false}
                isSelected={false}
                onToggle={jest.fn()}
                onSelect={jest.fn()}
            />,
        )

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

        render(
            <TreeNode
                node={nodeWithChildren}
                depth={0}
                isExpanded={false}
                isSelected={false}
                onToggle={onToggle}
                onSelect={onSelect}
            />,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Expand' }))

        expect(onToggle).toHaveBeenCalledWith('node-1')
        expect(onSelect).not.toHaveBeenCalled()
    })
})
