import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { SystemDetailViewContainer } from '../SystemDetailView.cont'

const mockClearSelection = jest.fn()

jest.mock('../../../hooks/useHierarchyNavigation', () => ({
    useHierarchyNavigation: () => ({
        selectedLeafUid: 'sys-1',
        goBackToLeaves: jest.fn(),
        selectParent: jest.fn(),
        clearSelection: mockClearSelection,
    }),
}))

let mockSystem: { uid: string; name: string } | null = null
let mockIsLoading = false

jest.mock('../../../hooks/queries/useSystemDetail', () => ({
    useSystemDetail: () => ({ system: mockSystem, isLoading: mockIsLoading }),
}))

jest.mock('../SystemDetailHeader.comp', () => ({
    SystemDetailHeader: () => <div data-testid="detail-header-stub" />,
}))
jest.mock('../SystemDetailTabs.cont', () => ({
    SystemDetailTabsContainer: () => <div data-testid="detail-tabs-stub" />,
}))

const messages: Record<string, string> = {
    'systemHierarchy.detail.notFoundTitle': 'System not found',
    'systemHierarchy.detail.notFoundDescription':
        'The system may have been deleted or the link is no longer valid.',
    'systemHierarchy.detail.notFoundBack': 'Back to hierarchy',
}

const renderView = () =>
    render(
        <IntlProvider locale="en" messages={messages}>
            <SystemDetailViewContainer />
        </IntlProvider>,
    )

describe('SystemDetailViewContainer', () => {
    beforeEach(() => {
        mockSystem = null
        mockIsLoading = false
        mockClearSelection.mockClear()
    })

    it('renders skeleton while loading', () => {
        mockIsLoading = true
        renderView()
        expect(screen.queryByTestId('system-detail-not-found')).not.toBeInTheDocument()
        expect(screen.queryByTestId('detail-tabs-stub')).not.toBeInTheDocument()
    })

    it('renders not-found state when query settles without a match', () => {
        renderView()
        expect(screen.getByTestId('system-detail-not-found')).toBeInTheDocument()
        expect(screen.getByText('System not found')).toBeInTheDocument()
    })

    it('not-found back button clears the selection', () => {
        renderView()
        fireEvent.click(screen.getByText('Back to hierarchy'))
        expect(mockClearSelection).toHaveBeenCalled()
    })

    it('renders header and tabs when system is loaded', () => {
        mockSystem = { uid: 'sys-1', name: 'Test System' }
        renderView()
        expect(screen.getByTestId('detail-header-stub')).toBeInTheDocument()
        expect(screen.getByTestId('detail-tabs-stub')).toBeInTheDocument()
    })
})
