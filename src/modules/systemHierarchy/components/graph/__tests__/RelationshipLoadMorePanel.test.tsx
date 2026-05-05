import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { RelationshipLoadMorePanel } from '../RelationshipLoadMorePanel.comp'

const messages: Record<string, string> = {
    'systemHierarchy.graph.loadMore.title': 'More Relationships',
    'systemHierarchy.graph.loadMore.hidden': 'Hidden relationships: {count}',
    'systemHierarchy.graph.loadMore.shownOfTotal': '{shown}/{total}',
    'systemHierarchy.graph.loadMore.button': '+10',
    'systemHierarchy.graph.loadMore.loading': 'Loading...',
    'systemHierarchy.graph.loadMore.backToGraph': 'Back to graph',
}

const renderPanel = (ui: React.JSX.Element) =>
    render(
        <IntlProvider locale="en" messages={messages}>
            {ui}
        </IntlProvider>,
    )

describe('RelationshipLoadMorePanel', () => {
    it('renders rows and hidden total', () => {
        renderPanel(
            <RelationshipLoadMorePanel
                hiddenTotal={12}
                rows={[
                    { type: 'IS_POWERED_FROM', shown: 20, total: 30, isLoading: false },
                    { type: 'IS_COOLED_FROM', shown: 20, total: 25, isLoading: false },
                ]}
                onLoadMore={jest.fn()}
            />,
        )

        expect(screen.getByText('Hidden relationships: 12')).toBeInTheDocument()
        expect(screen.getByTestId('load-more-row-IS_POWERED_FROM')).toBeInTheDocument()
        expect(screen.getByText('20/30')).toBeInTheDocument()
    })

    it('calls onLoadMore for selected type', () => {
        const onLoadMore = jest.fn()
        renderPanel(
            <RelationshipLoadMorePanel
                hiddenTotal={10}
                rows={[{ type: 'IS_POWERED_FROM', shown: 20, total: 30, isLoading: false }]}
                onLoadMore={onLoadMore}
            />,
        )

        fireEvent.click(screen.getByRole('button', { name: '+10' }))
        expect(onLoadMore).toHaveBeenCalledWith('IS_POWERED_FROM')
    })

    it('renders back button when node scope active', () => {
        const onBackToGraph = jest.fn()
        renderPanel(
            <RelationshipLoadMorePanel
                hiddenTotal={10}
                rows={[{ type: 'IS_POWERED_FROM', shown: 20, total: 30, isLoading: false }]}
                showBackToGraph={true}
                onBackToGraph={onBackToGraph}
                onLoadMore={jest.fn()}
            />,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Back to graph' }))
        expect(onBackToGraph).toHaveBeenCalled()
    })
})
