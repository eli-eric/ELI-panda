import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

import { queryMutate } from '@/utils/fetcher'

import type { Publication } from '../types/responses'

export const usePublicationMutation = () => {
  const router = useRouter()
  const uid = router.query.uid as string | undefined

  return useMutation({
    mutationKey: uid ? ['publication', uid] : ['create-publication'],
    mutationFn: queryMutate<string, Publication>(
      'publication',
      uid ? 'put' : 'post',
      uid
    ),
    onError: (error: AxiosError) => {
      // TODO: handle error message
      toast.error('Error')
    }
  })
}
