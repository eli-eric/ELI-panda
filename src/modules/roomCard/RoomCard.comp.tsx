import { DevTool } from '@hookform/devtools'
import { type FC } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { PageHead } from '@/components/layout/PageHead'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'
import type { Team } from '@/types/gql/graphql'
import { RoomCardStatus } from '@/types/gql/graphql'

import { HeaderButtons } from './components/HeaderButtons'
import { RoomCardStatusIcon } from './components/RoomCardStatusIcon'
import { RoomCardTables } from './components/table/RoomCard.tables'
import type { ContactPersonsHall, EmployeeType, RoomCardFormType } from './types/form'

const messages = message.roomCardsPage.form

type Props = {
  formMethods: UseFormReturn<RoomCardFormType, any>
  status: RoomCardStatus
  onSubmitAndExit: () => void
  onSubmit: () => void
  contactPersonsHall: ContactPersonsHall[]
  contactPersonsDept: EmployeeType[]
  teams: Team[]
}

export const RoomCardComponent: FC<Props> = ({
  formMethods,
  status,
  onSubmitAndExit,
  onSubmit,
  contactPersonsHall,
  contactPersonsDept,
  teams
}) => {
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])
  const statuses = Object.values(RoomCardStatus).map(value => value)
  const fields = useMakeFormFields({
    name: {
      name: 'name',
      disabled: !editPersmission,
      rounded: 'rounded-md',
      placeholder: messages.name.placeholder
    },
    status: {
      name: 'status',
      disabled: !editPersmission
    }
  })

  return (
    <Form {...{ formMethods }}>
      <PageHead>
        <div className="flex items-center space-x-4">
          <RoomCardStatusIcon status={status} />
          <Input {...fields.name} className="w-72" />
          <Listbox
            {...fields.status}
            defaultValue={RoomCardStatus.CleanMode}
            className="w-72"
            customOptions={statuses}
          />
        </div>
        <HeaderButtons {...{ onSubmitAndExit, onSubmit, editPersmission: true }} />
      </PageHead>
      <RoomCardTables
        {...{
          contactPersonsHall: contactPersonsHall,
          contactPersonsDept,
          teams
        }}
      />
      <DevTool control={formMethods.control} />
    </Form>
  )
}
