import { type FC } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import { PageHead } from '@/components/layout/PageHead'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'
import { OperationalState, RoomCardStatus } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

import { HeaderButtons } from './components/HeaderButtons'
import { OperationalStateHistoryButton } from './components/OperationalStateHistoryButton'
import { OperationalStateIcon } from './components/OperationalStateIcon'
import { RoomCardStatusIcon } from './components/RoomCardStatusIcon'
import { RoomCardTables } from './components/table/RoomCard.tables'
import { useCanEditOperationalState } from './hooks/useCanEditOperationalState'
import type {
  ContactPersonsHall,
  EmployeeType,
  RoomCardFormType
} from './types/form'
import { formatDateTime } from './utils'

const messages = message.roomCardsPage.form
const OPERATIONAL_STATES = Object.values(OperationalState)

type Props = {
  formMethods: UseFormReturn<RoomCardFormType, any>
  status: RoomCardStatus
  operationalState?: OperationalState | null
  operationalStateLastUpdated?: string | null
  roomCardUid?: string
  onSubmitAndExit: () => void
  onSubmit: () => void
  contactPersonsHall: ContactPersonsHall[]
  contactPersonsDept: EmployeeType[]
  teams: CodebookType[]
  locations?: Codebooktree[]
}

export const RoomCardComponent: FC<Props> = ({
  formMethods,
  status,
  operationalState,
  operationalStateLastUpdated,
  roomCardUid,
  onSubmitAndExit,
  onSubmit,
  contactPersonsHall,
  contactPersonsDept,
  teams,
  locations
}) => {
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])
  const canEditOperationalState = useCanEditOperationalState(contactPersonsHall)
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
    },
    operationalState: {
      name: 'operationalState',
      placeholder: messages.operationalState.placeholder
    }
  })

  return (
    <Form {...{ formMethods }}>
      <PageHead>
        <div className="flex flex-col space-y-2">
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
          <div className="flex items-center space-x-4">
            <OperationalStateIcon state={operationalState} />
            <Listbox
              {...fields.operationalState}
              className="w-72"
              customOptions={OPERATIONAL_STATES}
            />
            {operationalStateLastUpdated && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                <FormattedMessage id={messages.operationalState.lastUpdated} />{' '}
                {formatDateTime(operationalStateLastUpdated)}
              </span>
            )}
            <OperationalStateHistoryButton roomCardUid={roomCardUid} />
          </div>
        </div>
        <HeaderButtons
          {...{ onSubmitAndExit, onSubmit, editPersmission: true }}
        />
      </PageHead>
      <RoomCardTables
        {...{
          contactPersonsHall,
          contactPersonsDept,
          teams,
          locations
        }}
      />
    </Form>
  )
}
