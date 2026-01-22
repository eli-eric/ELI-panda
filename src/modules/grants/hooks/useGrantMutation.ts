import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

import type { GrantFormData } from '../form/grant-form.schema'
import type { Grant } from '../types/grant.types'

interface UseGrantMutationOptions {
  uid?: string
  onSuccess?: (data: Grant) => void
}

export const useGrantMutation = ({
  uid,
  onSuccess
}: UseGrantMutationOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: uid ? ['grant', uid] : ['create-grant'],
    mutationFn: queryMutate<Grant, GrantFormData>(
      'grant',
      uid ? 'put' : 'post',
      uid
    ),
    onSuccess: async response => {
      await queryClient.invalidateQueries({ queryKey: ['grants'] })
      if (uid) {
        await queryClient.invalidateQueries({
          queryKey: ['grant', { uid }]
        })
      }
      onSuccess?.(response.data)
    }
  })
}
