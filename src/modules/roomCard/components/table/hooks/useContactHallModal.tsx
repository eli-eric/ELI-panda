import { useCallback } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import type { ModalSize } from '@/components/ui/dialog'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import type { ContactPersonRole, Employee } from '@/types/gql/graphql'

import { useRoomCardStore } from '../../../store/useRoomCardStore'
import { ContactHallModalContainer } from '../ContactHallModal.cont'
import type { ContactHallFormData } from '../schemas/contactHall.schema'

export const useContactHallModal = () => {
  const { openModal, closeModal } = useDynamicModalStore()
  const { setNewHallContact } = useRoomCardStore()
  const { control } = useFormContext()
  const { append, fields } = useFieldArray({
    control,
    name: 'contactPersonsHall'
  })

  return useCallback(() => {
    // Get existing employee UIDs to prevent duplicates
    const existingEmployeeUids = fields
      .map((field: any) => field?.employee?.uid)
      .filter(Boolean)

    const modalId = openModal('dialog', {
      id: 'contact-hall',
      component: ContactHallModalContainer,
      props: {
        title: 'Add Contact Person (Hall)',
        size: 'l' as ModalSize,
        existingEmployeeUids
      },
      onClose: () => {
        // Cleanup if needed
      },
      onSubmit: (data: ContactHallFormData) => {
        if (data.employee && data.role) {
          // Add to form array with full employee data
          append({
            employee: {
              ...(data.employee as any),
              facilityConnection: null,
              userConnection: null
            },
            role: data.role,
            uuid: crypto.randomUUID()
          })

          // Track in store for API update
          setNewHallContact({
            employee: data.employee as Employee,
            role: data.role as ContactPersonRole
          })

          // Close modal
          closeModal(modalId)
        }
      }
    })
  }, [openModal, closeModal, fields, append, setNewHallContact])
}
