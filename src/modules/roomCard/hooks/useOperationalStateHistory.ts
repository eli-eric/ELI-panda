import { useEffect, useMemo } from 'react'
import { toast } from 'sonner'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

export const roomCardHistoryQuery = gql(`
  query RoomCardHistoryQuery($roomCardUid: ID!) {
    roomCards(where: { uid: $roomCardUid }) {
      updatedByConnection(where: { edge: { action: OPERATION_STATE } }) {
        edges {
          at
          action
          previousState
          newState
          node {
            uid
            firstName
            lastName
            email
          }
        }
      }
    }
  }
`)

export interface ParsedHistoryItem {
  uid: string
  previousState: string | null
  newState: string
  changedAt: string
  changedBy: {
    uid: string
    firstName: string
    lastName: string
    email: string
  }
}

export const useOperationalStateHistory = (roomCardUid?: string) => {
  const { data, error, isLoading } = useGraphQL(roomCardHistoryQuery, {
    variables: {
      roomCardUid: roomCardUid || ''
    },
    enabled: !!roomCardUid,
    refetchOnMount: 'always'
  })

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch operational state history')
    }
  }, [error])

  const history = useMemo(() => {
    const edges = data?.roomCards[0]?.updatedByConnection?.edges
    if (!edges) return []

    // Sort by date DESC in the application layer
    const sortedEdges = [...edges].sort((a, b) => {
      return new Date(b.at).getTime() - new Date(a.at).getTime()
    })

    return sortedEdges.map((edge, index) => ({
      uid: `${edge.node.uid}-${index}`,
      previousState: edge.previousState || null,
      newState: edge.newState || '',
      changedAt: edge.at,
      changedBy: edge.node
    })) as ParsedHistoryItem[]
  }, [data])

  return {
    history,
    error,
    loading: isLoading
  }
}
