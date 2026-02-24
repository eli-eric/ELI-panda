import { render, screen } from '@testing-library/react'
import { ReactFlowProvider } from '@xyflow/react'
import React from 'react'

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
        <ReactFlowProvider>
            <SystemNode {...(props as any)} />
        </ReactFlowProvider>,
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
})
