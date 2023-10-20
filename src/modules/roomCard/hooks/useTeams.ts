import { gql, useQuery } from '@apollo/client'
import { toast } from 'react-hot-toast'

import type { Query } from '@/types/gql/graphql'

const GET_TEAMS = gql`
  query Query {
    teams {
      uid
      name
    }
  }
`

export const useTeams = () => {
  const { data, loading, error } = useQuery<Query>(GET_TEAMS, {
    onError: () => {
      toast.error(`Something went wrong with fetch teams!`)
    }
  })
  return { teams: data?.teams, loading, error }
}
