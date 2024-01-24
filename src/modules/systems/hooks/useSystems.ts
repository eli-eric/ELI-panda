import toast from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'

import useQueryManager from '../../../hooks/useQueryManager'
import type { SystemsResponse } from '../types/responses'

export const useSystems = tableId => {
  const query = useQueryManager(tableId)
  const { systemsList } = useEndpoint({ ...query })
  const { response, loading, error, mutate } = useFetch<SystemsResponse>({
    config: {
      suspense: false,
      keepPreviousData: true,
      onError: error => {
        toast.error(error.message)
      }
    },
    url: systemsList,
    useMockFetcher: false
  })
  return { systems: response, loading, error, mutate, query }
}
