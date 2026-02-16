import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { message } from '@/i18n/src/messages'
import { gql } from '@/types/gql'
import { whereN } from '@/utils/graphql/mutations'

import type { EmployeeAssignmentType } from '../types'

const addEmployeeMutation = gql(`
  mutation AddSystemEmployee($where: SystemWhere, $update: SystemUpdateInput!) {
    updateSystems(where: $where, update: $update) {
      systems {
        uid
      }
    }
  }
`)

interface UseAddSystemEmployeeAssignmentOptions {
    onSuccess?: () => void
}

export const useAddSystemEmployeeAssignment = (
    systemUid: string | undefined,
    employeeType: EmployeeAssignmentType,
    options?: UseAddSystemEmployeeAssignmentOptions,
) => {
    const { formatMessage: fm } = useIntl()
    const { mutateAsync, isPending } = useGraphQLMutation(addEmployeeMutation)

    const addEmployee = async (employeeUid: string) => {
        if (!systemUid) {
            toast.error(fm({ id: message.common.employeeAssignment.systemUidRequired }))
            return
        }

        const update = {
            [employeeType]: [{ connect: [whereN(employeeUid)] }],
        }

        toast.promise(mutateAsync({ where: { uid: systemUid }, update }), {
            loading: fm({ id: message.common.employeeAssignment.toast.adding }),
            success: () => {
                options?.onSuccess?.()
                return fm({ id: message.common.employeeAssignment.toast.added })
            },
            error: fm({ id: message.common.employeeAssignment.toast.addFailed }),
        })
    }

    return { addEmployee, isAdding: isPending }
}
