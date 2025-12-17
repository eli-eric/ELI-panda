import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

export const useResearcherDelete = (uid: string) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: queryMutate('researcher', 'delete', uid),
    mutationKey: ['researcher', { uid }],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['researchers'] })
    }
  })

  return mutate
}
