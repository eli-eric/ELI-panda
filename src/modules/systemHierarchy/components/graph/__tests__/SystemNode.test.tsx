import { fireEvent, render, screen } from '@testing-library/react'
import { ReactFlowProvider } from '@xyflow/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { SystemNode } from '../SystemNode.comp'

// ReactFlow node props minimal mock
const defaultProps = {
    id: 'n1',
    type: 'systemNode' as const,
    selected: false,
    isConnectable: true,
    zIndex: 0,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    data: {
        name: 'Pump A',
        systemCode: 'SYS-001',
        systemLevel: 'KEY_SYSTEMS',
        systemType: 'Pump',
        nodeClasses: 'border-orange-600 bg-orange-50 text-orange-900',
    },
}

const renderNode = (props = defaultProps) =>
    render(
        <IntlProvider
            locale="en"
            messages={{
                'systemHierarchy.graph.selection.source': 'Source',
                'systemHierarchy.graph.selection.target': 'Target',
                'systemHierarchy.graph.actions.expand': 'Expand',
                'systemHierarchy.graph.actions.viewDetail': 'View Detail',
                'systemHierarchy.graph.actions.loadMore': 'Load 10 More',
                'systemHierarchy.copy.copySystem': 'Copy System',
                'systemHierarchy.copy.pasteSystem': 'Paste System',
            }}
        >
            <ReactFlowProvider>
                <SystemNode {...(props as any)} />
            </ReactFlowProvider>
        </IntlProvider>,
    )

describe('SystemNode', () => {
    it('renders node name', () => {
        renderNode()
        expect(screen.getByText('Pump A')).toBeInTheDocument()
    })

    it('renders system code badge', () => {
        renderNode()
        expect(screen.getByText('SYS-001')).toBeInTheDocument()
    })

    it('renders system type', () => {
        renderNode()
        expect(screen.getByText('Pump')).toBeInTheDocument()
    })

    it('renders selection badge when selected', () => {
        const props = {
            ...defaultProps,
            data: {
                ...defaultProps.data,
                selected: true,
                selectionIndex: 0,
            },
        }
        renderNode(props)
        expect(screen.getByText('Source')).toBeInTheDocument()
    })

    it('has testid', () => {
        renderNode()
        expect(screen.getByTestId('system-node')).toBeInTheDocument()
    })

    it('shows context menu on right-click with Expand and View Detail', () => {
        renderNode()
        fireEvent.contextMenu(screen.getByTestId('system-node'))
        expect(screen.getByText('Expand')).toBeInTheDocument()
        expect(screen.getByText('View Detail')).toBeInTheDocument()
    })

    it('shows load more action when node has hidden relationships', () => {
        const props = {
            ...defaultProps,
            data: {
                ...defaultProps.data,
                hiddenRelationshipsCount: 5,
                onLoadMore: jest.fn(),
            },
        }

        renderNode(props)
        fireEvent.contextMenu(screen.getByTestId('system-node'))

        expect(screen.getByText('Load 10 More')).toBeInTheDocument()
    })

    it('calls onLoadMore with node id when load more is clicked', () => {
        const onLoadMore = jest.fn()
        const props = {
            ...defaultProps,
            data: {
                ...defaultProps.data,
                hiddenRelationshipsCount: 5,
                onLoadMore,
            },
        }

        renderNode(props)
        fireEvent.contextMenu(screen.getByTestId('system-node'))
        fireEvent.click(screen.getByText('Load 10 More'))

        expect(onLoadMore).toHaveBeenCalledWith('n1')
    })

    it('renders hidden relationship badge', () => {
        const props = {
            ...defaultProps,
            data: {
                ...defaultProps.data,
                hiddenRelationshipsCount: 5,
            },
        }

        renderNode(props)

        expect(screen.getByTestId('system-node-hidden-badge')).toBeInTheDocument()
        expect(screen.getByText('+5')).toBeInTheDocument()
    })

    it('calls onExpand with node id when Expand is clicked', () => {
        const onExpand = jest.fn()
        const props = {
            ...defaultProps,
            data: { ...defaultProps.data, onExpand },
        }
        renderNode(props)
        fireEvent.contextMenu(screen.getByTestId('system-node'))
        fireEvent.click(screen.getByText('Expand'))
        expect(onExpand).toHaveBeenCalledWith('n1')
    })

    it('calls onViewDetail with node id when View Detail is clicked', () => {
        const onViewDetail = jest.fn()
        const props = {
            ...defaultProps,
            data: { ...defaultProps.data, onViewDetail },
        }
        renderNode(props)
        fireEvent.contextMenu(screen.getByTestId('system-node'))
        fireEvent.click(screen.getByText('View Detail'))
        expect(onViewDetail).toHaveBeenCalledWith('n1')
    })

    it('shows Copy System in context menu when onCopySystem provided', () => {
        const props = {
            ...defaultProps,
            data: { ...defaultProps.data, onCopySystem: jest.fn() },
        }
        renderNode(props)
        fireEvent.contextMenu(screen.getByTestId('system-node'))
        expect(screen.getByText('Copy System')).toBeInTheDocument()
    })

    it('calls onCopySystem with node id when Copy System clicked', () => {
        const onCopySystem = jest.fn()
        const props = {
            ...defaultProps,
            data: { ...defaultProps.data, onCopySystem },
        }
        renderNode(props)
        fireEvent.contextMenu(screen.getByTestId('system-node'))
        fireEvent.click(screen.getByText('Copy System'))
        expect(onCopySystem).toHaveBeenCalledWith('n1')
    })

    it('shows disabled Paste System when copiedSystemUid equals node id', () => {
        const props = {
            ...defaultProps,
            data: {
                ...defaultProps.data,
                onPasteSystem: jest.fn(),
                copiedSystemUid: 'n1',
            },
        }
        renderNode(props)
        fireEvent.contextMenu(screen.getByTestId('system-node'))
        const pasteItem = screen.getByTestId('context-paste-system')
        expect(pasteItem).toHaveAttribute('data-disabled')
    })

    it('shows enabled Paste System when copiedSystemUid differs from node id', () => {
        const props = {
            ...defaultProps,
            data: {
                ...defaultProps.data,
                onPasteSystem: jest.fn(),
                copiedSystemUid: 'other-node',
            },
        }
        renderNode(props)
        fireEvent.contextMenu(screen.getByTestId('system-node'))
        const pasteItem = screen.getByTestId('context-paste-system')
        expect(pasteItem).not.toHaveAttribute('data-disabled')
    })
})
