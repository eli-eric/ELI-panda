import { render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import type { RelationshipGraphEdge } from '../../../types/graph'
import { EdgeDetailSheet } from '../EdgeDetailSheet.comp'

const msgs: Record<string, string> = {
    'systemHierarchy.graph.edgeDetail.title': 'Relationship Detail',
    'systemHierarchy.graph.edgeDetail.source': 'Source',
    'systemHierarchy.graph.edgeDetail.target': 'Target',
    'systemHierarchy.graph.edgeDetail.type': 'Type',
    'systemHierarchy.graph.edgeDetail.description': 'Description',
}

const mockEdge: RelationshipGraphEdge = {
    uid: 'e1',
    source: 'n1',
    target: 'n2',
    relationship: 'IS_POWERED_BY',
    description: 'UPS powers server',
}

const renderSheet = (props: Partial<React.ComponentProps<typeof EdgeDetailSheet>> = {}) =>
    render(
        <IntlProvider locale="en" messages={msgs}>
            <EdgeDetailSheet
                edge={mockEdge}
                sourceName="Pump A"
                targetName="Motor B"
                {...props}
            />
        </IntlProvider>,
    )

describe('EdgeDetailSheet', () => {
    it('renders source and target names', () => {
        renderSheet()
        expect(screen.getByText('Pump A')).toBeInTheDocument()
        expect(screen.getByText('Motor B')).toBeInTheDocument()
    })

    it('renders relationship type label', () => {
        renderSheet()
        expect(screen.getByText('Is Powered By')).toBeInTheDocument()
    })

    it('renders description', () => {
        renderSheet()
        expect(screen.getByText('UPS powers server')).toBeInTheDocument()
    })
})
