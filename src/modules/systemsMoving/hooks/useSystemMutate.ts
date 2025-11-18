import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

const UPDATE_SYSTEM = gql(`
  mutation UpdateSystemParentMutation(
    $where: SystemWhere
    $update: SystemUpdateInput!
    $systemFromUid: String
    $systemUid: String
  ) {
    updateSystems(where: $where, update: $update) {
      systems {
        ...SystemDetail
      }
    }
    systemMovedFromResolver(
      systemFromUid: $systemFromUid
      systemUid: $systemUid
    )
  }
`)

export const useSystemMutation = () => {
  const { mutate, isPending } = useGraphQLMutation(UPDATE_SYSTEM, {
    onError: error => {
      toast.error('Something went wrong: ' + error.message)
    }
  })

  return { update: mutate, loading: isPending }
}
