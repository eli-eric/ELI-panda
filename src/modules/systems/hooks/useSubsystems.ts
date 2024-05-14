import { useEffect, useState } from 'react'

import type { SystemDetail, SystemsResponse } from '../types/responses'
import { useSystems } from './useSystems'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'
import { addSubsystems } from '../utils'

export const useSubsystems = tableId => {
  const [uid, setUid] = useState<string | null>(null)
  const { queryKey } = useSystems(tableId)

  const queryClient = useQueryClient()

  const queryKeySubsystems: QueryFetcherKey = ['subsystems', { uid }]

  const { isLoading: pending, data: response } = useQuery({
    queryKey: queryKeySubsystems,
    queryFn: queryFetcher<SystemDetail[]>('systemSubsystems'),
    enabled: !!uid
  })

  useEffect(() => {
    if (response) {
      queryClient.setQueryData<SystemsResponse>(
        queryKey,
        prev => {
          if (prev) {
            return {
              ...prev,
              data: addSubsystems(prev.data, response, uid)
            }
          } else {
            return prev
          }
        },
        { updatedAt: Date.now() }
      )
      setUid(null)
    }
  }, [response, queryClient, queryKey, uid])

  return { setUid, pending, queryKey: queryKeySubsystems }
}
