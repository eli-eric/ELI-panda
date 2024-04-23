import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'

import useTableStateStore from '@/store/useTableStateStore'
import type { Query } from '@/types/gql/graphql'

const GET_LOCATIONS = gql`
  query LocationsQuery($where: LocationWhere) {
    locations(where: $where) {
      uid
      name
      code
      subLocations {
        uid
      }
    }
  }
`
const GET_SUBLOCATIONS = gql`
  query SubLocationsQuery($where: LocationWhere) {
    locations(where: $where) {
      subLocations {
        uid
        name
        code
        subLocations {
          uid
        }
      }
    }
  }
`

export const useLocation = () => {
  const { instances } = useTableStateStore()
  const { data: session } = useSession()

  const filter = instances['location-tree']?.columnFilter

  const nameFilter = filter?.find(f => f.id === 'name')?.value
  const codeFilter = filter?.find(f => f.id === 'code')?.value

  const { data, loading, error } = useQuery<Query>(GET_LOCATIONS, {
    variables: {
      where: filter
        ? {
            name_CONTAINS: nameFilter,
            code_CONTAINS: codeFilter,
            facility: {
              code: session?.user?.facilityCode
            }
          }
        : {
            facility: {
              code: session?.user?.facilityCode
            },
            parentLocationAggregate: {
              count: 0
            }
          }
    },
    skip: !session?.user?.facilityCode
  })
  return { locations: data?.locations, loading, error }
}
export const useSubLocations = () => {
  const [getSubLocations, { data, loading, error }] =
    useLazyQuery<Query>(GET_SUBLOCATIONS)
  return {
    subLocations: data?.locations[0].subLocations,
    loading,
    error,
    getSubLocations
  }
}
