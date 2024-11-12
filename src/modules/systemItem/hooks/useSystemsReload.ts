import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import useQueryManager from '@/hooks/useQueryManager'
import type { SystemDetail, SystemsResponse } from '@/types/responses/systems'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryMutate } from '@/utils/fetcher'

import { type PruneSystemDetail, pruneSystemDetail } from './utils'

type Props = {
  onSuccess?: () => void
  tableId?: string
}

export const useSystemsReload = ({ tableId = 'systems', onSuccess }: Props) => {
  const { query } = useQueryManager(tableId)

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: queryMutate<SystemDetail[], PruneSystemDetail[]>(
      'systemsReload',
      'post'
    ),
    onError: error => {
      toast.error('Something went wrong: ' + error.message)
    },
    onSuccess: data => {
      queryClient.setQueryData<SystemsResponse, QueryFetcherKey>(
        [tableId, { query }],
        prev =>
          prev
            ? {
                ...prev,
                data: data.data
              }
            : prev
      )
      onSuccess?.()
    }
  })

  const reload = () => {
    const systems = queryClient.getQueryData<SystemsResponse>([
      tableId,
      { query }
    ])
    if (systems) {
      const body = systems?.data.map(pruneSystemDetail)
      mutate(body)
    }
  }

  return [reload]
}
