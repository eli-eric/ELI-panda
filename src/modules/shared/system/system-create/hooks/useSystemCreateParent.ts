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

export const useSystemCreateParent = () => {
  const { parentUid } = useSystemCreateParentStore()
  console.log('🔍 useSystemCreateParent called with UID:', parentUid)

  const { data, error, isLoading, refetch } = useGraphQL(systemDetailQuery, {
    variables: {
      where: { uid: parentUid }
    },
    enabled: !!parentUid
  })

  console.log('📥 GraphQL hook result:', { data, error, isLoading })

  const getParentPath = () => {
    if (!data?.systems[0]?.parentPath) {
      return []
    }
    const parentPath = data?.systems[0]?.parentPath.map((item: any) => ({
      uid: item.uid,
      name: item.name,
      systemLevel: item.systemLevel
    }))
    return [
      ...parentPath,
      { uid: data?.systems[0]?.uid, name: data?.systems[0]?.name }
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
