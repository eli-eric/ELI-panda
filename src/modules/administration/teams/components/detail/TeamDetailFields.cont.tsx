import type { FC } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { InlineFieldInput, InlineFieldTextArea } from '@/components/ui/inline-field'
import { message } from '@/i18n/src/messages'

import type { TeamField } from '../../hooks/useTeamFieldUpdate'
import { useTeamFieldUpdate } from '../../hooks/useTeamFieldUpdate'
import type { TeamDetail } from '../../types/team.types'

interface TeamDetailFieldsProps {
    team: TeamDetail
}

const fields = message.teamsPage.fields

export const TeamDetailFields: FC<TeamDetailFieldsProps> = ({ team }) => {
    const { formatMessage: fm } = useIntl()
    const { updateField } = useTeamFieldUpdate()

    const makeSave = (field: TeamField) => async (value: string) => {
        if (field === 'name' && !value.trim()) {
            toast.error(fm({ id: fields.nameRequired }))
            return Promise.reject(new Error('name-required'))
        }
        // Clearing an optional field sends null; name is always non-empty here.
        const payload = field === 'name' ? value.trim() : value.trim() || null
        await updateField(team.uid, field, payload)
    }

    return (
        <div className="space-y-1 p-4">
            <InlineFieldInput
                label={fm({ id: fields.name.label })}
                value={team.name}
                placeholder={fm({ id: fields.name.placeholder })}
                onSave={makeSave('name')}
            />
            <InlineFieldInput
                label={fm({ id: fields.code.label })}
                value={team.code || null}
                placeholder={fm({ id: fields.code.placeholder })}
                onSave={makeSave('code')}
            />
            <InlineFieldTextArea
                label={fm({ id: fields.description.label })}
                value={team.description || null}
                placeholder={fm({ id: fields.description.placeholder })}
                onSave={makeSave('description')}
            />
        </div>
    )
}
