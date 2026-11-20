import { render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import type { SystemLeaf } from '../../../types'
import { HIERARCHY_TABS } from '../../../types/constants'
import { SystemDetailTabsContainer } from '../SystemDetailTabs.cont'

let activeTab: string = HIERARCHY_TABS.DETAIL

jest.mock('../../../hooks/useHierarchyNavigation', () => ({
    useHierarchyNavigation: () => ({
        activeTab,
        setActiveTab: jest.fn(),
        selectedParentUid: null,
        selectedLeafUid: 'sys-1',
        selectParent: jest.fn(),
        selectLeaf: jest.fn(),
        goBackToLeaves: jest.fn(),
    }),
}))

jest.mock('../../../hooks/queries/useSystemRelationships', () => ({
    useSystemRelationships: () => ({
        inbound: [],
        outbound: [],
        hasRelationships: false,
        isLoading: false,
        isError: false,
    }),
}))

jest.mock('@/hooks/use-large-screen', () => ({
    useIsLargeScreen: () => true,
}))

jest.mock('../../tabs/DetailTab.cont', () => ({
    DetailTabContainer: () => <div data-testid="detail-tab-stub" />,
}))
jest.mock('../../tabs/PersonsTab.cont', () => ({
    PersonsTabContainer: () => <div data-testid="persons-tab-stub" />,
}))
jest.mock('../../tabs/PhysicalItemTab.cont', () => ({
    PhysicalItemTabContainer: () => <div data-testid="physical-item-tab-stub" />,
}))
jest.mock('../../tabs/SparePartsTab.cont', () => ({
    SparePartsTabContainer: () => <div data-testid="spare-parts-tab-stub" />,
}))
jest.mock('../../tabs/SpareForTab.cont', () => ({
    SpareForTabContainer: () => <div data-testid="spare-for-tab-stub" />,
}))
jest.mock('../../tabs/RelationshipsTab.cont', () => ({
    RelationshipsTabContainer: () => <div data-testid="relationships-tab-stub" />,
}))
jest.mock('../../tabs/AttachmentsTab.cont', () => ({
    AttachmentsTabContainer: () => <div data-testid="attachments-tab-stub" />,
}))
jest.mock('../../tabs/HistoryTab.cont', () => ({
    HistoryTabContainer: () => <div data-testid="history-tab-stub" />,
}))
jest.mock('../../tabs/GraphTab.cont', () => ({
    GraphTabContainer: ({ system }: { system: SystemLeaf }) => (
        <div data-testid="graph-tab-stub" data-root-uid={system.uid} />
    ),
}))

const messages: Record<string, string> = {
    'systemHierarchy.tabs.detail': 'Detail',
    'systemHierarchy.tabs.persons': 'Persons',
    'systemHierarchy.tabs.physicalItem': 'Physical Item',
    'systemHierarchy.tabs.spareParts': 'Spare Parts',
    'systemHierarchy.tabs.spareFor': 'Spare For',
    'systemHierarchy.tabs.relationships': 'Relationships',
    'systemHierarchy.tabs.attachments': 'Attachments',
    'systemHierarchy.tabs.history': 'History',
    'systemHierarchy.tabs.graph': 'Graph',
}

const system: SystemLeaf = {
    uid: 'sys-1',
    name: 'Test System',
    systemCode: 'SYS-001',
    physicalItem: null,
    parentPath: null,
} as SystemLeaf

const renderTabs = () =>
    render(
        <IntlProvider locale="en" messages={messages}>
            <SystemDetailTabsContainer system={system} />
        </IntlProvider>,
    )

describe('SystemDetailTabsContainer — Graph tab integration', () => {
    beforeEach(() => {
        activeTab = HIERARCHY_TABS.DETAIL
    })

    it('renders the Graph tab trigger after History', () => {
        renderTabs()
        const triggers = screen.getAllByRole('tab')
        const labels = triggers.map(t => t.textContent)
        const historyIdx = labels.indexOf('History')
        const graphIdx = labels.indexOf('Graph')
        expect(graphIdx).toBeGreaterThan(-1)
        expect(graphIdx).toBe(historyIdx + 1)
    })

    it('Graph tab trigger has the expected testid', () => {
        renderTabs()
        expect(screen.getByTestId('system-hierarchy-tab-graph')).toBeInTheDocument()
    })

    it('renders GraphTabContainer with system uid when activeTab="graph"', () => {
        activeTab = HIERARCHY_TABS.GRAPH
        renderTabs()
        const stub = screen.getByTestId('graph-tab-stub')
        expect(stub).toHaveAttribute('data-root-uid', 'sys-1')
    })
})
