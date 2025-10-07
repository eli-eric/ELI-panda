import { useCallback } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import type { ModalSize } from '@/components/ui/dialog'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import type { Employee } from '@/types/gql/graphql'

import { EmployeeModalContainer } from '../EmployeeModal.cont'
import type { EmployeeFormData } from '../schemas/employee.schema'

interface UseEmployeeModalProps {
  fieldName: string
  onEmployeeAdded: (employee: Employee) => void
}

export const useEmployeeModal = ({
  fieldName,
  onEmployeeAdded
}: UseEmployeeModalProps) => {
  const { openModal, closeModal } = useModalGlobalStore()
  const { control } = useFormContext()
  const { append, fields } = useFieldArray({
    control,
    name: fieldName
  })

  return useCallback(() => {
    // Get existing employee UIDs to prevent duplicates
    const existingEmployeeUids = fields
      .map((field: any) => field?.uid)
      .filter(Boolean)

    openModal('dialog1', {
      component: EmployeeModalContainer,
      props: {
        title: 'Add Employee',
        size: 'l' as ModalSize,
        existingEmployeeUids,
        onSubmit: (data: EmployeeFormData) => {
          if (data.employee) {
            // Add to form array with full employee data
            append(data.employee as any)

            // Notify parent via callback
            onEmployeeAdded(data.employee as Employee)

            // Close modal
            closeModal('dialog1')
          }
        }
      },
      onClose: () => {
        // Cleanup if needed
      }
    })
  }, [openModal, closeModal, fields, append, onEmployeeAdded])
}
