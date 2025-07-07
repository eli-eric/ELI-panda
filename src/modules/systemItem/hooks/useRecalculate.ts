import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import type { SystemsResponse } from '@/types/responses/systems'
import { queryMutate } from '@/utils/fetcher'

import { useSystemsReload } from './useSystemsReload'

export const useRecalculate = ({
  onSuccess,
  tableId = 'systems'
}: {
  onSuccess?: () => void
  tableId?: string
}) => {
  const [reloadSystems] = useSystemsReload({ tableId, onSuccess })

  const { mutate, isPending } = useMutation({
    mutationFn: queryMutate<SystemsResponse, any>(
      'recalculateSpareParts',
      'post'
    ),
    onError: error => {
      toast.error('Something went wrong: ' + error.message)
    },
    onSuccess: () => {
      reloadSystems()
    }
  })

  return [mutate, isPending] as const
}
