import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'

const SYSTEM_CODE_CLEAR = gql`
  mutation Mutation($where: SystemWhere, $update: SystemUpdateInput) {
    updateSystems(where: $where, update: $update) {
      systems {
        systemCode
      }
    }
  }
`

export const useSystemCodeClear = () => {
  const router = useRouter()
  const uid = router.query.uid as string | undefined
  const { setValue } = useFormContext()

  const [clearSystemCode] = useMutation(SYSTEM_CODE_CLEAR, {
    variables: {
      where: {
        uid: uid
      },
      update: {
        systemCode: null
      }
    },
    onCompleted: () => {
      setValue('systemCode', '')
    }
  })

  return { clearSystemCode }
}
