import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { HIERARCHY_VIEWS } from '../../../types/constants'
import { ViewSwitcher } from '../ViewSwitcher.comp'

const msgs: Record<string, string> = {
    'systemHierarchy.graph.viewTree': 'Tree View',
    'systemHierarchy.graph.viewGraph': 'Graph View',
}

const renderWithIntl = (ui: React.ReactElement) =>
    render(
        <IntlProvider locale="en" messages={msgs}>
            {ui}
        </IntlProvider>,
    )

describe('ViewSwitcher', () => {
    it('renders tree and graph buttons', () => {
        renderWithIntl(
            <ViewSwitcher activeView={HIERARCHY_VIEWS.TREE} onViewChange={jest.fn()} />,
        )
        expect(screen.getByText('Tree View')).toBeInTheDocument()
        expect(screen.getByText('Graph View')).toBeInTheDocument()
    })

    it('highlights active tree view', () => {
        renderWithIntl(
            <ViewSwitcher activeView={HIERARCHY_VIEWS.TREE} onViewChange={jest.fn()} />,
        )
        const treeBtn = screen.getByText('Tree View').closest('button')
        expect(treeBtn).toHaveAttribute('data-state', 'on')
    })

    it('highlights active graph view', () => {
        renderWithIntl(
            <ViewSwitcher activeView={HIERARCHY_VIEWS.GRAPH} onViewChange={jest.fn()} />,
        )
        const graphBtn = screen.getByText('Graph View').closest('button')
        expect(graphBtn).toHaveAttribute('data-state', 'on')
    })

    it('calls onViewChange when clicking graph button', () => {
        const onViewChange = jest.fn()
        renderWithIntl(
            <ViewSwitcher activeView={HIERARCHY_VIEWS.TREE} onViewChange={onViewChange} />,
        )
        fireEvent.click(screen.getByText('Graph View'))
        expect(onViewChange).toHaveBeenCalledWith(HIERARCHY_VIEWS.GRAPH)
    })

    it('calls onViewChange when clicking tree button', () => {
        const onViewChange = jest.fn()
        renderWithIntl(
            <ViewSwitcher activeView={HIERARCHY_VIEWS.GRAPH} onViewChange={onViewChange} />,
        )
        fireEvent.click(screen.getByText('Tree View'))
        expect(onViewChange).toHaveBeenCalledWith(HIERARCHY_VIEWS.TREE)
    })
})
