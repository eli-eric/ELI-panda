import { useQuery } from '@tanstack/react-query'

import type { NormalizedHttpError } from '@/core/http/fetchClient'
import { isClientError } from '@/types/http'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { SystemCodeResult } from '../types'
import { BATCH_LIMIT } from '../types/constants'

export interface PreviewParams {
    zoneUid: string
    systemTypeUid: string
    batch: number
}

export const useSystemCodesPreview = (params: PreviewParams | null) => {
    const query = params
        ? {
              zoneUid: params.zoneUid,
              systemTypeUid: params.systemTypeUid,
              batch: params.batch > BATCH_LIMIT ? BATCH_LIMIT : params.batch,
          }
        : undefined

    return useQuery<SystemCodeResult[], NormalizedHttpError, SystemCodeResult[], QueryFetcherKey>({
        queryKey: ['systemCodesPreview', { query }],
        queryFn: queryFetcher<SystemCodeResult[]>('systemCodesPreview'),
        enabled: !!params?.zoneUid && !!params?.systemTypeUid && !!params?.batch,
        // A 400 here is a verdict, not a hiccup: retrying it only delays the message by
        // the backoff. Server and network errors still get the default three attempts.
        retry: (failureCount, error) => !isClientError(error) && failureCount < 3,
    })
}
