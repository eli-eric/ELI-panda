import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import type { SystemsResponse } from '@/modules/systems/types/responses'

import useQueryManager from '../../../hooks/useQueryManager'

export const useSystemsForRel = () => {
  const query = useQueryManager('systemsForRel')
  const { systemsForRelationship } = useEndpoint({ ...query })
  const { response, loading, error, mutate } = useFetch<SystemsResponse>({
    config: {
      suspense: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      keepPreviousData: true
    },
    url: systemsForRelationship,
    useMockFetcher: true
  })
  return { systems: response, loading, error, mutate }
}
