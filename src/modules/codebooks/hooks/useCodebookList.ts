import { useQuery } from '@tanstack/react-query'

import { queryFetcher } from '@/utils/fetcher'

export const useCodebookList = () => {
  return useQuery({
    queryKey: ['codebooks', { query: { editable: 'true' } }],
    queryFn: queryFetcher<{ code: string; type: string }[]>('codebooks')
  })
}
