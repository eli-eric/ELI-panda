import { useCallback } from 'react'
import { toast } from 'sonner'

import type { ModalSize } from '@/components/ui/dialog'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useCreateHallContact } from '../../../hooks/useContactMutations'
import { useRoomCardContactsHall } from '../../../hooks/useRoomCardContacts'
import { ContactHallModalContainer } from '../ContactHallModal.cont'
import type { ContactHallFormData } from '../schemas/contactHall.schema'

export const useContactHallModal = (roomCardUid?: string) => {
  const { openModal, closeModal } = useDynamicModalStore()
  const { createHallContact } = useCreateHallContact(roomCardUid || '')
  const { contactPersonsHall } = useRoomCardContactsHall(roomCardUid)

  return useCallback(() => {
    const modalId = openModal('dialog', {
      id: 'contact-hall',
      component: ContactHallModalContainer,
      props: {
        title: 'Add Contact Person (Hall)',
        size: 'l' as ModalSize
      },
      onClose: () => {
        // Cleanup if needed
      },
      onSubmit: async (data: ContactHallFormData) => {
        if (data.employee && data.role && roomCardUid) {
          // Check for duplicate (same employee + same role combination) using fresh data
          const isDuplicate = contactPersonsHall.some(
            (contact: any) =>
              contact?.employee?.uid === data.employee?.uid &&
              contact?.role?.uid === data.role?.uid
          )

          if (isDuplicate) {
            toast.error('This employee with this role already exists')
            return
          }

          try {
            await createHallContact(data.employee.uid, data.role.uid)
            toast.success('Contact person added')
            closeModal(modalId)
          } catch {
            toast.error('Failed to add contact person')
          }
        }
      }
    })
  }, [openModal, closeModal, roomCardUid, contactPersonsHall, createHallContact])
}
