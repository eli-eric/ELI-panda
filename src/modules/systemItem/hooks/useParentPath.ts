import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { gql } from '@/types/gql'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { useRouter } from 'next/router'

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
  }
   }
`)

export const useSystemParentPath = () => {
  const router = useRouter()
  const uid = router.query.parentUid as string | undefined

  const { system: systemEndpoint } = useEndpoint({ uid })

  const { data, error, isLoading, refetch } = useGraphQL(
    systemDetailQuery,
    {
      where: { uid }
    },
    {
      enabled: !!uid
    }
  )

  const parentPath =
    data?.systems[0]?.parentPath && data?.systems[0]?.parentPath?.length > 0
      ? [
          ...(data?.systems[0]?.parentPath ?? []),
          { uid: data?.systems[0]?.uid, name: data?.systems[0]?.name }
        ]
      : [{ uid: data?.systems[0]?.uid, name: data?.systems[0]?.name }]

  return {
    parentPath,
    loading: isLoading,
    error,
    refetch,
    systemEndpoint
  }
}
