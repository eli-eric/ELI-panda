import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

import Combobox from '@/components/form/Combobox'
import { Button } from '@/components/ui/button'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

import { useTeams } from '../../hooks/useTeams'
import type { TeamFormData } from './schemas/team.schema'
import { teamSchema } from './schemas/team.schema'

const nestedForm = message.roomCardsPage.nestedForm
const messages = message.common.buttons

interface TeamModalProps {
    onSubmit?: (data: TeamFormData) => void
    onClose?: () => void
}

export const TeamModalContainer = ({ onSubmit, onClose }: TeamModalProps) => {
    const { teams } = useTeams()

    const formMethods = useForm<TeamFormData>({
        resolver: zodResolver(teamSchema),
        defaultValues: {
            team: null,
        },
    })

    const { handleSubmit, formState, watch } = formMethods

    const fields = useMakeFormFields({
        team: {
            name: 'team',
            disabled: false,
            label: nestedForm.team.label,
            codebook: CODEBOOK.TEAM,
        },
    })

    const handleFormSubmit = handleSubmit(data => {
        if (onSubmit) {
            onSubmit(data)
        }
    })

    const selectedTeam = watch('team')
    const isSubmitDisabled = !selectedTeam || formState.isSubmitting

    return (
        <div className="space-y-6 min-w-0 max-w-none w-full">
            <FormProvider {...formMethods}>
                <div className="flex space-x-3">
                    <Combobox {...fields.team} codebookResponse={teams} />
                </div>
            </FormProvider>

            <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onClose}>
                    <FormattedMessage id={messages.close} />
                </Button>
                <Button type="button" disabled={isSubmitDisabled} onClick={handleFormSubmit}>
                    {formState.isSubmitting && (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    )}
                    <FormattedMessage id={messages.save} />
                </Button>
            </div>
        </div>
    )
}
