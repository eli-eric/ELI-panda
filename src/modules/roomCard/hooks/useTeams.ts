import { toast } from 'react-hot-toast'
import { gql } from '@/types/gql'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { useEffect } from 'react'
const teamsQuery = gql(`
  query TeamsQuery {
    teams {
      uid
      name
    }
  }
`)

export const useTeams = () => {
  const { data, isLoading, error } = useGraphQL(teamsQuery, {})

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch teams')
    }
  }, [error])

  return { teams: data?.teams, loading: isLoading, error }
}
