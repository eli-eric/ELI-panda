import type { ColumnDef } from '@tanstack/react-table'
import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'

import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import { message } from '@/i18n/src/messages'
import type { Employee, HallContactPerson, Team } from '@/types/gql/graphql'
import { formatPhoneNumber } from '@/utils/formatters'

import {
  useDeleteHallContact,
  useDisconnectDeptContact,
  useDisconnectLocation,
  useDisconnectTeam
} from '../../hooks/useContactMutations'
import { CellInput } from './CellInput'
import { CellWithDelete } from './CellWithDelete'
import { ContactHallButton } from './ContactHallButton'
import { DeptContactButton } from './DeptContactButton'
import { TeamButton } from './TeamButton'

export type RoomCardProperties = {
  name: string
  value?: string
  code: string
}

export const useRoomCardsColumns = (roomCardUid?: string) => {
  const { formatMessage: fm } = useIntl()

  // Mutation hooks for delete operations
  const { deleteHallContact } = useDeleteHallContact(roomCardUid || '')
  const { disconnectDeptContact } = useDisconnectDeptContact(roomCardUid || '')
  const { disconnectTeam } = useDisconnectTeam(roomCardUid || '')
  const { disconnectLocation } = useDisconnectLocation(roomCardUid || '')

  // Delete handlers
  const handleDeleteHallContact = useCallback(
    async (item: HallContactPerson) => {
      if (item.uid) {
        await deleteHallContact(item.uid)
      }
    },
    [deleteHallContact]
  )

  const handleDeleteDeptContact = useCallback(
    async (item: Employee) => {
      if (item.uid) {
        await disconnectDeptContact(item.uid)
      }
    },
    [disconnectDeptContact]
  )

  const handleDeleteTeam = useCallback(
    async (item: Team) => {
      if (item.uid) {
        await disconnectTeam(item.uid)
      }
    },
    [disconnectTeam]
  )

  const handleDeleteLocation = useCallback(
    async (item: Codebooktree) => {
      if (item.uid) {
        await disconnectLocation(item.uid)
      }
    },
    [disconnectLocation]
  )

  const columnsContactHall = useMemo(
    (): ColumnDef<HallContactPerson, any>[] => [
      {
        id: 'contactHall',
        header: () => {
          return (
            <div className="flex items-center justify-between px-2 w-full">
              <span>{fm({ id: message.common.roomCard.contactHall })}</span>
              <ContactHallButton roomCardUid={roomCardUid} />
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
                onDelete={handleDeleteHallContact}
                warningMessage="Remove contact person (Hall)?"
                roomCardUid={roomCardUid}
                toastMessages={{
                  loading: 'Removing contact person (Hall)...',
                  success: 'Contact person (Hall) removed',
                  error: 'Failed to remove contact person'
                }}
              />
            )
          },
          {
            id: 'fullName',
            accessorFn: ({ employee }) => employee?.fullName,
            meta: { noHeader: true },
            size: 200
          },
          {
            id: 'phone',
            accessorFn: ({ employee }) => {
              const phoneArr = [employee?.phone1, employee?.phone2].filter(
                Boolean
              )
              return phoneArr
            },
            meta: { noHeader: true },
            size: 150,
            cell: ({ getValue }) =>
              getValue()?.map((phone: string, index: number) => (
                <div key={index}>{formatPhoneNumber(phone)}</div>
              ))
          }
        ]
      }
    ],
    [fm, roomCardUid, handleDeleteHallContact]
  )

  const columnsContactDept = useMemo(
    (): ColumnDef<Employee, any>[] => [
      {
        header: () => {
          return (
            <div className="flex items-center justify-between px-2 w-full">
              <span>{fm({ id: message.common.roomCard.contactDept })}</span>
              <DeptContactButton roomCardUid={roomCardUid} />
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
                onDelete={handleDeleteDeptContact}
                warningMessage="Remove contact person (Dept)?"
                roomCardUid={roomCardUid}
                toastMessages={{
                  loading: 'Removing contact person (Dept)...',
                  success: 'Contact person (Dept) removed',
                  error: 'Failed to remove contact person'
                }}
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
              getValue().map((phone: string, index: number) => (
                <div key={index}>{formatPhoneNumber(phone)}</div>
              ))
          }
        ]
      }
    ],
    [fm, roomCardUid, handleDeleteDeptContact]
  )

  const columnsTeam = useMemo(
    (): ColumnDef<Team, any>[] => [
      {
        header: () => {
          return (
            <div className="flex items-center justify-between px-2 w-full">
              <span>{fm({ id: message.common.roomCard.team })}</span>
              <TeamButton roomCardUid={roomCardUid} />
            </div>
          )
        },
        id: 'team',
        accessorKey: 'name',
        cell: props => (
          <CellWithDelete
            {...props}
            onDelete={handleDeleteTeam}
            warningMessage="Remove team?"
            roomCardUid={roomCardUid}
            toastMessages={{
              loading: 'Removing team...',
              success: 'Team removed',
              error: 'Failed to remove team'
            }}
          />
        )
      }
    ],
    [fm, roomCardUid, handleDeleteTeam]
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
        cell: props => (
          <CellWithDelete
            {...props}
            onDelete={handleDeleteLocation}
            warningMessage="Remove location?"
            roomCardUid={roomCardUid}
            toastMessages={{
              loading: 'Removing location...',
              success: 'Location removed',
              error: 'Failed to remove location'
            }}
          />
        )
      },
      {
        header: 'Location Code',
        accessorFn: ({ code }) => code,
        id: 'code'
      }
    ],
    [roomCardUid, handleDeleteLocation]
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
