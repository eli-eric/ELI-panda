import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

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

  const [clearSystemCode, { loading }] = useMutation(SYSTEM_CODE_CLEAR, {
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
      toast.success('System code has been released')
    },
    onError: () => {
      toast.error('Failed to release system code')
    }
  })

  return { clearSystemCode, loading }
}
