import { useCallback } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import type { ModalSize } from '@/components/ui/dialog'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import type { Team } from '@/types/gql/graphql'

import { useRoomCardStore } from '../../../store/useRoomCardStore'
import type { TeamFormData } from '../schemas/team.schema'
import { TeamModalContainer } from '../TeamModal.cont'

export const useTeamModal = () => {
  const { openModal, closeModal } = useDynamicModalStore()
  const { setNewTeam } = useRoomCardStore()
  const { control } = useFormContext()
  const { append, fields } = useFieldArray({
    control,
    name: 'teams'
  })

  return useCallback(() => {
    // Get existing team UIDs to prevent duplicates
    const existingTeamUids = fields
      .map((field: any) => field?.uid)
      .filter(Boolean)

    const modalId = openModal('dialog', {
      id: 'team-modal',
      component: TeamModalContainer,
      props: {
        title: 'Add Team',
        size: 'm' as ModalSize,
        existingTeamUids,
        onSubmit: (data: TeamFormData) => {
          if (data.team) {
            // Add to form array
            append({
              ...data.team,
              uuid: crypto.randomUUID()
            })

            // Track in store for API update
            setNewTeam(data.team as Team)

            // Close modal
            closeModal(modalId)
          }
        }
      },
      onClose: () => {
        // Cleanup if needed
      }
    })
  }, [openModal, closeModal, fields, append, setNewTeam])
}
