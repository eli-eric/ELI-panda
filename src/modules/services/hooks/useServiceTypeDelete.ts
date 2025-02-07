import { useMutation } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

type Props = {
  uid: string
}
export const useServiceTypeDelete = ({ uid }: Props) => {
  return useMutation({
    mutationKey: ['service', { uid }],
    mutationFn: queryMutate<string, undefined>('serviceType', 'delete')
  })
}
