import { useSession } from 'next-auth/react'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import useTableStateStore from '@/store/useTableStateStore'
import { gql } from '@/types/gql'

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
export const useSubLocations = (uid?: string) => {
  const { data, isLoading, error } = useGraphQL(GET_SUBLOCATIONS, {
    variables: { where: { uid } },
    enabled: !!uid
  })
  return {
    subLocations: data?.locations[0].subLocations,
    loading: isLoading,
    error
  }
}
