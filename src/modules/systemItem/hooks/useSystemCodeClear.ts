import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

const clearSystemCodeMutation = gql(`
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
`)

export const useSystemCodeClear = () => {
  const { setValue } = useFormContext()

  const { mutate: clearSystemCode, isPending: loading } = useGraphQLMutation(
    clearSystemCodeMutation,
    {
      onSuccess: () => {
        setValue('systemCode', '')
        toast.success('System code has been released')
      },
      onError: () => {
        toast.error('Failed to release system code')
      }
    }
  )

  return { clearSystemCode, loading }
}
