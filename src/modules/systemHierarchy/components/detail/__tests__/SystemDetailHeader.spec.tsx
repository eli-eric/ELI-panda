import { render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import type { SystemLeaf } from '../../../types'
import { SystemDetailHeader } from '../SystemDetailHeader.comp'

jest.mock('../../shared/SystemBreadcrumbs.comp', () => ({
    SystemBreadcrumbs: () => <div data-testid="breadcrumbs-stub" />,
}))
jest.mock('../ActionsDropdown.comp', () => ({
    ActionsDropdown: () => <div data-testid="actions-stub" />,
}))

const messages: Record<string, string> = {
    'systemHierarchy.detail.backToLeaves': 'Back to list',
    'systemHierarchy.detail.updating': 'Updating…',
}

const system = { uid: 'sys-1', name: 'Test System', systemCode: 'S-1', parentPath: null } as unknown as SystemLeaf

const renderHeader = (isRefreshing?: boolean) =>
    render(
        <IntlProvider locale="en" messages={messages}>
            <SystemDetailHeader
                system={system}
                onBack={jest.fn()}
                onSelectAncestor={jest.fn()}
                isRefreshing={isRefreshing}
            />
        </IntlProvider>,
    )

describe('SystemDetailHeader', () => {
    it('shows the refreshing spinner while a navigation refetch is in flight', () => {
        renderHeader(true)
        expect(screen.getByTestId('system-hierarchy-detail-refreshing')).toBeInTheDocument()
    })

    it('hides the spinner when not refreshing', () => {
        renderHeader(false)
        expect(
            screen.queryByTestId('system-hierarchy-detail-refreshing'),
        ).not.toBeInTheDocument()
    })

    it('hides the spinner by default (prop omitted)', () => {
        renderHeader()
        expect(
            screen.queryByTestId('system-hierarchy-detail-refreshing'),
        ).not.toBeInTheDocument()
    })
})
