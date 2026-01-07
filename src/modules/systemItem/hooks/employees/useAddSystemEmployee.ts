import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'
import { whereN } from '@/utils/graphql/mutations'

type EmployeeType = 'operators' | 'maintainedBy'

const addEmployeeMutation = gql(`
  mutation AddSystemEmployee($where: SystemWhere, $update: SystemUpdateInput!) {
    updateSystems(where: $where, update: $update) {
      systems {
        uid
      }
    }
  }
`)

interface UseAddSystemEmployeeOptions {
  onSuccess?: () => void
}

export const useAddSystemEmployee = (
  systemUid: string | undefined,
  employeeType: EmployeeType,
  options?: UseAddSystemEmployeeOptions
) => {
  const { mutateAsync, isPending } = useGraphQLMutation(addEmployeeMutation)

  const addEmployee = async (employeeUid: string) => {
    if (!systemUid) {
      toast.error('System UID is required')
      return
    }

    const update = {
      [employeeType]: [{ connect: [whereN(employeeUid)] }]
    }

    toast.promise(mutateAsync({ where: { uid: systemUid }, update }), {
      loading: 'Adding employee...',
      success: () => {
        options?.onSuccess?.()
        return 'Employee added'
      },
      error: 'Failed to add employee'
    })
  }

  return { addEmployee, isAdding: isPending }
}
