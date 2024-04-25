import { toast } from 'react-hot-toast'
import { gql } from '@/types/gql'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'
const teamsQuery = gql(`
  query TeamsQuery {
    teams {
      uid
      name
    }
  }
`)

export const useTeams = () => {
  const { data, isLoading, error } = useGraphQL(
    teamsQuery,
    {},
    {
      onError: () => {
        toast.error(`Something went wrong with fetch teams!`)
      }
    }
  )
  return { teams: data?.teams, loading: isLoading, error }
}
