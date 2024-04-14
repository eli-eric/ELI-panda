import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, Suspense, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { array, object, string } from 'yup'

import LoaderComponent from '@/components/loader.comp'
import type { PrescribedClothing } from '@/types/gql/graphql'

import { useRoomCard } from './hooks/useRoomCard'
import { useRoomCardUpdate } from './hooks/useRoomCardUpdate'
import { RoomCardComponent } from './RoomCard.comp'
import { useRoomCardStore } from './store/useRoomCardStore'
import type { RoomCardFormType } from './types/form'
import FileManager from '../shared/fileManager/FileManager'
import { FILE_TYPE } from '@/types/constants/files'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from '@/components/error/ErrorPage'
import Card from '@/components/layout/Card'

interface Props {
  roomCardUid: string
}

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

export const RoomCardDetailContainer = ({ roomCardUid }: Props) => {
  const { roomCard, loading } = useRoomCard(roomCardUid)
  const canEdit = usePermission([ROLE.ROOM_CARD_EDIT])
  //TODO: fix typing
  const formMethods = useForm<RoomCardFormType>({
    defaultValues: {
      name: roomCard?.name as string,
      status: roomCard?.status,
      contactPersonsDept: roomCard?.contactPersonsDept as any,
      contactPersonsHall: roomCard?.contactPersonsHall as any,
      teams: roomCard?.teams as any,
      locations: roomCard?.locations as any,
      purityClass: roomCard?.purityClass as any,
      prescribedClothing: roomCard?.prescribedClothing as PrescribedClothing[],
      entryToHvacTent: roomCard?.entryToHvacTent as string,
      additionalRequirements: roomCard?.additionalRequirements as string,
      cleaningScheduleDays: roomCard?.cleaningScheduleDays as any,
      cleaningScheduleDate: (roomCard?.cleaningScheduleDate as string) || '',
      coolingWater: roomCard?.coolingWater as string,
      indoorEnvironmentQuality: roomCard?.indoorEnvironmentQuality as string,
      compressedAirDistribution: roomCard?.compressedAirDistribution as string,
      nitrogenCentralDistribution: roomCard?.nitrogenCentralDistribution as string,
      maxPressureInColdDistribution: roomCard?.maxPressureInColdDistribution as string,
      coolingWaterClient: roomCard?.coolingWaterClient as string,
      indoorEnvironmentQualityClient: roomCard?.indoorEnvironmentQualityClient as string,
      compressedAirDistributionClient: roomCard?.compressedAirDistributionClient as string,
      nitrogenCentralDistributionClient: roomCard?.nitrogenCentralDistributionClient as string,
      maxPressureInColdDistributionClient: roomCard?.maxPressureInColdDistributionClient as string
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
    toast.promise(
      updateRoomCard(
        {
          ...roomCard,
          cleaningScheduleDate: roomCard?.cleaningScheduleDate ? roomCard.cleaningScheduleDate : null
        },
        false
      ),
      {
        loading: 'Saving room card...',
        success: 'Room card was successfully updated',
        error: 'Error while saving room card'
      }
    )
  })

  const onSubmitAndExit = handleSubmit((roomCard: RoomCardFormType) => {
    toast.promise(
      updateRoomCard(
        {
          ...roomCard,
          cleaningScheduleDate: roomCard?.cleaningScheduleDate ? roomCard.cleaningScheduleDate : null
        },
        true
      ),
      {
        loading: 'Saving room card....',
        success: 'Room card was successfully updated',
        error: 'Error while saving room card'
      }
    )
  })

  if (loading) return <LoaderComponent />

  return (
    <Fragment>
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
      <Card className="flex flex-col justify-between">
        <Suspense fallback={<ProgressBarComponent />}>
          <ErrorBoundary fallback={<ErrorPage />}>
            <FileManager itemType={FILE_TYPE.ROOM_CARD} uid={roomCardUid} hasEditRole={canEdit} />
          </ErrorBoundary>
        </Suspense>
      </Card>
    </Fragment>
  )
}
