import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SystemHistoryFeed } from '../SystemHistoryFeed.comp'
import type { HistoryResponse } from '../types'
import { HISTORY_TYPE } from '../types'

const entry = (overrides: Partial<HistoryResponse>): HistoryResponse => ({
    uid: 'h-1',
    changedAt: '2026-11-26T10:00:00.000+01:00',
    changedBy: 'Lovelace Ada',
    historyType: HISTORY_TYPE.GENERAL,
    action: 'UPDATE',
    detail: { systemUid: '', systemName: '', direction: 'IN' },
    ...overrides,
})

describe('SystemHistoryFeed', () => {
    it('flags changes made outside responsibility', () => {
        renderWithProviders(
            <SystemHistoryFeed history={[entry({ outsideResponsibility: true, changes: [] })]} />,
        )
        expect(screen.getByTestId('history-outside-responsibility')).toBeInTheDocument()
    })

    it('renders full-list (codebookList) changes as comma-separated names', () => {
        renderWithProviders(
            <SystemHistoryFeed
                history={[
                    entry({
                        changes: [
                            {
                                field: 'operators',
                                type: 'codebookList',
                                oldValue: [{ uid: 'e-1', name: 'Ada' }],
                                newValue: [
                                    { uid: 'e-1', name: 'Ada' },
                                    { uid: 'e-2', name: 'Grace' },
                                ],
                            },
                        ],
                    }),
                ]}
            />,
        )
        expect(screen.getByText('Ada, Grace')).toBeInTheDocument()
        expect(screen.queryByTestId('history-outside-responsibility')).not.toBeInTheDocument()
    })

    it('renders an added relationship with the other system name', () => {
        renderWithProviders(
            <SystemHistoryFeed
                history={[
                    entry({
                        changes: [
                            {
                                field: 'IS_POWERED_FROM',
                                type: 'relationship',
                                oldValue: null,
                                newValue: {
                                    uid: 's-2',
                                    name: 'Power Supply',
                                    direction: 'outbound',
                                },
                            },
                        ],
                    }),
                ]}
            />,
        )
        expect(screen.getByText('Power Supply')).toBeInTheDocument()
    })

    it('renders a create audit as "created" with the initial values set, not changed', () => {
        renderWithProviders(
            <SystemHistoryFeed
                history={[
                    entry({
                        action: 'INSERT',
                        changes: [
                            { field: 'name', type: 'string', oldValue: '', newValue: 'Pump' },
                            {
                                field: 'location',
                                type: 'codebook',
                                oldValue: null,
                                newValue: { uid: 'l-1', name: 'Hall A' },
                            },
                        ],
                    }),
                ]}
            />,
        )
        expect(screen.getByTestId('history-created')).toBeInTheDocument()
        expect(screen.getByText(/created this system/i)).toBeInTheDocument()
        expect(screen.queryByText(/changed/i)).not.toBeInTheDocument()
        expect(screen.getByText('Pump')).toBeInTheDocument()
        expect(screen.getByText('Hall A')).toBeInTheDocument()
    })

    it('renders a create audit without field changes (legacy INSERT)', () => {
        renderWithProviders(<SystemHistoryFeed history={[entry({ action: 'INSERT' })]} />)
        expect(screen.getByTestId('history-created')).toBeInTheDocument()
    })
})
