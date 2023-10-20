import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import Listbox from '@/components/form/Listbox'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import { PATH } from '@/types/constants/paths'
import type { RoomCard } from '@/types/gql/graphql'
import { RoomCardStatus } from '@/types/gql/graphql'

import { SelectLocationTree } from './components/SelectLocation.combo'
import { makeRoomCardsCreateData, useRoomCardCreate } from './hooks/useRoomCardCreate'
import { RoomCardComponent } from './RoomCard.comp'
import { useRoomCardStore } from './store/useRoomCardStore'

const messages = message.roomCardsPage.form

export const RoomCardNewContainer = () => {
  const formMethods = useForm<RoomCard>()
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
        <SelectLocationTree locationField={fields.location} />
        <Listbox {...fields.status} className="w-72" customOptions={statuses} />
      </Fragment>
    </RoomCardComponent>
  )
}
