import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { HISTORY_TYPE } from '../../../types/constants'
import { HistoryFeeds } from '../HistoryFeeds'

const makeItem = (overrides: Record<string, unknown>) =>
    ({
        uid: 'h-1',
        changedAt: '2025-01-02T00:00:00Z',
        changedBy: 'Alice',
        historyType: HISTORY_TYPE.GENERAL,
        action: 'update',
        detail: {},
        ...overrides,
    }) as any

describe('HistoryFeeds', () => {
    it('shows "no history" placeholder when history undefined', () => {
        renderWithProviders(<HistoryFeeds />)
        expect(screen.getByText(/no history/i)).toBeInTheDocument()
    })

    it('shows placeholder when history empty', () => {
        renderWithProviders(<HistoryFeeds history={[]} />)
        expect(screen.getByText(/no history/i)).toBeInTheDocument()
    })

    it('renders GENERAL history with action text', () => {
        renderWithProviders(
            <HistoryFeeds history={[makeItem({ historyType: HISTORY_TYPE.GENERAL, action: 'update' })]} />,
        )
        expect(screen.getByText('Alice')).toBeInTheDocument()
        expect(screen.getByText(/made update/)).toBeInTheDocument()
    })

    it('renders ITEM history as link to system', () => {
        renderWithProviders(
            <HistoryFeeds
                history={[
                    makeItem({
                        historyType: HISTORY_TYPE.ITEM,
                        detail: { systemUid: 'sys-1', systemName: 'Sys 1' },
                    }),
                ]}
            />,
        )
        const link = screen.getByRole('link', { name: 'Sys 1' })
        expect(link).toHaveAttribute('href', '/system/sys-1')
        expect(link).toHaveAttribute('target', '_blank')
    })

    it('renders MOVE IN vs OUT variants', () => {
        const { rerender } = renderWithProviders(
            <HistoryFeeds
                history={[
                    makeItem({
                        historyType: HISTORY_TYPE.MOVE,
                        detail: { direction: 'IN', systemUid: 'sys-2', systemName: 'Sys 2' },
                    }),
                ]}
            />,
        )
        expect(screen.getByRole('link', { name: 'Sys 2' })).toHaveAttribute(
            'href',
            '/system/sys-2',
        )

        rerender(
            <HistoryFeeds
                history={[
                    makeItem({
                        historyType: HISTORY_TYPE.MOVE,
                        detail: { direction: 'OUT', systemUid: 'sys-3', systemName: 'Sys 3' },
                    }),
                ]}
            />,
        )
        expect(screen.getByRole('link', { name: 'Sys 3' })).toHaveAttribute(
            'href',
            '/system/sys-3',
        )
    })

    it('renders ITEM_MOVE IN vs OUT variants', () => {
        const { rerender } = renderWithProviders(
            <HistoryFeeds
                history={[
                    makeItem({
                        historyType: HISTORY_TYPE.ITEM_MOVE,
                        detail: { direction: 'IN', systemUid: 'sys-4', systemName: 'Sys 4' },
                    }),
                ]}
            />,
        )
        expect(screen.getByRole('link', { name: 'Sys 4' })).toHaveAttribute(
            'href',
            '/system/sys-4',
        )

        rerender(
            <HistoryFeeds
                history={[
                    makeItem({
                        historyType: HISTORY_TYPE.ITEM_MOVE,
                        detail: { direction: 'OUT', systemUid: 'sys-5', systemName: 'Sys 5' },
                    }),
                ]}
            />,
        )
        expect(screen.getByRole('link', { name: 'Sys 5' })).toHaveAttribute(
            'href',
            '/system/sys-5',
        )
    })
})
