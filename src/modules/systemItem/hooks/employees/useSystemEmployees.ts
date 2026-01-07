import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'
import type { Employee } from '@/types/gql/graphql'

const systemEmployeesQuery = gql(`
  query SystemEmployees($where: SystemWhere) {
    systems(where: $where) {
      uid
      operators {
        uid
        fullName
      }
      maintainedBy {
        uid
        fullName
      }
    }
  }
`)

interface UseSystemEmployeesResult {
  operators: Employee[]
  maintainedBy: Employee[]
  isLoading: boolean
  refetch: () => void
}

export const useSystemEmployees = (
  systemUid: string | undefined
): UseSystemEmployeesResult => {
  const { data, isLoading, refetch } = useGraphQL(systemEmployeesQuery, {
    variables: { where: { uid: systemUid } },
    enabled: !!systemUid
  })

  const system = data?.systems?.[0]

  return {
    operators: (system?.operators as Employee[]) ?? [],
    maintainedBy: (system?.maintainedBy as Employee[]) ?? [],
    isLoading,
    refetch
  }
}
