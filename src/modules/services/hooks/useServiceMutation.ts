import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { queryMutate } from '@/utils/fetcher'

import type { ServiceTypeResponse } from '../types/responses'
import { useServiceTypeList } from './useServiceTypeList'

type Props = {
  uid?: string
}

export const useServiceMutation = ({ uid }: Props) => {
  const { refetch } = useServiceTypeList()
  return useMutation({
    mutationKey: ['serviceType', { uid }],
    mutationFn: queryMutate<ServiceTypeResponse, ServiceTypeResponse>(
      'serviceType',
      uid ? 'put' : 'post',
      uid
    ),
    onError: () => {
      toast.error(
        'An error occurred while saving the service, try again later.'
      )
    }
  })
}
