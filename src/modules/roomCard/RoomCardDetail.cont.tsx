import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { array, object, string } from 'yup'

import LoaderComponent from '@/components/loader.comp'

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
  const { roomCard, loading } = useRoomCard(roomCardUid)
  //TODO: fix typing
  const formMethods = useForm<RoomCardFormType>({
    defaultValues: {
      name: roomCard?.name as string,
      status: roomCard?.status as any,
      contactPersonsDept: roomCard?.contactPersonsDept as any,
      contactPersonsHall: roomCard?.contactPersonsHall as any,
      teams: roomCard?.teams as any,
      purityClass: roomCard?.purityClass as string,
      prescribedClothing: roomCard?.prescribedClothing as string,
      entryToHvacTent: roomCard?.entryToHvacTent as string,
      additionalRequirements: roomCard?.additionalRequirements as string,
      cleaningScheduleDays: roomCard?.cleaningScheduleDays as any,
      cleaningScheduleDate: roomCard?.cleaningScheduleDate,
      coolingWater: roomCard?.coolingWater as string,
      indoorEnvironmentQuality: roomCard?.indoorEnvironmentQuality as string,
      compressedAirDistribution: roomCard?.compressedAirDistribution as string,
      nitrogenCentralDistribution: roomCard?.nitrogenCentralDistribution as string,
      maxPressureInColdDistribution: roomCard?.maxPressureInColdDistribution as string,
      coolingWaterClient: roomCard?.coolingWaterClient as string,
      indoorEnvironmentQualityClient: roomCard?.indoorEnvironmentQualityClient as string,
      compressedAirDistributionClient: roomCard?.compressedAirDistributionClient as string,
      nitrogenCentralDistributionClient: roomCard?.nitrogenCentralDistributionClient as string,
      maxPressureInColdDistributionClient: roomCard?.maxPressureInColdDistributionClient as string,
      locations: roomCard?.locations.map(location => ({
        uid: location.uid as string,
        code: location.code as string,
        name: location.name as string,
        children: undefined
      })) as any
    },
    resolver: yupResolver(schema) as any
  })
  const { watch, handleSubmit } = formMethods
  const { updateRoomCard } = useRoomCardUpdate(roomCardUid)
  const { clear } = useRoomCardStore()

  const status = watch('status')
  const teams = watch('teams')
  const contactPersonsHall = watch('contactPersonsHall')
  const contactPersonsDept = watch('contactPersonsDept')
  const locations = watch('locations')

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

  if (loading) return <LoaderComponent />

  return (
    <Fragment>
      {roomCard && (
        <RoomCardComponent
          formMethods={formMethods}
          status={status}
          onSubmitAndExit={onSubmitAndExit}
          onSubmit={onSubmit}
          contactPersonsHall={contactPersonsHall}
          contactPersonsDept={contactPersonsDept}
          teams={teams}
          locations={locations}
        />
      )}
    </Fragment>
  )
}
