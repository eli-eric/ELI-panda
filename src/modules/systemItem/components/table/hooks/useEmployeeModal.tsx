import { useCallback } from 'react'

import type { ModalSize } from '@/components/ui/dialog'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import type { Employee } from '@/types/gql/graphql'

import { EmployeeModalContainer } from '../EmployeeModal.cont'
import type { EmployeeFormData } from '../schemas/employee.schema'

interface UseEmployeeModalProps {
  existingEmployeeUids: string[]
  onEmployeeSelected: (employee: Employee) => void | Promise<void>
}

export const useEmployeeModal = ({
  existingEmployeeUids,
  onEmployeeSelected
}: UseEmployeeModalProps) => {
  const { openModal, closeModal } = useDynamicModalStore()

  return useCallback(() => {
    const modalId = openModal('dialog', {
      id: 'employee-add',
      component: EmployeeModalContainer,
      props: {
        title: 'Add Employee',
        size: 'l' as ModalSize,
        existingEmployeeUids
      },
      onSubmit: async (data: EmployeeFormData) => {
        if (data.employee) {
          await onEmployeeSelected(data.employee as Employee)
          closeModal(modalId)
        }
      }
    })
  }, [openModal, closeModal, existingEmployeeUids, onEmployeeSelected])
}
