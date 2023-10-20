import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { object } from 'yup'

import Listbox from '@/components/form/Listbox'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import type { RoomCard } from '@/types/gql/graphql'

import { useTeams } from '../../hooks/useTeams'
import { useRoomCardStore } from '../../store/useRoomCardStore'
import { HeaderButtonModalComponent } from './HeaderButtonModal.comp'

const nestedForm = message.roomCardsPage.nestedForm

export const TeamButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formMethods = useForm({ resolver: yupResolver(makeSchema()) })
  const { setNewTeam } = useRoomCardStore()

  const { teams } = useTeams()

  const { control } = useFormContext<RoomCard>()
  const { insert, fields: arrayFields } = useFieldArray({ control, name: 'teams' })

  const onSubmit = data => {
    insert(arrayFields.length, data.team)
    setNewTeam(data.team)
  }

  const fields = useMakeFormFields({
    team: {
      name: 'team',
      disabled: false,
      label: nestedForm.team.label
    }
  })

  function makeSchema() {
    return object().shape({
      team: object()
        .nullable()
        .required('Team is required')
        .test(
          'is-unique',
          'Team already selected',
          value => !arrayFields.some(field => field.uid === value?.uid) // assuming each team has an 'id' property
        )
    })
  }

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
