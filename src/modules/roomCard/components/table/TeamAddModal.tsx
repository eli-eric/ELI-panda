import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { z } from 'zod'

import Combobox from '@/components/form/Combobox'
import { Form } from '@/components/form/Form'
import { Button } from '@/components/ui/button'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

import { useTeams } from '../../hooks/useTeams'
import { useRoomCardStore } from '../../store/useRoomCardStore'

const messages = message.common.buttons
const nestedForm = message.roomCardsPage.nestedForm

const schema = z.object({
  team: z.object({
    uid: z.string(),
    name: z.string()
  }).refine(val => val.uid, 'Team is required')
})

type FormData = z.infer<typeof schema>

interface TeamAddModalProps {
  onClose?: () => void
}

export const TeamAddModal = ({
  onClose
}: TeamAddModalProps) => {
  const { setNewTeam } = useRoomCardStore()
  const { teams } = useTeams()

  // Local form for modal
  const formMethods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      team: undefined
    }
  })

  const { formState, watch, reset } = formMethods
  const selectedTeam = watch('team')

  const fields = useMakeFormFields({
    team: {
      name: 'team',
      disabled: false,
      label: nestedForm.team.label,
      codebook: CODEBOOK.TEAM
    }
  })

  // Form is valid when we have team selected
  const isFormValid = selectedTeam?.uid

  const handleSubmit = (data: FormData) => {
    if (!data.team) return

    // Add to store
    setNewTeam(data.team)

    // Reset and close
    reset()
    onClose?.()
  }

  return (
    <div className="space-y-6 pt-4">
      <Form formMethods={formMethods} onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Combobox
            {...fields.team}
            codebookResponse={teams}
          />

        </div>
      </Form>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          <FormattedMessage id={messages.close} />
        </Button>
        <Button
          type="button"
          disabled={!isFormValid || formState.isSubmitting}
          onClick={formMethods.handleSubmit(handleSubmit)}
        >
          {formState.isSubmitting && (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          )}
          <FormattedMessage id={messages.save} />
        </Button>
      </div>
    </div>
  )
}