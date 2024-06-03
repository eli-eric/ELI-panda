import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
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
  const { data, isLoading, error } = useGraphQL(teamsQuery)

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch teams')
    }
  }, [error])

  return { teams: data?.teams, loading: isLoading, error }
}
