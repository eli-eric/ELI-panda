import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { ROLE } from '@/types/constants/roles'
import type { Query } from '@/types/gql/graphql'

/* export const useSystemDetail = () => {
  const router = useRouter()
  const uid = router.query.uid as string
  const { system: systemEndpoint } = useEndpoint({ uid })

  const { response, loading, error, mutate } = useFetch<SystemDetailFormType>({
    url: uid && systemEndpoint,
    config: {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true
    },
    useMockFetcher: false
  })
  const { data: session } = useSession()
  const disabledEdit = !session?.user.roles.includes(ROLE.SYSTEM_EDIT)

  return {
    systemDetail: response,
    loading: loading,
    error,
    mutate,
    disabledEdit,
    uid,
    systemEndpoint
  }
} */

const GET_SYSTEM = gql`
  query System($where: SystemWhere) {
    systems(where: $where) {
      name
      parentPath {
        uid
        name
      }
      location {
        code
        name
        uid
      }
      description
      maintenedBy {
        fullName
        uid
      }
      operators {
        fullName
        uid
      }
      parentSystem {
        name
        uid
      }
      responsible {
        fullName
        uid
      }
      systemCode
      systemAlias
      systemLevel {
        name
        uid
      }
      systemType {
        name
        uid
      }
      zone {
        name
        uid
      }
      physicalItem {
        conditionStatus {
          name
          uid
        }
        eun
        name
        notes
        serialNumber
        order {
          name
          uid
        }
        uid
        itemUsage {
          name
          uid
        }
        catalogueItem {
          catalogueNumber
          description
          name
          uid
          supplier {
            name
            uid
          }
          propertiesConnection {
            edges {
              value
              node {
                name
                unit {
                  name
                  uid
                }
              }
            }
          }
        }
      }
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
