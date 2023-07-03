import { useRouter } from 'next/router'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'

import type { SystemRelationshipResponse } from '../types/responses'

export const useRelations = () => {
  const uid = useRouter().query.uid as string
  const { systemRelationships } = useEndpoint({ uid })

  // const { data: relations } = useSWR<SystemRelationshipResponse[]>(systemRelationships, mockFetcher)

  const relations = useFetch<SystemRelationshipResponse[]>({ url: systemRelationships, useMockFetcher: false })

  return { ...relations }
}
