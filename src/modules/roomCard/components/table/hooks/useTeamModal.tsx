import { useCallback } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import type { ModalSize } from '@/components/ui/dialog'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import type { Team } from '@/types/gql/graphql'

import { useRoomCardStore } from '../../../store/useRoomCardStore'
import type { TeamFormData } from '../schemas/team.schema'
import { TeamModalContainer } from '../TeamModal.cont'

export const useTeamModal = () => {
  const { openModal, closeModal } = useModalGlobalStore()
  const { setNewTeam } = useRoomCardStore()
  const { control } = useFormContext()
  const { append, fields } = useFieldArray({
    control,
    name: 'teams'
  })

  return useCallback(() => {
    // Get existing team UIDs to prevent duplicates
    const existingTeamUids = fields.map((field: any) => field?.uid).filter(Boolean)

    openModal('dialog1', {
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
            closeModal('dialog1')
          }
        }
      },
      onClose: () => {
        // Cleanup if needed
      }
    })
  }, [openModal, closeModal, fields, append, setNewTeam])
}
