import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'

import useQueryManager from '../../../hooks/useQueryManager'
import type { SystemsResponse } from '../types/responses'

export const useSystems = () => {
  const query = useQueryManager('systems')
  const { systemsList } = useEndpoint({ ...query })
  const { response, loading, error, mutate } = useFetch<SystemsResponse>({
    config: {
      suspense: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      keepPreviousData: true
    },
    url: systemsList,
    useMockFetcher: false
  })
  return { systems: response, loading, error, mutate }
}
