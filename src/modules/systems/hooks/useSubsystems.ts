import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import type { SystemDetail, SystemsResponse } from '@/types/responses/systems'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import { addSubsystems } from '../utils'
import { useSystems } from './useSystems'

export const useSubsystems = (tableId: string) => {
  const [uid, setUid] = useState<string | null>(null)
  const { queryKey } = useSystems(tableId)

  const queryClient = useQueryClient()

  const queryKeySubsystems: QueryFetcherKey = ['subsystems', { uid }]

  const { isLoading: pending, data: response } = useQuery({
    queryKey: queryKeySubsystems,
    queryFn: queryFetcher<SystemDetail[]>('systemSubsystems'),
    enabled: !!uid,
    staleTime: 0
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
    return () => {
      setUid(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  return { setUid, pending, queryKey: queryKeySubsystems }
}
