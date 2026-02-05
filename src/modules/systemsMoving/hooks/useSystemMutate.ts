import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

const UPDATE_SYSTEM = gql(`
  mutation UpdateSystemMovingMutation(
    $where: SystemWhere
    $update: SystemUpdateInput!
  ) {
    updateSystems(where: $where, update: $update) {
      systems {
        ...SystemDetail
      }
    }
  }
`)

const MOVE_SYSTEM = gql(`
  mutation MoveSystemMutation(
    $systemUid: ID!
    $newParentUid: ID!
    $oldParentUid: ID
  ) {
    moveSystem(
      systemUid: $systemUid
      newParentUid: $newParentUid
      oldParentUid: $oldParentUid
    )
  }
`)

export const useSystemMutation = () => {
    const { mutate: updateMutate, isPending: updatePending } = useGraphQLMutation(UPDATE_SYSTEM, {
        onError: error => {
            toast.error('Failed to update system: ' + error.message)
        },
    })

    const { mutate: moveMutate, isPending: movePending } = useGraphQLMutation(MOVE_SYSTEM, {
        onError: error => {
            toast.error('Failed to move system: ' + error.message)
        },
    })

    return {
        update: updateMutate,
        moveSystem: moveMutate,
        loading: updatePending || movePending,
    }
}
