import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from '@/types/http'
import { useRouter } from 'next/router'

import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { Publication } from '../types/responses'

export const usePublication = (uid?: string) => {
    const router = useRouter()
    const publicationUid = uid ? uid : (router.query.uid as string)
    return useQuery<Publication, AxiosError, Publication, QueryFetcherKey>({
        queryKey: ['publication', { uid: publicationUid }],
        queryFn: queryFetcher<Publication>('publication'),
        enabled: !!publicationUid,
    })
}
