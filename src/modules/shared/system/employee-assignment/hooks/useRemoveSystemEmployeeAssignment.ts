import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { message } from '@/i18n/src/messages'
import { gql } from '@/types/gql'
import { whereN } from '@/utils/graphql/mutations'

import type { EmployeeAssignmentType } from '../types'

const removeEmployeeMutation = gql(`
  mutation RemoveSystemEmployee($where: SystemWhere, $update: SystemUpdateInput!) {
    updateSystems(where: $where, update: $update) {
      systems {
        uid
      }
    }
  }
`)

interface UseRemoveSystemEmployeeAssignmentOptions {
    onSuccess?: () => void
}

export const useRemoveSystemEmployeeAssignment = (
    systemUid: string | undefined,
    employeeType: EmployeeAssignmentType,
    options?: UseRemoveSystemEmployeeAssignmentOptions,
) => {
    const { formatMessage: fm } = useIntl()
    const { mutateAsync, isPending } = useGraphQLMutation(removeEmployeeMutation)

    const removeEmployee = async (employeeUid: string) => {
        if (!systemUid) {
            toast.error(fm({ id: message.common.employeeAssignment.systemUidRequired }))
            return
        }

        const update = {
            [employeeType]: [{ disconnect: [whereN(employeeUid)] }],
        }

        toast.promise(mutateAsync({ where: { uid: systemUid }, update }), {
            loading: fm({ id: message.common.employeeAssignment.toast.removing }),
            success: () => {
                options?.onSuccess?.()
                return fm({ id: message.common.employeeAssignment.toast.removed })
            },
            error: fm({ id: message.common.employeeAssignment.toast.removeFailed }),
        })
    }

    return { removeEmployee, isRemoving: isPending }
}
