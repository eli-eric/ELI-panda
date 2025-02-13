import { useMutation } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

import { useServiceTypeList } from './useServiceTypeList'

type Props = {
  uid: string
}
export const useServiceTypeDelete = ({ uid }: Props) => {
  const { refetch } = useServiceTypeList()
  return useMutation({
    mutationKey: ['service', { uid }],
    mutationFn: queryMutate<string, undefined>('serviceType', 'delete', uid),
    onSuccess: () => {
      refetch()
    }
  })
}
