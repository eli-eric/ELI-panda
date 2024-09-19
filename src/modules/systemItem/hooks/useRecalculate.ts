import { useMutation, useQueryClient } from '@tanstack/react-query'

import useQueryManager from '@/hooks/useQueryManager'
import type { SystemDetail, SystemsResponse } from '@/types/responses/systems'
import { queryMutate } from '@/utils/fetcher'

function pruneSystemDetail(system: SystemDetail) {
  const { uid } = system
  const children = system.subSystems?.map(pruneSystemDetail)
  return {
    uid,
    children
  }
}

export const useRecalculate = (onSuccess: (data: SystemsResponse) => void) => {
  const { query } = useQueryManager('systems')

  const queryClient = useQueryClient()

  const { mutate: reloadSystems } = useMutation({
    mutationFn: queryMutate<SystemsResponse, any>('systemsReload', 'post'),
    onSuccess: data => {
      onSuccess(data.data)
    }
  })

  const { mutate } = useMutation({
    mutationFn: queryMutate<SystemsResponse, any>(
      'recalculateSpareParts',
      'post'
    ),
    onSuccess: () => {
      const systems = queryClient.getQueryData<SystemsResponse>([
        'systems',
        { query }
      ])
      console.log('systems', systems)

      const body = systems?.data.map(pruneSystemDetail)
      console.log('body', body)

      reloadSystems(body)
    }
  })

  return [mutate]
}
