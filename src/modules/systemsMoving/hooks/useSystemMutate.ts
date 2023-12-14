import { gql, useMutation } from '@apollo/client'
import toast from 'react-hot-toast'

import type { Mutation, MutationUpdateSystemsArgs } from '@/types/gql/graphql'
import { SYSTEM_DETAIL } from '@/utils/graphql/fragments'

const UPDATE_SYSTEM = gql`
  ${SYSTEM_DETAIL}
  mutation UpdateSystems($where: SystemWhere, $update: SystemUpdateInput!) {
    updateSystems(where: $where, update: $update) {
      systems {
        ...SystemDetail
      }
    }
  }
`

export const useSystemMutation = () => {
  const [update, { loading }] = useMutation<Mutation, MutationUpdateSystemsArgs>(UPDATE_SYSTEM, {
    onError: error => {
      toast.error('Something went wrong: ' + error.message)
    }
  })

  return { update, loading }
}
