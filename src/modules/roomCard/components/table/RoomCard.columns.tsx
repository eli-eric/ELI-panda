import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import { ROLE } from '@/types/constants/roles'
import type { Employee, HallContactPerson, Team } from '@/types/gql/graphql'
import { formatPhoneNumber } from '@/utils/formatters'

import { useRoomCardStore } from '../../store/useRoomCardStore'
import { CellInput } from './CellInput'
import { CellWithDelete } from './CellWithDelete'
import { ContactHallButton } from './ContactHallButton'
import { HeaderAddButton } from './HeaderAddButton'
import { TeamButton } from './TeamButton'

export type RoomCardProperties = {
  name: string
  value?: string
  code: string
}

export const useRoomCardsColumns = () => {
  const {
    setDeleteHallContact,
    setDisconnectDeptContact,
    setDisconnectTeam,
    setNewDeptContact
  } = useRoomCardStore()

  const columnsContactHall = useMemo(
    (): ColumnDef<HallContactPerson, any>[] => [
      {
        id: 'contactHall',
        header: () => {
          return (
            <div className="flex items-center justify-between px-2 w-full">
              <span>Contact - Hall</span>
              <ContactHallButton />
            </div>
          )
        },
        columns: [
          {
            id: 'role',
            accessorFn: ({ role }) => role?.name,
            meta: { noHeader: true },
            size: 200,
            cell: props => (
              <CellWithDelete
                {...props}
                formName="contactPersonsHall"
                setDeleteItem={setDeleteHallContact}
              />
            )
          },
          {
            id: 'fullName',
            accessorFn: ({ employee: { fullName } }) => fullName,
            meta: { noHeader: true },
            size: 200
          },
          {
            id: 'phone',
            accessorFn: ({ employee: { phone1: p1, phone2: p2 } }) => {
              const phoneArr = [p1, p2].filter(Boolean)
              return phoneArr
            },
            meta: { noHeader: true },
            size: 150,
            cell: ({ getValue }) =>
              getValue()?.map((phone, index) => (
                <div key={index}>{formatPhoneNumber(phone)}</div>
              ))
          }
        ]
      }
    ],
    [setDeleteHallContact]
  )

  const columnsContactDept = useMemo(
    (): ColumnDef<Employee, any>[] => [
      {
        header: () => {
          return (
            <div className="flex items-center justify-between px-2 w-full">
              <span>Contact - Dept.</span>
              <HeaderAddButton
                setEmployee={setNewDeptContact}
                editPersmissionRole={ROLE.ROOM_CARD_EDIT}
                name={'contactPersonsDept'}
              />
            </div>
          )
        },
        id: 'contactDept',
        columns: [
          {
            id: 'fullName',
            accessorKey: 'fullName',
            meta: { noHeader: true, className: 'whitespace-nowrap' },
            cell: props => (
              <CellWithDelete
                {...props}
                formName="contactPersonsDept"
                setDeleteItem={setDisconnectDeptContact}
              />
            ),
            size: 200
          },
          {
            id: 'phone',
            accessorFn: ({ phone2: p2, phone1: p1 }) => {
              const phoneArr = [p1, p2].filter(Boolean)
              return phoneArr
            },
            meta: { noHeader: true },
            size: 150,
            cell: ({ getValue }) =>
              getValue().map((phone, index) => (
                <div key={index}>{formatPhoneNumber(phone)}</div>
              ))
          }
        ]
      }
    ],
    [setDisconnectDeptContact, setNewDeptContact]
  )

  const columnsTeam = useMemo(
    (): ColumnDef<Team, any>[] => [
      {
        header: () => {
          return (
            <div className="flex items-center justify-between px-2 w-full">
              <span>Team</span>
              <TeamButton />
            </div>
          )
        },
        id: 'team',
        accessorKey: 'name',
        cell: props => (
          <CellWithDelete
            {...props}
            formName="teams"
            setDeleteItem={setDisconnectTeam}
          />
        )
      }
    ],
    [setDisconnectTeam]
  )

  const columnsCleanRooms = useMemo(
    (): ColumnDef<RoomCardProperties, any>[] => [
      {
        header: "Clean Room's parameters",
        columns: [
          {
            id: 'name',
            accessorKey: 'name',
            meta: { noHeader: true }
          },
          {
            id: 'value',
            accessorKey: 'value',
            meta: { noHeader: true },
            cell: CellInput
          }
        ]
      }
    ],
    []
  )
  const buildingMaintenanceColumns = useMemo(
    (): ColumnDef<RoomCardProperties, any>[] => [
      {
        header: 'Name',
        accessorKey: 'name',
        id: 'name'
      },
      {
        header: 'Possible parameters',
        accessorKey: 'code',
        id: 'possibleParameters',
        cell: CellInput
      },
      {
        header: 'Client requirements',
        accessorKey: 'clientRequirements',
        id: 'clientRequirements',
        cell: CellInput
      }
    ],
    []
  )
  const locationColumns = useMemo(
    (): ColumnDef<Codebooktree, any>[] => [
      {
        header: 'Location Name',
        accessorFn: ({ name }) => name,
        id: 'name',
        cell: props => <CellWithDelete {...props} formName="locations" />
      },
      {
        header: 'Location Code',
        accessorFn: ({ code }) => code,
        id: 'code'
      }
    ],
    []
  )

  return {
    columnsContactHall,
    columnsContactDept,
    columnsTeam,
    columnsCleanRooms,
    buildingMaintenanceColumns,
    locationColumns
  }
}
