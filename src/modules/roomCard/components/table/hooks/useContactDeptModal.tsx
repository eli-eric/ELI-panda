import { useCallback } from 'react'
import { toast } from 'sonner'

import type { ModalSize } from '@/components/ui/dialog'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useConnectDeptContact } from '../../../hooks/useContactMutations'
import { useRoomCardContactsDept } from '../../../hooks/useRoomCardContacts'
import { ContactDeptModalContainer } from '../ContactDeptModal.cont'
import type { ContactDeptFormData } from '../schemas/contactDept.schema'

export const useContactDeptModal = (roomCardUid?: string) => {
  const { openModal, closeModal } = useDynamicModalStore()
  const { connectDeptContact } = useConnectDeptContact(roomCardUid || '')
  const { contactPersonsDept } = useRoomCardContactsDept(roomCardUid)

  return useCallback(() => {
    const modalId = openModal('dialog', {
      id: 'contact-dept',
      component: ContactDeptModalContainer,
      props: {
        title: 'Add Contact Person (Dept)',
        size: 'l' as ModalSize
      },
      onSubmit: async (data: ContactDeptFormData) => {
        if (data.employee && roomCardUid) {
          // Check for duplicate using fresh data
          const isDuplicate = contactPersonsDept?.some(
            (contact: any) => contact?.uid === data.employee?.uid
          )

          if (isDuplicate) {
            toast.error('This employee is already added')
            return
          }

          toast.promise(connectDeptContact(data.employee.uid), {
            loading: 'Adding contact person (Dept)...',
            success: () => {
              closeModal(modalId)
              return 'Contact person (Dept) added'
            },
            error: 'Failed to add contact person'
          })
        }
      },
      onClose: () => {
        // Cleanup if needed
      }
    })
  }, [
    openModal,
    closeModal,
    roomCardUid,
    contactPersonsDept,
    connectDeptContact
  ])
}
