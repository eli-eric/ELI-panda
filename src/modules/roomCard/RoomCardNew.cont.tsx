import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { array, object, string } from 'yup'

import Listbox from '@/components/form/Listbox'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import { PATH } from '@/types/constants/paths'
import type { RoomCard } from '@/types/gql/graphql'
import { RoomCardStatus } from '@/types/gql/graphql'

import { SelectLocationTree } from '../shared/form/SelectLocation.combo'
import { makeRoomCardsCreateData, useRoomCardCreate } from './hooks/useRoomCardCreate'
import { RoomCardComponent } from './RoomCard.comp'
import { useRoomCardStore } from './store/useRoomCardStore'

const messages = message.roomCardsPage.form

const schema = object().shape({
  status: string().required('Status is required'),
  location: object().nullable().required('Location is required'),
  teams: array().of(object().nullable().required('Team is required')).min(1, 'At least one team is required'),
  contactPersonsHall: array().of(object().required('Team is required')).min(1, 'At least one Hall contact is required'),
  contactPersonsDept: array()
    .of(object().nullable().required('Team is required'))
    .min(1, 'At least one department contact is required')
})

export const RoomCardNewContainer = () => {
  const formMethods = useForm<RoomCard>({ resolver: yupResolver(schema) })
  const router = useRouter()
  const { watch, handleSubmit } = formMethods
  const { createRoomCard } = useRoomCardCreate()
  const contactPersonsHall = useWatch({ control: formMethods.control, name: 'contactPersonsHall' })
  const status = watch('status')
  const teams = watch('teams')
  const contactPersonsDept = watch('contactPersonsDept')
  const statuses = Object.values(RoomCardStatus).map(value => value)

  const { clear } = useRoomCardStore()
  useEffect(() => () => clear(), [clear])

  const fields = useMakeFormFields({
    location: {
      name: 'location',
      disabled: false,
      placeholder: messages.location.placeholder,
      codebook: CODEBOOK.LOCATION
    },
    status: {
      name: 'status',
      placeholder: messages.status.placeholder,
      disabled: false
    }
  })

  const onSubmit = handleSubmit(data => {
    toast.promise(
      createRoomCard({
        variables: makeRoomCardsCreateData(data),
        onCompleted: data => router.push(PATH.ROOM_CARD + '/' + data?.createRoomCards?.roomCards[0].uid)
      }),
      {
        loading: 'Saving room card...',
        success: 'Room card was successfully updated',
        error: 'Error while saving room card'
      }
    )
  })

  const onSubmitAndExit = handleSubmit(data => {
    toast.promise(
      createRoomCard({
        variables: makeRoomCardsCreateData(data),
        onCompleted: () => router.push(PATH.ROOM_CARDS)
      }),
      {
        loading: 'Saving room card...',
        success: 'Room card was successfully updated',
        error: 'Error while saving room card'
      }
    )
  })

  return (
    <RoomCardComponent
      {...{
        formMethods,
        status,
        onSubmitAndExit,
        onSubmit,
        contactPersonsHall,
        contactPersonsDept,
        teams,
        fields
      }}
    >
      <Fragment>
        <h1 className="text-2xl font-semibold">New room card</h1>
        <SelectLocationTree className="w-72" locationField={fields.location} />
        <Listbox {...fields.status} className="w-72" customOptions={statuses} />
      </Fragment>
    </RoomCardComponent>
  )
}
