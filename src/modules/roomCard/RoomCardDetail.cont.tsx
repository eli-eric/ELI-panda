import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import ErrorPage from '@/components/error/ErrorPage'
import Card from '@/components/layout/Card'
import LoaderComponent from '@/components/loader.comp'
import ProgressBarComponent from '@/components/progress-bar.comp'
import usePermission from '@/hooks/usePermission'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ROLE } from '@/types/constants/roles'
import type { PrescribedClothing } from '@/types/gql/graphql'

import FileManager from '../shared/fileManager/FileManager'
import { useRoomCard } from './hooks/useRoomCard'
import { useRoomCardUpdate } from './hooks/useRoomCardUpdate'
import { RoomCardComponent } from './RoomCard.comp'
import { roomCardSchema } from './schemas/roomCard.schema'
import { useRoomCardStore } from './store/useRoomCardStore'
import type { RoomCardFormType } from './types/form'

interface Props {
  roomCardUid: string
}

export const RoomCardDetailContainer = ({ roomCardUid }: Props) => {
  const { roomCard, loading } = useRoomCard(roomCardUid)
  const canEdit = usePermission([ROLE.ROOM_CARD_EDIT])
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
      nitrogenCentralDistribution:
        roomCard?.nitrogenCentralDistribution as string,
      maxPressureInColdDistribution:
        roomCard?.maxPressureInColdDistribution as string,
      coolingWaterClient: roomCard?.coolingWaterClient as string,
      indoorEnvironmentQualityClient:
        roomCard?.indoorEnvironmentQualityClient as string,
      compressedAirDistributionClient:
        roomCard?.compressedAirDistributionClient as string,
      nitrogenCentralDistributionClient:
        roomCard?.nitrogenCentralDistributionClient as string,
      maxPressureInColdDistributionClient:
        roomCard?.maxPressureInColdDistributionClient as string
    },
    resolver: zodResolver(roomCardSchema)
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
          cleaningScheduleDate: roomCard?.cleaningScheduleDate
            ? roomCard.cleaningScheduleDate
            : null
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
          cleaningScheduleDate: roomCard?.cleaningScheduleDate
            ? roomCard.cleaningScheduleDate
            : null
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
    <div className="relative h-screen overflow-auto">
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
            <FileManager
              itemType={FILE_TYPE.ROOM_CARD}
              uid={roomCardUid}
              hasEditRole={canEdit}
            />
          </ErrorBoundary>
        </Suspense>
      </Card>
    </div>
  )
}
