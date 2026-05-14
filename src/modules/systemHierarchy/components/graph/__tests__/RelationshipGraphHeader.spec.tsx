import { render, screen } from '@testing-library/react'
import type { PropsWithChildren } from 'react'

import { GRAPH_LAYOUT_MODES } from '../../../types/graph'
import { RelationshipGraphHeader } from '../RelationshipGraphHeader.comp'

jest.mock('../GraphToolbar.comp', () => ({
    GraphToolbar: ({
        children,
        filters,
        systemTypes,
        systemLevels,
    }: PropsWithChildren<{
        filters?: any
        systemTypes?: string[]
        systemLevels?: string[]
    }>) => (
        <div
            data-testid="toolbar"
            data-filters={JSON.stringify(filters ?? {})}
            data-types={(systemTypes ?? []).join(',')}
            data-levels={(systemLevels ?? []).join(',')}
        >
            {children}
        </div>
    ),
}))

jest.mock('../LayoutSwitcher.comp', () => ({
    LayoutSwitcher: ({ activeLayout }: { activeLayout: string }) => (
        <div data-testid="layout-switcher" data-active={activeLayout} />
    ),
}))

describe('RelationshipGraphHeader', () => {
    it('renders GraphToolbar with passed filters/types/levels and embeds LayoutSwitcher', () => {
        render(
            <RelationshipGraphHeader
                filters={{ a: 1 } as any}
                systemTypes={['t1', 't2']}
                systemLevels={['L1']}
                layoutMode={GRAPH_LAYOUT_MODES.VERTICAL}
                onLayoutChange={jest.fn()}
                onSearchChange={jest.fn()}
                onToggleSystemLevel={jest.fn()}
                onSystemTypeChange={jest.fn()}
                onToggleRelationshipType={jest.fn()}
                onResetFilters={jest.fn()}
            />,
        )
        const tb = screen.getByTestId('toolbar')
        expect(tb.dataset.filters).toBe(JSON.stringify({ a: 1 }))
        expect(tb.dataset.types).toBe('t1,t2')
        expect(tb.dataset.levels).toBe('L1')
        const ls = screen.getByTestId('layout-switcher')
        expect(ls.dataset.active).toBe(GRAPH_LAYOUT_MODES.VERTICAL)
    })
})
