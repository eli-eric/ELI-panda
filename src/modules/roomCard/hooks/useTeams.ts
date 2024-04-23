import { useQuery } from '@apollo/client'
import { toast } from 'react-hot-toast'
import { gql } from '@/types/gql'
const teamsQuery = gql(`
  query TeamsQuery {
    teams {
      uid
      name
    }
  }
`)

export const useTeams = () => {
  const { data, loading, error } = useQuery(teamsQuery, {
    onError: () => {
      toast.error(`Something went wrong with fetch teams!`)
    }
  })
  return { teams: data?.teams, loading, error }
}
