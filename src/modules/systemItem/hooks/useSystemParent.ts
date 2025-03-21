import { useRouter } from 'next/router'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

const systemDetailQuery = gql(`
  query SystemDetailParent($where: SystemWhere) {
    systems(where: $where) {
      uid
      name
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

export const useSystemParent = () => {
  const router = useRouter()
  const uid = router.query.parentUid as string | undefined

  const { system: systemEndpoint } = useEndpoint({ uid })

  const { data, error, isLoading, refetch } = useGraphQL(systemDetailQuery, {
    variables: {
      where: { uid }
    },
    enabled: !!uid
  })

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
    refetch,
    systemEndpoint
  }
}
