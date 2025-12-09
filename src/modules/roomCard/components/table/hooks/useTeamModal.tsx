import { useCallback } from 'react'
import { toast } from 'sonner'

import type { ModalSize } from '@/components/ui/dialog'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useConnectTeam } from '../../../hooks/useContactMutations'
import { useRoomCardTeams } from '../../../hooks/useRoomCardContacts'
import type { TeamFormData } from '../schemas/team.schema'
import { TeamModalContainer } from '../TeamModal.cont'

export const useTeamModal = (roomCardUid?: string) => {
  const { openModal, closeModal } = useDynamicModalStore()
  const { connectTeam } = useConnectTeam(roomCardUid || '')
  const { teams } = useRoomCardTeams(roomCardUid)

  return useCallback(() => {
    const modalId = openModal('dialog', {
      id: 'team-modal',
      component: TeamModalContainer,
      props: {
        title: 'Add Team',
        size: 'm' as ModalSize
      },
      onSubmit: async (data: TeamFormData) => {
        if (data.team && roomCardUid) {
          // Check for duplicate using fresh data
          const isDuplicate = teams.some(
            (team: any) => team?.uid === data.team?.uid
          )

          if (isDuplicate) {
            toast.error('This team is already added')
            return
          }

          toast.promise(connectTeam(data.team.uid), {
            loading: 'Adding team...',
            success: () => {
              closeModal(modalId)
              return 'Team added'
            },
            error: 'Failed to add team'
          })
        }
      },
      onClose: () => {
        // Cleanup if needed
      }
    })
  }, [openModal, closeModal, roomCardUid, teams, connectTeam])
}
