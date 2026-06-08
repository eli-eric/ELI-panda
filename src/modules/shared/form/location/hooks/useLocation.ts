import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

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

    const search = instances['location-tree']?.search || ''

    const { data, isLoading, error } = useGraphQL(GET_LOCATIONS, {
        variables: {
            where: search
                ? {
                      OR: [{ name_CONTAINS: search }, { code_CONTAINS: search }],
                      facility: {
                          code: session?.user?.facilityCode,
                      },
                  }
                : {
                      facility: {
                          code: session?.user?.facilityCode,
                      },
                      parentLocationAggregate: {
                          count: 0,
                      },
                  },
        },
        enabled: !!session?.user?.facilityCode,
    })
    const locations = useMemo(() => {
        return data?.locations?.sort((a, b) => {
            return (a.code ?? '').localeCompare(b.code ?? '')
        })
    }, [data])

    return { locations, loading: isLoading, error }
}

export const useSubLocations = (uid?: string) => {
    const { data, isLoading, error } = useGraphQL(GET_SUBLOCATIONS, {
        variables: { where: { uid } },
        enabled: !!uid,
    })

    // sort the sublocations by code, code can be udnerfined
    const subLocations = useMemo(() => {
        return data?.locations[0].subLocations.sort((a, b) => {
            return (a.code ?? '').localeCompare(b.code ?? '')
        })
    }, [data])

    return {
        subLocations,
        loading: isLoading,
        error,
    }
}
