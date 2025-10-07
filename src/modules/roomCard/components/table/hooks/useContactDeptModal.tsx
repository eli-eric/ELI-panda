import { useCallback } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import type { ModalSize } from '@/components/ui/dialog'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import type { Employee } from '@/types/gql/graphql'

import { useRoomCardStore } from '../../../store/useRoomCardStore'
import type { ContactDeptFormData } from '../schemas/contactDept.schema'
import { ContactDeptModalContainer } from '../ContactDeptModal.cont'

export const useContactDeptModal = () => {
  const { openModal, closeModal } = useModalGlobalStore()
  const { setNewDeptContact } = useRoomCardStore()
  const { control } = useFormContext()
  const { append, fields } = useFieldArray({
    control,
    name: 'contactPersonsDept'
  })

  return useCallback(() => {
    // Get existing employee UIDs to prevent duplicates
    const existingEmployeeUids = fields.map((field: any) => field?.uid).filter(Boolean)

    openModal('dialog1', {
      component: ContactDeptModalContainer,
      props: {
        title: 'Add Contact Person (Dept)',
        size: 'l' as ModalSize,
        existingEmployeeUids,
        onSubmit: (data: ContactDeptFormData) => {
          if (data.employee) {
            // Add to form array with full employee data
            append({
              ...(data.employee as any),
              uuid: crypto.randomUUID()
            })

            // Track in store for API update
            setNewDeptContact(data.employee as Employee)

            // Close modal
            closeModal('dialog1')
          }
        }
      },
      onClose: () => {
        // Cleanup if needed
      }
    })
  }, [openModal, closeModal, fields, append, setNewDeptContact])
}
