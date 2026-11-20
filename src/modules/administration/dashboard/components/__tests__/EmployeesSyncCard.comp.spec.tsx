import { fireEvent, render, screen } from '@testing-library/react'

import { message } from '@/i18n/src/messages'

import type { CronJobHistory } from '../../types/cron.types'
import { EmployeesSyncCard } from '../EmployeesSyncCard.comp'

jest.mock('react-intl', () => ({
    useIntl: () => ({
        formatMessage: ({ id }: { id: string }) => id,
        formatDate: () => '20 Nov 2026, 02:00',
    }),
}))

const labels = message.adminPage.employeesSync

const lastRun: CronJobHistory = {
    uid: 'h1',
    jobUid: 'sync-employees-from-hr-eli-bm',
    jobName: 'Sync employees from HR - ELI - Beamlines',
    jobType: 'EMPLOYEES',
    jobStatus: 'SUCCESS',
    jobMessage: 'scheduled run: 120 employees saved, 0 errors',
    startTime: 1,
    endTime: 2,
    totalTimeMs: 1,
}

describe('EmployeesSyncCard', () => {
    it('shows the last run and triggers a sync', () => {
        const onRun = jest.fn()
        render(<EmployeesSyncCard lastRun={lastRun} onRun={onRun} />)

        const lastRunInfo = screen.getByTestId('employees-sync-last-run')
        expect(lastRunInfo).toHaveTextContent(labels.status.SUCCESS)
        expect(lastRunInfo).toHaveTextContent('120 employees saved, 0 errors')

        fireEvent.click(screen.getByTestId('employees-sync-run'))
        expect(onRun).toHaveBeenCalledTimes(1)
    })

    it('disables the button while syncing', () => {
        render(<EmployeesSyncCard isSyncing onRun={jest.fn()} />)

        expect(screen.getByTestId('employees-sync-run')).toBeDisabled()
        expect(screen.getByTestId('employees-sync-run')).toHaveTextContent(labels.running)
    })

    it('shows placeholder when no run is recorded', () => {
        render(<EmployeesSyncCard onRun={jest.fn()} />)

        expect(screen.getByText(labels.neverRun)).toBeInTheDocument()
    })

    it('shows history load error', () => {
        render(<EmployeesSyncCard isHistoryError onRun={jest.fn()} />)

        expect(screen.getByText(labels.historyFailed)).toBeInTheDocument()
    })
})
