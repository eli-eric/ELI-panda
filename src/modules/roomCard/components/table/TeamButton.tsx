import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { object } from 'yup'

import Listbox from '@/components/form/Listbox'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'

import { useTeams } from '../../hooks/useTeams'
import { HeaderButtonModalComponent } from './HeaderButtonModal.comp'

const nestedForm = message.roomCardsPage.nestedForm

const schema = object().shape({
  team: object().nullable().required('Team is required')
})

export const TeamButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formMethods = useForm({ resolver: yupResolver(schema) })

  const { teams } = useTeams()

  const { control } = useFormContext()
  const { insert, fields: arrayFields } = useFieldArray({ control, name: 'teams' })

  const onSubmit = data => {
    insert(arrayFields.length, data.team)
  }

  const fields = useMakeFormFields({
    team: {
      name: 'team',
      disabled: false,
      label: nestedForm.team.label
    }
  })

  return (
    <HeaderButtonModalComponent
      formMethods={formMethods}
      isModalOpen={isModalOpen}
      onSubmit={onSubmit}
      setIsModalOpen={setIsModalOpen}
    >
      <Listbox {...fields.team} codebookResponse={teams} />
    </HeaderButtonModalComponent>
  )
}
