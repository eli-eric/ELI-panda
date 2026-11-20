import type { CronJobHistory } from '../../types/cron.types'
import { EMPLOYEES_SYNC_JOB_UID, findLastEmployeesSync } from '../cronHistory'

const job = (uid: string, jobUid: string): CronJobHistory => ({
    uid,
    jobUid,
    jobName: 'job',
    jobType: 'EMPLOYEES',
    jobStatus: 'SUCCESS',
    jobMessage: '',
    startTime: 0,
    endTime: null,
    totalTimeMs: 0,
})

describe('findLastEmployeesSync', () => {
    it('returns the first (newest) employees sync run', () => {
        const history = [
            job('h1', 'orders-sync'),
            job('h2', EMPLOYEES_SYNC_JOB_UID),
            job('h3', EMPLOYEES_SYNC_JOB_UID),
        ]

        expect(findLastEmployeesSync(history)?.uid).toBe('h2')
    })

    it('returns undefined when there is no employees sync run', () => {
        expect(findLastEmployeesSync([job('h1', 'orders-sync')])).toBeUndefined()
        expect(findLastEmployeesSync(undefined)).toBeUndefined()
    })
})
