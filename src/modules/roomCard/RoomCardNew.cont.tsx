import { useForm } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import Listbox from '@/components/form/Listbox'
import { PageHead } from '@/components/layout/PageHead'
import { Tooltip } from '@/components/Tooltip'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import type { RoomCard } from '@/types/gql/graphql'
import { RoomCardStatus } from '@/types/gql/graphql'
import { classNames } from '@/utils'

import { SelectLocationTree } from './components/SelectLocation.combo'
import { RoomCardTables } from './components/table/RoomCard.tables'
import { formatRoomCardData, useRoomCardCreate } from './hooks/useRoomCardCreate'

const messages = message.roomCardsPage.form

export const RoomCardNewContainer = () => {
  const formMethods = useForm<RoomCard>()
  const { watch, handleSubmit } = formMethods
  const { createRoomCard } = useRoomCardCreate()

  const statuses = Object.values(RoomCardStatus).map(value => value)

  const status = watch('status')
  const teams = watch('teams')
  const contactPersonsHall = watch('contactPersonsHall')?.map(personHall => ({
    fullName: personHall.employee.fullName,
    phone: personHall?.employee.phoneNumber,
    role: personHall?.role?.name
  }))
  const contactPersonsDept = watch('contactPersonsDept')?.map(personDept => ({
    fullName: personDept.fullName,
    phone: personDept.phoneNumber
  }))

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
    createRoomCard({ variables: formatRoomCardData(data) })
  })

  return (
    <Form {...{ formMethods }}>
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
          <h1 className="text-2xl font-semibold">New room card</h1>
          <SelectLocationTree locationField={fields.location} />
          <Listbox {...fields.status} className="w-72" customOptions={statuses} />
        </div>
        <div className="space-x-2">
          <Button type="button" primary onClick={onSubmit}>
            Save
          </Button>
          <Button>Cancel</Button>
        </div>
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
