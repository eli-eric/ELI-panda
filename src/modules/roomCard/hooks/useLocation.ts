import { gql, useLazyQuery, useQuery } from '@apollo/client'

import type { Query } from '@/types/gql/graphql'

const GET_LOCATIONS = gql`
  query Query($where: LocationWhere) {
    locations(where: $where) {
      uid
      name
      code
      subLocations {
        uid
      }
      roomCard {
        uid
      }
    }
  }
`
const GET_SUBLOCATIONS = gql`
  query Query($where: LocationWhere) {
    locations(where: $where) {
      subLocations {
        uid
        name
        code
        subLocations {
          uid
        }
        roomCard {
          uid
        }
      }
    }
  }
`

export const useLocation = () => {
  const { data, loading, error } = useQuery<Query>(GET_LOCATIONS, {
    variables: { where: { parentLocation: null } }
  })
  return { locations: data?.locations, loading, error }
}
export const useSubLocations = () => {
  const [getSubLocations, { data, loading, error }] = useLazyQuery<Query>(GET_SUBLOCATIONS)
  return { subLocations: data?.locations[0].subLocations, loading, error, getSubLocations }
}
