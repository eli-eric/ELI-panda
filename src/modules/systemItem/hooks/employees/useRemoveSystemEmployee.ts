import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'
import { whereN } from '@/utils/graphql/mutations'

type EmployeeType = 'operators' | 'maintainedBy'

const removeEmployeeMutation = gql(`
  mutation RemoveSystemEmployee($where: SystemWhere, $update: SystemUpdateInput!) {
    updateSystems(where: $where, update: $update) {
      systems {
        uid
      }
    }
  }
`)

interface UseRemoveSystemEmployeeOptions {
    onSuccess?: () => void
}

export const useRemoveSystemEmployee = (
    systemUid: string | undefined,
    employeeType: EmployeeType,
    options?: UseRemoveSystemEmployeeOptions,
) => {
    const { mutateAsync, isPending } = useGraphQLMutation(removeEmployeeMutation)

    const removeEmployee = async (employeeUid: string) => {
        if (!systemUid) {
            toast.error('System UID is required')
            return
        }

        const update = {
            [employeeType]: [{ disconnect: [whereN(employeeUid)] }],
        }

        toast.promise(mutateAsync({ where: { uid: systemUid }, update }), {
            loading: 'Removing employee...',
            success: () => {
                options?.onSuccess?.()
                return 'Employee removed'
            },
            error: 'Failed to remove employee',
        })
    }

    return { removeEmployee, isRemoving: isPending }
}
