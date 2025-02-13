import { useMutation } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

import type { ServiceTypeResponse } from '../types/responses'

type Props = {
  uid?: string
}

export const useServiceMutation = ({ uid }: Props) => {
  return useMutation({
    mutationKey: ['service', { uid }],
    mutationFn: queryMutate<ServiceTypeResponse, ServiceTypeResponse>(
      'serviceType',
      uid ? 'put' : 'post'
    )
  })
}
