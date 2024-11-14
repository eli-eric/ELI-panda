import { useMutation } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

import type { MoveSystemsBody } from '../types/responses'

export const useMoveSubmit = () => {
  return useMutation({
    mutationFn: queryMutate<string, MoveSystemsBody>('systemsMove', 'post')
  })
}
