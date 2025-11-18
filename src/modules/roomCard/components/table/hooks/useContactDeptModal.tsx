import { useCallback } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import type { ModalSize } from '@/components/ui/dialog'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import type { Employee } from '@/types/gql/graphql'

import { useRoomCardStore } from '../../../store/useRoomCardStore'
import { ContactDeptModalContainer } from '../ContactDeptModal.cont'
import type { ContactDeptFormData } from '../schemas/contactDept.schema'

export const useContactDeptModal = () => {
  const { openModal, closeModal } = useDynamicModalStore()
  const { setNewDeptContact } = useRoomCardStore()
  const { control } = useFormContext()
  const { append, fields } = useFieldArray({
    control,
    name: 'contactPersonsDept'
  })

  return useCallback(() => {
    // Get existing employee UIDs to prevent duplicates
    const existingEmployeeUids = fields
      .map((field: any) => field?.uid)
      .filter(Boolean)

    const modalId = openModal('dialog', {
      id: 'contact-dept',
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
            closeModal(modalId)
          }
        }
      },
      onClose: () => {
        // Cleanup if needed
      }
    })
  }, [openModal, closeModal, fields, append, setNewDeptContact])
}
