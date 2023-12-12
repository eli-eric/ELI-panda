import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { ROLE } from '@/types/constants/roles'
import type { HallContactPerson, Team } from '@/types/gql/graphql'

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
  const { setDeleteHallContact, setDisconnectDeptContact, setDisconnectTeam, setNewDeptContact } = useRoomCardStore()

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
            meta: { noHeader: true }
          },
          {
            accessorFn: ({ employee: { phoneNumber } }) => phoneNumber,
            id: 'phone',
            cell: props => (
              <CellWithDelete {...props} formName="contactPersonsHall" setDeleteItem={setDeleteHallContact} />
            ),
            meta: { noHeader: true }
          }
        ]
      }
    ],
    [setDeleteHallContact]
  )

  const columnsContactDept = useMemo(
    (): ColumnDef<any, any>[] => [
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
            meta: { noHeader: true }
          },
          {
            accessorKey: 'phoneNumber',
            cell: props => (
              <CellWithDelete {...props} formName="contactPersonsDept" setDeleteItem={setDisconnectDeptContact} />
            ),
            meta: { noHeader: true }
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
        cell: props => <CellWithDelete {...props} formName="teams" setDeleteItem={setDisconnectTeam} />
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
        accessorKey: 'possibleParameters',
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

  return {
    columnsContactHall,
    columnsContactDept,
    columnsTeam,
    columnsCleanRooms,
    buildingMaintenanceColumns
  }
}
