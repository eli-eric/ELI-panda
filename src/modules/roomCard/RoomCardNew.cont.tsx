import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { array, object, string } from 'yup'

import { PATH } from '@/types/constants/paths'

import { makeRoomCardsCreateData, useRoomCardCreate } from './hooks/useRoomCardCreate'
import { RoomCardComponent } from './RoomCard.comp'
import { useRoomCardStore } from './store/useRoomCardStore'
import type { RoomCardFormType } from './types/form'

const schema = object().shape({
  status: string().required('Status is required'),
  name: string().required('Name is required'),
  teams: array().of(object().nullable().required('Team is required')).min(1, 'At least one team is required'),
  contactPersonsHall: array().of(object().required('Team is required')).min(1, 'At least one Hall contact is required'),
  contactPersonsDept: array()
    .of(object().nullable().required('Team is required'))
    .min(1, 'At least one department contact is required'),
  locations: array()
    .of(object().nullable().required('Location is required'))
    .min(1, 'At least one location is required')
})

export const RoomCardNewContainer = () => {
  //TODO: fix typing
  const formMethods = useForm<RoomCardFormType>({ resolver: yupResolver(schema) as any })

  const router = useRouter()
  const { watch, handleSubmit } = formMethods
  const { createRoomCard } = useRoomCardCreate()
  const contactPersonsHall = watch('contactPersonsHall')
  const status = watch('status')
  const teams = watch('teams')
  const contactPersonsDept = watch('contactPersonsDept')
  const locations = watch('locations')

  const { clear } = useRoomCardStore()
  useEffect(() => () => clear(), [clear])

  const onSubmit = handleSubmit(data => {
    toast.promise(
      createRoomCard({
        variables: makeRoomCardsCreateData(data),
        onCompleted: data => router.push(PATH.ROOM_CARD + '/' + data?.createRoomCards?.roomCards[0].uid),
        refetchQueries: ['RoomCards', 'RoomCard']
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
        locations
      }}
    />
  )
}
