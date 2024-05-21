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
        header: 'Contact - Hall',
        meta: {
          headerElement: <ContactHallButton />
        },
        columns: [
          {
            accessorFn: ({ role }) => role?.name,
            id: 'role',
            meta: { noHeader: true },
            size: 200
          },
          {
            accessorFn: ({ employee: { fullName } }) => fullName,
            id: 'fullName',
            meta: { noHeader: true },
            cell: props => (
              <CellWithDelete
                {...props}
                formName="contactPersonsHall"
                setDeleteItem={setDeleteHallContact}
              />
            )
          },
          {
            accessorFn: ({ employee: { phone1: p1, phone2: p2 } }) => {
              const phoneArr = [p1, p2].filter(Boolean)
              return phoneArr
            },
            id: 'phone',
            meta: { noHeader: true },
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
        header: 'Contact - Dept. 99',
        meta: {
          headerElement: (
            <HeaderAddButton
              setEmployee={setNewDeptContact}
              editPersmissionRole={ROLE.ROOM_CARD_EDIT}
              name={'contactPersonsDept'}
            />
          )
        },

        columns: [
          {
            accessorKey: 'fullName',
            meta: { noHeader: true },
            cell: props => (
              <CellWithDelete
                {...props}
                formName="contactPersonsDept"
                setDeleteItem={setDisconnectDeptContact}
              />
            )
          },
          {
            id: 'phone',
            accessorFn: ({ phone2: p2, phone1: p1 }) => {
              const phoneArr = [p1, p2].filter(Boolean)
              return phoneArr
            },
            meta: { noHeader: true },
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
        header: 'Team',
        meta: {
          headerElement: <TeamButton />
        },
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
            accessorKey: 'name',
            meta: { noHeader: true }
          },
          {
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
