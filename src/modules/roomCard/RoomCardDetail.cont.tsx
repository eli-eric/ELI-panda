import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { Form } from '@/components/form/Form'
import Listbox from '@/components/form/Listbox'
import { PageHead } from '@/components/layout/PageHead'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import usePermission from '@/hooks/usePermission'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import type { RoomCard } from '@/types/gql/graphql'
import { RoomCardStatus } from '@/types/gql/graphql'

import { HeaderButtons } from './components/HeaderButtons'
import { RoomCardStatusIcon } from './components/RoomCardStatusIcon'
import { RoomCardTables } from './components/table/RoomCard.tables'
import { useRoomCard } from './hooks/useRoomCard'
import { useRoomCardUpdate } from './hooks/useRoomCardUpdate'
import { useRoomCardStore } from './store/useRoomCardStore'
import { updateRoomCardVariables } from './utils'

interface Props {
  roomCardUid?: string
}

export const RoomCardDetailContainer = ({ roomCardUid }: Props) => {
  const router = useRouter()
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])

  const { roomCard } = useRoomCard(roomCardUid)
  const formMethods = useForm<RoomCard>({ defaultValues: roomCard })
  const { reset, watch, handleSubmit } = formMethods
  const [updateRoomCard] = useRoomCardUpdate()
  const {
    clear,
    deleteHallContacts,
    disconnectDeptContacts,
    disconnectTeams,
    newDeptContacts,
    newHallContacts,
    newTeams
  } = useRoomCardStore()
  const statuses = Object.values(RoomCardStatus).map(value => value)

  const status = watch('status')
  const teams = watch('teams')
  const contactPersonsHall = watch('contactPersonsHall')
  const contactPersonsDept = watch('contactPersonsDept')

  useEffect(() => () => clear(), [clear])

  useEffect(() => {
    if (roomCard) {
      reset({
        ...roomCard,
        contactPersonsHall: roomCard.contactPersonsHall?.map(contact => ({ ...contact, uuid: contact.uid }))
      })
    }
  }, [roomCard, reset])

  const onSubmit = handleSubmit((roomCard: RoomCard) => {
    toast.promise(
      updateRoomCard({
        variables: updateRoomCardVariables({
          uid: roomCardUid,
          roomCard,
          deleteHallContacts,
          disconnectDeptContacts,
          disconnectTeams,
          newDeptContacts,
          newHallContacts,
          newTeams
        })
      }),
      {
        loading: 'Saving room card...',
        success: 'Room card was successfully updated',
        error: 'Error while saving room card'
      }
    )
  })

  const onSubmitAndExit = handleSubmit((roomCard: RoomCard) => {
    toast.promise(
      updateRoomCard({
        variables: updateRoomCardVariables({
          uid: roomCardUid,
          roomCard,
          deleteHallContacts,
          disconnectDeptContacts,
          disconnectTeams,
          newDeptContacts,
          newHallContacts,
          newTeams
        }),
        onCompleted: () => router.push(PATH.ROOM_CARDS)
      }),
      {
        loading: 'Saving room card....',
        success: 'Room card was successfully updated',
        error: 'Error while saving room card'
      }
    )
  })

  const fields = useMakeFormFields({
    status: {
      name: 'status',
      disabled: !editPersmission
    }
  })

  return (
    <Form {...{ formMethods }} enableLeaveWarning={true}>
      <PageHead>
        <div className="flex items-center space-x-4">
          <RoomCardStatusIcon status={status} />
          <h1 className="text-2xl font-semibold">{roomCard?.location.name}</h1>
          <h1 className="text-2xl font-semibold">{' - '}</h1>
          <h1 className="text-2xl font-semibold">{roomCard?.location.code}</h1>
          <Listbox {...fields.status} className="w-72" customOptions={statuses} />
        </div>
        <HeaderButtons {...{ onSubmitAndExit, onSubmit, editPersmission: true }} />
        {/* <SelectLocationTree locationField={fields.location} /> */}
      </PageHead>
      <RoomCardTables
        {...{
          contactPersonsHall,
          contactPersonsDept,
          teams
        }}
      />
    </Form>
  )
}
