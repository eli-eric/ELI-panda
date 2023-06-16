import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'

import useQueryManager from '../../../hooks/useQueryManager'
import type { SystemListResponse } from '../types'

const useSystems = () => {
  const query = useQueryManager('systems')
  const { systemsList } = useEndpoint({ ...query })
  const { response, loading, error, mutate } = useFetch<SystemListResponse>({
    config: {
      suspense: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true
    },
    url: systemsList
  })
  return { systemList: response, loading, error, mutate }
}

export default useSystems
