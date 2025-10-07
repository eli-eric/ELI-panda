import { PlusButton } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'

import { useTeamModal } from './hooks/useTeamModal'

export const TeamButton = () => {
  const canEdit = usePermission([ROLE.ROOM_CARD_EDIT])
  const openTeamModal = useTeamModal()

  if (!canEdit) return null

  return <PlusButton type="button" onClick={openTeamModal} />
}
