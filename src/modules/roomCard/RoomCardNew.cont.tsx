import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Form } from '@/components/form/Form'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import usePermission from '@/hooks/usePermission'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import { RoomCardStatus } from '@/types/gql/graphql'

import { useRoomCards } from '../roomCards/hooks/useRoomCards'
import { RoomCardInfoCard } from './components/RoomCardInfoCard'
import { RoomCardBuildingMaintenanceCard } from './components/table/RoomCardBuildingMaintenanceCard'
import { RoomCardCleanRoomsCard } from './components/table/RoomCardCleanRoomsCard'
import { RoomCardContactsCard } from './components/table/RoomCardContactsCard'
import { RoomCardLocationsCard } from './components/table/RoomCardLocationsCard'
import {
  makeRoomCardsCreateData,
  useRoomCardCreate
} from './hooks/useRoomCardCreate'
import { roomCardSchema } from './schemas/roomCard.schema'
import type { RoomCardFormType } from './types/form'

export const RoomCardNewContainer = () => {
  const canEdit = usePermission([ROLE.ROOM_CARD_EDIT])
  const formMethods = useForm<RoomCardFormType>({
    resolver: zodResolver(roomCardSchema),
    defaultValues: {
      status: RoomCardStatus.CleanMode
    }
  })
  const { refetch } = useRoomCards()

  const router = useRouter()
  const { watch, handleSubmit } = formMethods
  const { createRoomCard } = useRoomCardCreate()

  const status = watch('status') || RoomCardStatus.CleanMode
  const operationalState = watch('operationalState')

  const onSubmit = handleSubmit(data => {
    toast.promise(
      createRoomCard(makeRoomCardsCreateData(data), {
        onSuccess: data => {
          refetch()
          router.push(
            PATH.ROOM_CARD + '/' + data?.createRoomCards?.roomCards[0].uid
          )
        }
      }),
      {
        loading: 'Creating room card...',
        success: 'Room card was successfully created',
        error: 'Error while creating room card'
      }
    )
  })

  const onSubmitAndExit = handleSubmit(data => {
    toast.promise(
      createRoomCard(makeRoomCardsCreateData(data), {
        onSuccess: () => {
          refetch()
          router.push(PATH.ROOM_CARDS)
        }
      }),
      {
        loading: 'Creating room card...',
        success: 'Room card was successfully created',
        error: 'Error while creating room card'
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
      disabled: !canEdit
    }
  }

  return (
    <Form formMethods={formMethods} enableLeaveWarning={true}>
      <HeaderWithButtons
        loading={false}
        editRole={ROLE.ROOM_CARD_EDIT}
        onSubmit={onSubmit}
        onSubmitAndExit={onSubmitAndExit}
        title="Create New Room Card"
        isFormDirty={formMethods.formState.isDirty}
      />

      <div className="container mx-auto max-w-7xl px-4 space-y-6 py-6">
        <RoomCardInfoCard
          fields={fields}
          status={status}
          operationalState={operationalState}
          operationalStateLastUpdated={null}
        />

        <RoomCardContactsCard />

        <RoomCardLocationsCard />

        <RoomCardCleanRoomsCard />

        <RoomCardBuildingMaintenanceCard />
      </div>
    </Form>
  )
}
