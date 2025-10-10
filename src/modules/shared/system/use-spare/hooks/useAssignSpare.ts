import { useMutation } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

export const useAssignSpare = () => {
  return useMutation({
    mutationKey: ['assign-spare'],
    mutationFn: queryMutate('sparePartUse', 'post')
  })
}
