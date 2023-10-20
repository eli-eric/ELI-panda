import type { FC, PropsWithChildren } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { PageHead } from '@/components/layout/PageHead'
import type { Employee, HallContactPerson, RoomCard, RoomCardStatus, Team } from '@/types/gql/graphql'

import { HeaderButtons } from './components/HeaderButtons'
import { RoomCardStatusIcon } from './components/RoomCardStatusIcon'
import { RoomCardTables } from './components/table/RoomCard.tables'

type Props = {
  formMethods: UseFormReturn<RoomCard, any>
  status: RoomCardStatus
  onSubmitAndExit: () => void
  onSubmit: () => void
  contactPersonsHall: HallContactPerson[]
  contactPersonsDept: Employee[]
  teams: Team[]
}

export const RoomCardComponent: FC<PropsWithChildren<Props>> = ({
  formMethods,
  status,
  onSubmitAndExit,
  onSubmit,
  contactPersonsHall,
  contactPersonsDept,
  teams,
  children
}) => (
  <Form {...{ formMethods }}>
    <PageHead>
      <div className="flex items-center space-x-4">
        <RoomCardStatusIcon status={status} />
        {children}
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
  </Form>
)
