import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'

import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { Publication } from '../types/responses'

export const usePublication = () => {
  const router = useRouter()
  const uid = router.query.uid as string
  return useQuery<Publication, AxiosError, Publication, QueryFetcherKey>({
    queryKey: ['publication', { uid }],
    queryFn: queryFetcher<Publication>('publication')
  })
}
