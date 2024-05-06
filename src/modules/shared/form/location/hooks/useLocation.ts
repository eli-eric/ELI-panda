import { useSession } from 'next-auth/react'

import useTableStateStore from '@/store/useTableStateStore'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'
import { useLazyQuery } from '@apollo/client'

const GET_LOCATIONS = gql(`
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
`)
const GET_SUBLOCATIONS = gql(`
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
`)

export const useLocation = () => {
  const { instances } = useTableStateStore()
  const { data: session } = useSession()

  const filter = instances['location-tree']?.columnFilter

  const nameFilter = filter?.find(f => f.id === 'name')?.value as
    | string
    | undefined
  const codeFilter = filter?.find(f => f.id === 'code')?.value as
    | string
    | undefined

  const { data, isLoading, error } = useGraphQL(GET_LOCATIONS, {
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
    enabled: !!session?.user?.facilityCode
  })
  return { locations: data?.locations, loading: isLoading, error }
}
export const useSubLocations = () => {
  const [getSubLocations, { data, loading, error }] =
    useLazyQuery(GET_SUBLOCATIONS)
  return {
    subLocations: data?.locations[0].subLocations,
    loading,
    error,
    getSubLocations
  }
}
