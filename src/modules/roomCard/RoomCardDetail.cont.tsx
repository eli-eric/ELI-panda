import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import Listbox from '@/components/form/Listbox'
import { PageHead } from '@/components/layout/PageHead'
import { Tooltip } from '@/components/Tooltip'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { CODEBOOK } from '@/types/constants/codebook'
import type { RoomCard } from '@/types/gql/graphql'
import { RoomCardStatus } from '@/types/gql/graphql'
import { classNames } from '@/utils'

import { RoomCardTables } from './components/table/RoomCard.tables'
import { useRoomCard } from './hooks/useRoomCard'
import { useRoomCardUpdate } from './hooks/useRoomCardUpdate'
import { useRoomCardStore } from './store/useRoomCardStore'
import { updateRoomCardVariables } from './utils'

interface Props {
  roomCardUid?: string
}

export const RoomCardDetailContainer = ({ roomCardUid }: Props) => {
  const { roomCard } = useRoomCard(roomCardUid)
  const formMethods = useForm<RoomCard>({ defaultValues: roomCard })
  const { reset, watch } = formMethods
  const [updateRoomCard] = useRoomCardUpdate()
  const { deleteHallContacts, disconnectDeptContacts, disconnectTeams, newDeptContacts, newHallContacts, newTeams } =
    useRoomCardStore()

  const statuses = Object.values(RoomCardStatus).map(value => value)

  const status = watch('status')
  const teams = watch('teams')
  const contactPersonsHall = watch('contactPersonsHall')
  const contactPersonsDept = watch('contactPersonsDept')

  useEffect(() => {
    if (roomCard) {
      reset(roomCard)
    }
  }, [roomCard, reset])

  const onSubmit = (roomCard: RoomCard) => {
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
    })
  }

  const fields = useMakeFormFields({
    location: {
      name: 'location',
      disabled: false,
      codebook: CODEBOOK.LOCATION
    },
    status: {
      name: 'status',
      disabled: false
    }
  })

  return (
    <Form {...{ formMethods }} onSubmit={onSubmit}>
      <PageHead>
        <div className="flex items-center space-x-4">
          <Tooltip content={`Room status: ${status}`}>
            <div
              className={classNames(
                'w-10 h-10 rounded-full',
                status === 'DIRTY_MODE' && 'bg-red-200',
                status === 'CLEAN_MODE' && 'bg-lime-200',
                status === 'IN_PREPARATION_MODE' && 'bg-primary-300'
              )}
            />
          </Tooltip>
          <h1 className="text-2xl font-semibold">{roomCard?.location.name}</h1>
          <h1 className="text-2xl font-semibold">{' - '}</h1>
          <h1 className="text-2xl font-semibold">{roomCard?.location.code}</h1>
          <Listbox {...fields.status} className="w-72" customOptions={statuses} />
        </div>
        <div className="space-x-2">
          <Button type="submit" primary>
            Save
          </Button>
          <Button>Cancel</Button>
        </div>
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
