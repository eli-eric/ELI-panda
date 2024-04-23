import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

const clearSystemCodeMutation = gql`
  mutation ClearSystemCodeMutation(
    $where: SystemWhere
    $update: SystemUpdateInput
  ) {
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

  const [clearSystemCode, { loading }] = useMutation(clearSystemCodeMutation, {
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
