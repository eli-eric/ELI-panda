import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense, useCallback, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import ErrorPage from '@/components/error/ErrorPage'
import { Form } from '@/components/form/Form'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import Card from '@/components/layout/Card'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { CardContent } from '@/components/ui/card'
import usePermission from '@/hooks/usePermission'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { CODEBOOK } from '@/types/constants/codebook'
import { ROLE } from '@/types/constants/roles'
import type { PrescribedClothing } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

import FileManager from '../shared/fileManager/FileManager'
import { RoomCardDetailSkeleton } from './components/RoomCardDetail.skeleton'
import { RoomCardInfoCard } from './components/RoomCardInfoCard'
import { RoomCardBuildingMaintenanceCard } from './components/table/RoomCardBuildingMaintenanceCard'
import { RoomCardCleanRoomsCard } from './components/table/RoomCardCleanRoomsCard'
import { RoomCardContactsCard } from './components/table/RoomCardContactsCard'
import { RoomCardLocationsCard } from './components/table/RoomCardLocationsCard'
import { useCanEditOperationalState } from './hooks/useCanEditOperationalState'
import { useRoomCard } from './hooks/useRoomCard'
import { useRoomCardUpdate } from './hooks/useRoomCardUpdate'
import { roomCardSchema } from './schemas/roomCard.schema'
import type { RoomCardFormType } from './types/form'

interface Props {
  roomCardUid: string
}

type RoomCardData = NonNullable<ReturnType<typeof useRoomCard>['roomCard']>

interface RoomCardFormProps {
  roomCard: RoomCardData
  roomCardUid: string
}

const RoomCardForm = ({ roomCard, roomCardUid }: RoomCardFormProps) => {
  const canEdit = usePermission([ROLE.ROOM_CARD_EDIT])
  const formMethods = useForm<RoomCardFormType>({
    defaultValues: {
      name: roomCard.name as string,
      status: roomCard.status,
      operationalState: roomCard.operationalState as CodebookType | null,
      purityClass: roomCard.purityClass as any,
      prescribedClothing: roomCard.prescribedClothing as PrescribedClothing[],
      entryToHvacTent: roomCard.entryToHvacTent as string,
      additionalRequirements: roomCard.additionalRequirements as string,
      cleaningScheduleDays: roomCard.cleaningScheduleDays as any,
      cleaningScheduleDate: (roomCard.cleaningScheduleDate as string) || '',
      coolingWater: roomCard.coolingWater as string,
      indoorEnvironmentQuality: roomCard.indoorEnvironmentQuality as string,
      compressedAirDistribution: roomCard.compressedAirDistribution as string,
      nitrogenCentralDistribution:
        roomCard.nitrogenCentralDistribution as string,
      maxPressureInColdDistribution:
        roomCard.maxPressureInColdDistribution as string,
      coolingWaterClient: roomCard.coolingWaterClient as string,
      indoorEnvironmentQualityClient:
        roomCard.indoorEnvironmentQualityClient as string,
      compressedAirDistributionClient:
        roomCard.compressedAirDistributionClient as string,
      nitrogenCentralDistributionClient:
        roomCard.nitrogenCentralDistributionClient as string,
      maxPressureInColdDistributionClient:
        roomCard.maxPressureInColdDistributionClient as string
    },
    resolver: zodResolver(roomCardSchema)
  })
  const { watch, handleSubmit } = formMethods
  const { updateRoomCard } = useRoomCardUpdate(roomCardUid)

  const status = watch('status')
  const operationalState = watch('operationalState')

  const canEditOperationalState = useCanEditOperationalState(roomCardUid)

  const onSubmit = handleSubmit((formData: RoomCardFormType) => {
    toast.promise(
      updateRoomCard(
        {
          ...formData,
          cleaningScheduleDate: formData.cleaningScheduleDate
            ? formData.cleaningScheduleDate
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

  const onSubmitAndExit = handleSubmit((formData: RoomCardFormType) => {
    toast.promise(
      updateRoomCard(
        {
          ...formData,
          cleaningScheduleDate: formData.cleaningScheduleDate
            ? formData.cleaningScheduleDate
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
      disabled: !canEditOperationalState,
      codebook: CODEBOOK.OPERATIONAL_STATE
    }
  }

  return (
    <Form formMethods={formMethods} enableLeaveWarning={true}>
      <HeaderWithButtons
        loading={false}
        editRole={ROLE.ROOM_CARD_EDIT}
        onSubmit={onSubmit}
        onSubmitAndExit={onSubmitAndExit}
        title={`Room Card: ${roomCard.name || roomCardUid}`}
        isFormDirty={formMethods.formState.isDirty}
      />

      <div className="container mx-auto max-w-7xl px-4 space-y-6 py-6">
        <RoomCardInfoCard
          fields={fields}
          status={status}
          operationalState={operationalState}
          operationalStateLastUpdated={roomCard.operationalStateLastUpdated}
          roomCardUid={roomCardUid}
        />

        <RoomCardContactsCard roomCardUid={roomCardUid} />

        <RoomCardLocationsCard roomCardUid={roomCardUid} />

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

const RoomCardDetailContent = ({ roomCardUid }: Props) => {
  const { roomCard, loading } = useRoomCard(roomCardUid)

  if (loading || !roomCard) {
    return <RoomCardDetailSkeleton />
  }

  return <RoomCardForm roomCard={roomCard} roomCardUid={roomCardUid} />
}

export const RoomCardDetailContainer = ({ roomCardUid }: Props) => {
  const [errorState, setErrorState] = useState<Error | null>(null)

  const handleError = useCallback((error: Error) => {
    // eslint-disable-next-line no-console
    console.error('Error in RoomCardDetailContainer:', error)
    setErrorState(error)
    toast.error(`An error occurred: ${error.message}`)
  }, [])

  if (errorState) {
    return <ErrorPage />
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorPage} onError={handleError}>
      <RoomCardDetailContent roomCardUid={roomCardUid} />
    </ErrorBoundary>
  )
}
