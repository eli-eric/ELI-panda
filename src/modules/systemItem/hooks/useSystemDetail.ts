import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { ROLE } from '@/types/constants/roles'
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

export const useSystemDetail = () => {
  const router = useRouter()
  const uid = router.query.uid as string
  const { data: session } = useSession()
  const { system: systemEndpoint } = useEndpoint({ uid })

  const disabledEdit = !session?.user.roles.includes(ROLE.SYSTEM_EDIT)

  const { data, error, loading, refetch } = useQuery<Query>(GET_SYSTEM, { variables: { where: { uid } } })

  return {
    systemDetail: data?.systems[0],
    loading: loading,
    error,
    refetch,
    disabledEdit,
    uid,
    systemEndpoint
  }
}
