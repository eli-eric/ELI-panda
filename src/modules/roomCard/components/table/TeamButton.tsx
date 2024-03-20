import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { mixed, object } from 'yup'

import Combobox from '@/components/form/Combobox'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import { ROLE } from '@/types/constants/roles'
import type { Team } from '@/types/gql/graphql'

import { useTeams } from '../../hooks/useTeams'
import { useRoomCardStore } from '../../store/useRoomCardStore'
import { HeaderButtonModalComponent } from './HeaderButtonModal.comp'

const nestedForm = message.roomCardsPage.nestedForm

export const TeamButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])

  const formMethods = useForm({ resolver: yupResolver(makeSchema()) })
  const { setNewTeam } = useRoomCardStore()

  const { teams } = useTeams()

  const { control } = useFormContext<any>()
  const { insert, fields: arrayFields } = useFieldArray({ control, name: 'teams' })

  const onSubmit = data => {
    insert(arrayFields.length, data.team)
    setNewTeam(data.team)
  }

  const fields = useMakeFormFields({
    team: {
      name: 'team',
      disabled: false,
      label: nestedForm.team.label,
      codebook: CODEBOOK.TEAM
    }
  })

  function makeSchema() {
    return object().shape({
      team: mixed<Team>()
        .nullable()
        .required('Team is required')
        .test(
          'is-unique',
          'Team already selected',
          //eslint-disable-next-line
          value => !arrayFields.some((field: any) => field.uid === value?.uid) // assuming each team has an 'id' property
        )
    })
  }
  if (!editPersmission) return null
  return (
    <HeaderButtonModalComponent
      formMethods={formMethods}
      isModalOpen={isModalOpen}
      onSubmit={onSubmit}
      setIsModalOpen={setIsModalOpen}
    >
      <Combobox {...fields.team} codebookResponse={teams} />
    </HeaderButtonModalComponent>
  )
}
