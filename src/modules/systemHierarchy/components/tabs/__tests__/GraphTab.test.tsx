import { render, screen } from '@testing-library/react'
import React from 'react'

import type { SystemLeaf } from '../../../types'
import { GraphTabContainer } from '../GraphTab.cont'

jest.mock('../../graph/RelationshipGraph.cont', () => ({
    RelationshipGraphContainer: ({ rootUid }: { rootUid?: string | null }) => (
        <div data-testid="relationship-graph-stub" data-root-uid={rootUid ?? ''} />
    ),
}))

const system: SystemLeaf = {
    uid: 'sys-42',
    name: 'Beam Diagnostics',
    systemCode: 'BD-001',
    physicalItem: null,
    parentPath: null,
} as SystemLeaf

describe('GraphTabContainer', () => {
    it('renders RelationshipGraphContainer with the system uid as rootUid', () => {
        render(<GraphTabContainer system={system} />)
        const stub = screen.getByTestId('relationship-graph-stub')
        expect(stub).toHaveAttribute('data-root-uid', 'sys-42')
    })
})
