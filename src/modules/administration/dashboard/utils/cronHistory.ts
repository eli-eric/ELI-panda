import type { CronJobHistory } from '../types/cron.types'

// models.CRON_JOB_SYNC_EMPLOYEES_FROM_HR_ELI_BM in eli-panda-api
export const EMPLOYEES_SYNC_JOB_UID = 'sync-employees-from-hr-eli-bm'

export const isEmployeesSyncJob = (job: CronJobHistory) => job.jobUid === EMPLOYEES_SYNC_JOB_UID

/**
 * Most recent employees sync run; the API returns history newest first.
 */
export const findLastEmployeesSync = (history: CronJobHistory[] = []) =>
    history.find(isEmployeesSyncJob)
