import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'
import type { HallContactPerson, Team } from '@/types/gql/graphql'

import { useRoomCardStore } from '../../store/useRoomCardStore'
import { CellInput } from './CellInput'
import { CellWithDelete } from './CellWithDelete'
import { ContactDeptButton } from './ContactDeptButton'
import { ContactHallButton } from './ContactHallButton'
import { TeamButton } from './TeamButton'

export type RoomCardProperties = {
  name: string
  value?: string
  code: string
}

export const useRoomCardsColumns = () => {
  const { setDeleteHallContact, setDisconnectDeptContact, setDisconnectTeam } = useRoomCardStore()
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])

  const columnsContactHall = useMemo(
    (): ColumnDef<HallContactPerson, any>[] => [
      {
        header: 'Contact - Hall',
        meta: { headerElement: editPersmission ? <ContactHallButton /> : null },
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
    [setDeleteHallContact, editPersmission]
  )

  const columnsContactDept = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Contact - Dept. 99',
        meta: { headerElement: editPersmission ? <ContactDeptButton /> : null },

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
    [setDisconnectDeptContact, editPersmission]
  )

  const columnsTeam = useMemo(
    (): ColumnDef<Team, any>[] => [
      {
        header: 'Team',
        meta: { headerElement: editPersmission ? <TeamButton /> : null },
        accessorKey: 'name',
        cell: props => <CellWithDelete {...props} formName="teams" setDeleteItem={setDisconnectTeam} />
      }
    ],
    [setDisconnectTeam, editPersmission]
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
  const columnsPossibleParameters = useMemo(
    (): ColumnDef<RoomCardProperties, any>[] => [
      {
        header: 'Possible Parameters',
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

  const columnsClientRequirements = useMemo(
    (): ColumnDef<RoomCardProperties, any>[] => [
      {
        header: 'Client Requirements',
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

  return {
    columnsContactHall,
    columnsContactDept,
    columnsTeam,
    columnsCleanRooms,
    columnsPossibleParameters,
    columnsClientRequirements
  }
}
