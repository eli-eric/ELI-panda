import { gql, useQuery } from '@apollo/client'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import type { Query } from '@/types/gql/graphql'
import { SYSTEM_DETAIL } from '@/utils/graphql/fragments'

const GET_SYSTEM = gql`
  ${SYSTEM_DETAIL}
  query System($where: SystemWhere) {
    systems(where: $where) {
      ...SystemDetail
    }
  }
`

export const useSystemDetail = (uid?: string) => {
  const { system: systemEndpoint } = useEndpoint({ uid })
  const { data, error, loading, refetch } = useQuery<Query>(GET_SYSTEM, { variables: { where: { uid } } })

  return {
    systemDetail: data?.systems[0],
    loading: loading,
    error,
    refetch,
    systemEndpoint
  }
}
