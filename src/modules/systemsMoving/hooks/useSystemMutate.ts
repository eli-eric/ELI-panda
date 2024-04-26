import { SYSTEM_DETAIL } from '@/utils/graphql/fragments'
import { gql, useMutation } from '@apollo/client'
import toast from 'react-hot-toast'

const UPDATE_SYSTEM = gql`
  ${SYSTEM_DETAIL}
  mutation UpdateSystems(
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
`

export const useSystemMutation = () => {
  const [update, { loading }] = useMutation(UPDATE_SYSTEM, {
    onError: error => {
      toast.error('Something went wrong: ' + error.message)
    }
  })

  return { update, loading }
}
