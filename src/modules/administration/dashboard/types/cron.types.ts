export type CronJobStatus = 'SUCCESS' | 'ERROR' | 'RUNNING' | 'PENDING'

export interface CronJobHistory {
    uid: string
    jobUid: string
    jobName: string
    jobType: string
    jobStatus: CronJobStatus
    jobMessage: string
    startTime: number
    endTime: number | null
    totalTimeMs: number
}

export interface SyncEmployeesResult {
    savedCount: number
    errorCount: number
}
