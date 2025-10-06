import { PlusButton } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'

import { useContactHallModal } from './hooks/useContactHallModal'

export const ContactHallButton = () => {
  const canEdit = usePermission([ROLE.ROOM_CARD_EDIT])
  const openContactHallModal = useContactHallModal()

  if (!canEdit) return null

  return (
    <PlusButton
      type="button"
      onClick={openContactHallModal}
    />
  )
}
