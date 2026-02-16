import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import type { ModalSize } from '@/components/ui/dialog'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { EmployeeAssignmentModalContainer } from '../components/EmployeeAssignmentModal.cont'
import type { EmployeeAssignmentFormData } from '../schemas/employeeAssignment.schema'
import type { EmployeeAssignment } from '../types'

interface UseEmployeeAssignmentModalProps {
    existingEmployeeUids: string[]
    onEmployeeSelected: (employee: EmployeeAssignment) => void | Promise<void>
    title?: string
}

export const useEmployeeAssignmentModal = ({
    existingEmployeeUids,
    onEmployeeSelected,
    title,
}: UseEmployeeAssignmentModalProps) => {
    const { formatMessage: fm } = useIntl()
    const { openModal, closeModal } = useDynamicModalStore()
    const modalTitle = title ?? fm({ id: message.common.employeeAssignment.modalTitle })

    return useCallback(() => {
        const modalId = openModal('dialog', {
            id: 'employee-add',
            component: EmployeeAssignmentModalContainer,
            props: {
                title: modalTitle,
                size: 'l' as ModalSize,
                existingEmployeeUids,
            },
            onSubmit: async (data: EmployeeAssignmentFormData) => {
                if (data.employee) {
                    await onEmployeeSelected(data.employee)
                    closeModal(modalId)
                }
            },
        })
    }, [openModal, closeModal, existingEmployeeUids, onEmployeeSelected, modalTitle])
}
