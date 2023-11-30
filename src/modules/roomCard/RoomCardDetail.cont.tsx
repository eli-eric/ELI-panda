import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { array, object, string } from 'yup'

import Listbox from '@/components/form/Listbox'
import LoaderComponent from '@/components/loader.comp'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'
import { RoomCardStatus } from '@/types/gql/graphql'

import { useRoomCard } from './hooks/useRoomCard'
import { useRoomCardUpdate } from './hooks/useRoomCardUpdate'
import { RoomCardComponent } from './RoomCard.comp'
import { useRoomCardStore } from './store/useRoomCardStore'
import type { RoomCardFormType } from './types/form'

interface Props {
  roomCardUid?: string
}

const schema = object().shape({
  status: string().required('Status is required'),
  teams: array().of(object().required('Team is required')).min(1, 'At least one team is required'),
  contactPersonsHall: array()
    .of(object().nullable().required('Team is required'))
    .min(1, 'At least one Hall contact is required'),
  contactPersonsDept: array()
    .of(object().nullable().required('Team is required'))
    .min(1, 'At least one department contact is required')
})

export const RoomCardDetailContainer = ({ roomCardUid }: Props) => {
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])

  const { roomCard, loading } = useRoomCard(roomCardUid)
  //TODO: fix typing
  const formMethods = useForm<RoomCardFormType>({ defaultValues: {}, resolver: yupResolver(schema) as any })
  const { reset, watch, handleSubmit } = formMethods
  const { updateRoomCard } = useRoomCardUpdate(roomCardUid)
  const { clear } = useRoomCardStore()
  const statuses = Object.values(RoomCardStatus).map(value => value)

  const status = watch('status')
  const teams = watch('teams')
  const contactPersonsHall = watch('contactPersonsHall')
  const contactPersonsDept = watch('contactPersonsDept')

  useEffect(() => () => clear(), [clear])

  const onSubmit = handleSubmit((roomCard: RoomCardFormType) => {
    toast.promise(updateRoomCard(roomCard, false), {
      loading: 'Saving room card...',
      success: 'Room card was successfully updated',
      error: 'Error while saving room card'
    })
  })

  const onSubmitAndExit = handleSubmit((roomCard: RoomCardFormType) => {
    toast.promise(updateRoomCard(roomCard, true), {
      loading: 'Saving room card....',
      success: 'Room card was successfully updated',
      error: 'Error while saving room card'
    })
  })

  const fields = useMakeFormFields({
    status: {
      name: 'status',
      disabled: !editPersmission
    }
  })

  if (loading) return <LoaderComponent />

  return (
    <RoomCardComponent
      formMethods={formMethods}
      status={status}
      onSubmitAndExit={onSubmitAndExit}
      onSubmit={onSubmit}
      contactPersonsHall={contactPersonsHall}
      contactPersonsDept={contactPersonsDept}
      teams={teams}
    >
      <Fragment>
        <h1 className="text-2xl font-semibold">{roomCard?.location.name}</h1>
        <h1 className="text-2xl font-semibold">{' - '}</h1>
        <h1 className="text-2xl font-semibold">{roomCard?.location.code}</h1>
        <Listbox {...fields.status} className="w-72" customOptions={statuses} />
      </Fragment>
    </RoomCardComponent>
  )
}
