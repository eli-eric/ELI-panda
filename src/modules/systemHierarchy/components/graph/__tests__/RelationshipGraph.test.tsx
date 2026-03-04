import { render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { RelationshipGraphComponent } from '../RelationshipGraph.comp'

const msgs: Record<string, string> = {
    'systemHierarchy.graph.title': 'Relationship Graph',
    'systemHierarchy.graph.noNodes': 'No systems to display',
    'systemHierarchy.graph.noConnectedNodes':
        'No connected systems for selected relationship filters',
}

const renderWithIntl = (ui: React.JSX.Element) =>
    render(
        <IntlProvider locale="en" messages={msgs}>
            {ui}
        </IntlProvider>,
    )

describe('RelationshipGraphComponent', () => {
    it('shows loading state', () => {
        renderWithIntl(<RelationshipGraphComponent nodes={[]} edges={[]} isLoading={true} />)
        expect(screen.getByText('Relationship Graph...')).toBeInTheDocument()
    })

    it('shows empty state when no nodes', () => {
        renderWithIntl(<RelationshipGraphComponent nodes={[]} edges={[]} isLoading={false} />)
        expect(screen.getByText('No systems to display')).toBeInTheDocument()
    })

    it('shows connected-empty state when relationship filter is active', () => {
        renderWithIntl(
            <RelationshipGraphComponent
                nodes={[]}
                edges={[]}
                isLoading={false}
                isRelationshipFilterActive={true}
            />,
        )
        expect(
            screen.getByText('No connected systems for selected relationship filters'),
        ).toBeInTheDocument()
    })

    it('renders ReactFlow when nodes exist', () => {
        const nodes = [{ id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Test' } }]
        renderWithIntl(<RelationshipGraphComponent nodes={nodes} edges={[]} isLoading={false} />)
        expect(screen.getByTestId('relationship-graph')).toBeInTheDocument()
    })
})
