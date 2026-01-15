import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { SystemCodeResult } from '../types'

export interface PreviewParams {
  zoneUid: string
  systemTypeUid: string
  batch: number
}

export const useSystemCodesPreview = (params: PreviewParams | null) => {
  const query = params
    ? { zoneUid: params.zoneUid, systemTypeUid: params.systemTypeUid, batch: params.batch }
    : undefined

  return useQuery<SystemCodeResult[], AxiosError, SystemCodeResult[], QueryFetcherKey>({
    queryKey: ['systemCodesPreview', { query }],
    queryFn: queryFetcher<SystemCodeResult[]>('systemCodesPreview'),
    enabled: !!params?.zoneUid && !!params?.systemTypeUid && !!params?.batch
  })
}
