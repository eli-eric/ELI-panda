import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import useQueryManager from '@/hooks/useQueryManager'
import type { SystemsResponse } from '@/types/responses/systems'
import { queryMutate } from '@/utils/fetcher'

import { pruneSystemDetail } from './utils'

export const useRecalculate = (onSuccess: () => void) => {
  const { query } = useQueryManager('systems')

  const queryClient = useQueryClient()

  const { mutate: reloadSystems } = useMutation({
    mutationFn: queryMutate<SystemsResponse, any>('systemsReload', 'post'),
    onError: error => {
      toast.error('Something went wrong: ' + error.message)
    },
    onSuccess: data => {
      queryClient.setQueryData<SystemsResponse, any>(
        ['systems', { query }],
        prev => {
          return {
            ...prev,
            data: data
          }
        }
      )
      onSuccess()
    }
  })

  const { mutate } = useMutation({
    mutationFn: queryMutate<SystemsResponse, any>(
      'recalculateSpareParts',
      'post'
    ),
    onError: error => {
      toast.error('Something went wrong: ' + error.message)
    },
    onSuccess: () => {
      const systems = queryClient.getQueryData<SystemsResponse>([
        'systems',
        { query }
      ])
      const body = systems?.data.map(pruneSystemDetail)
      reloadSystems(body)
    }
  })

  return [mutate]
}
