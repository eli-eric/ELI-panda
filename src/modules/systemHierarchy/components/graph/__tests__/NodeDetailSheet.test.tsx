import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import type { RelationshipGraphNode } from '../../../types/graph'
import { NodeDetailSheet } from '../NodeDetailSheet.comp'

const msgs: Record<string, string> = {
    'systemHierarchy.graph.nodeDetail.title': 'System Detail',
    'systemHierarchy.graph.nodeDetail.viewFullDetail': 'View Full Detail',
    'systemHierarchy.fields.name': 'Name',
    'systemHierarchy.fields.systemCode': 'System Code',
    'systemHierarchy.fields.systemLevel': 'System Level',
    'systemHierarchy.fields.systemType': 'System Type',
}

const mockNode: RelationshipGraphNode = {
    uid: 'n1',
    name: 'Pump A',
    systemCode: 'SYS-001',
    systemLevel: 'KEY_SYSTEMS',
    systemType: { uid: 'st1', name: 'Pump' },
}

const renderSheet = (props: { node: RelationshipGraphNode; onViewFullDetail?: () => void }) =>
    render(
        <IntlProvider locale="en" messages={msgs}>
            <NodeDetailSheet {...props} />
        </IntlProvider>,
    )

describe('NodeDetailSheet', () => {
    it('renders node name and code', () => {
        renderSheet({ node: mockNode })
        expect(screen.getByText('Pump A')).toBeInTheDocument()
        expect(screen.getByText('SYS-001')).toBeInTheDocument()
    })

    it('renders system level and type', () => {
        renderSheet({ node: mockNode })
        expect(screen.getByText('KEY_SYSTEMS')).toBeInTheDocument()
        expect(screen.getByText('Pump')).toBeInTheDocument()
    })

    it('renders View Full Detail button when handler provided', () => {
        const onViewFullDetail = jest.fn()
        renderSheet({ node: mockNode, onViewFullDetail })
        fireEvent.click(screen.getByText('View Full Detail'))
        expect(onViewFullDetail).toHaveBeenCalled()
    })

    it('does not render View Full Detail when no handler', () => {
        renderSheet({ node: mockNode })
        expect(screen.queryByText('View Full Detail')).not.toBeInTheDocument()
    })
})
