import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'
import { useSystemCreateParentStore } from '../store/useSystemCreateParentStore'

const systemDetailQuery = gql(`
  query SystemDetailParentForCreate($where: SystemWhere) {
    systems(where: $where) {
      uid
      name
      systemLevel
      parentPath {
        uid
        name
        systemLevel
      }
      responsible {
        uid
        fullName
      }
      location {
        uid
        name
      }
      zone {
        uid
        name
      }
    }
  }
`)

export const useSystemCreateParent = (uid?: string) => {
  const { parentUid } = useSystemCreateParentStore()
  console.log('🔍 useSystemCreateParent called with UID:', parentUid)

  const { data, error, isLoading, refetch } = useGraphQL(systemDetailQuery, {
    variables: {
      where: { uid: parentUid || uid }
    },
    enabled: !!parentUid || !!uid
  })

  console.log('📥 GraphQL hook result:', { data, error, isLoading })

  const getParentPath = () => {
    const parentPathRaw = data?.systems[0]?.parentPath || []
    // Filter out null/undefined/empty objects
    const parentPath = parentPathRaw
      .filter((item: any) => item && (item.uid || item.name))
      .map((item: any) => ({
        uid: item.uid,
        name: item.name,
        systemLevel: item.systemLevel
      }))
    // Always add the current system as the last element
    return [
      ...parentPath,
      {
        uid: data?.systems[0]?.uid,
        name: data?.systems[0]?.name,
        systemLevel: data?.systems[0]?.systemLevel
      }
    ]
  }
  // Check if parentPath is not empty and map it to the desired format

  const parentPath = getParentPath()

  return {
    parentSystem: data?.systems[0],
    parentPath,
    loading: isLoading,
    error,
    refetch
  }
}
