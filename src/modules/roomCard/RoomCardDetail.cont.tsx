import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import ErrorPage from '@/components/error/ErrorPage'
import { Form } from '@/components/form/Form'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import Card from '@/components/layout/Card'
import LoaderComponent from '@/components/loader.comp'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { CardContent } from '@/components/ui/card'
import usePermission from '@/hooks/usePermission'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ROLE } from '@/types/constants/roles'
import type { PrescribedClothing } from '@/types/gql/graphql'

import FileManager from '../shared/fileManager/FileManager'
import { OperationalStateHistoryButton } from './components/OperationalStateHistoryButton'
import { RoomCardInfoCard } from './components/RoomCardInfoCard'
import { RoomCardBuildingMaintenanceCard } from './components/table/RoomCardBuildingMaintenanceCard'
import { RoomCardCleanRoomsCard } from './components/table/RoomCardCleanRoomsCard'
import { RoomCardContactsCard } from './components/table/RoomCardContactsCard'
import { RoomCardLocationsCard } from './components/table/RoomCardLocationsCard'
import { useCanEditOperationalState } from './hooks/useCanEditOperationalState'
import { useRoomCard } from './hooks/useRoomCard'
import { useRoomCardUpdate } from './hooks/useRoomCardUpdate'
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
      operationalState: roomCard?.operationalState,
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
  const operationalState = watch('operationalState')
  const teams = watch('teams')
  const contactPersonsHall = watch('contactPersonsHall')
  const contactPersonsDept = watch('contactPersonsDept')
  const locations = watch('locations')

  const canEditOperationalState = useCanEditOperationalState(
    contactPersonsHall || []
  )

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

  const fields = {
    name: {
      name: 'name',
      disabled: !canEdit
    },
    status: {
      name: 'status',
      disabled: !canEdit
    },
    operationalState: {
      name: 'operationalState',
      disabled: !canEditOperationalState
    }
  }

  if (loading) return <LoaderComponent />

  return (
    <Form formMethods={formMethods} enableLeaveWarning={true}>
      <HeaderWithButtons
        loading={false}
        editRole={ROLE.ROOM_CARD_EDIT}
        onSubmit={onSubmit}
        onSubmitAndExit={onSubmitAndExit}
        title={`Room Card: ${roomCard?.name || roomCardUid}`}
        isFormDirty={formMethods.formState.isDirty}
        customElement={
          <OperationalStateHistoryButton roomCardUid={roomCardUid} />
        }
      />

      <div className="container mx-auto max-w-7xl px-4 space-y-6 py-6">
        <RoomCardInfoCard
          fields={fields}
          status={status}
          operationalState={operationalState}
          operationalStateLastUpdated={roomCard?.operationalStateLastUpdated}
        />

        <RoomCardContactsCard
          contactPersonsHall={contactPersonsHall}
          contactPersonsDept={contactPersonsDept}
          teams={teams}
        />

        <RoomCardLocationsCard locations={locations} />

        <RoomCardCleanRoomsCard />

        <RoomCardBuildingMaintenanceCard />

        <Card>
          <CardContent className="pt-6">
            <Suspense fallback={<ProgressBarComponent />}>
              <ErrorBoundary fallback={<ErrorPage />}>
                <FileManager
                  itemType={FILE_TYPE.ROOM_CARD}
                  uid={roomCardUid}
                  hasEditRole={canEdit}
                />
              </ErrorBoundary>
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </Form>
  )
}
