import { useQuery } from '@tanstack/react-query'

import { queryFetcher } from '@/utils/fetcher'

import type { CronJobHistory } from '../types/cron.types'

export const CRON_HISTORY_QUERY_KEY = 'cronHistory'

/**
 * Fetches the last 100 cron job runs (newest first, admin only).
 */
export const useCronHistory = () =>
    useQuery({
        queryKey: [CRON_HISTORY_QUERY_KEY],
        queryFn: queryFetcher<CronJobHistory[]>('cronHistory'),
    })
