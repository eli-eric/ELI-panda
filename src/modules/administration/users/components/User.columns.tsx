import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { Badge } from '@/components/ui/badge'

import type { UserListItem } from '../utils/filterUsers'
import { UserNameCell } from './UserNameCell'

const BadgeList = ({ items }: { items: { key: string; label: string }[] }) => (
    <div className="flex flex-wrap gap-1">
        {items.map(item => (
            <Badge key={item.key} variant="secondary">
                {item.label}
            </Badge>
        ))}
    </div>
)

export const useUsersColumns = () => {
    const columns = useMemo(
        (): ColumnDef<UserListItem, any>[] => [
            {
                header: 'User Name',
                accessorFn: row => row.username,
                cell: UserNameCell,
                id: 'username',
                size: 300,
                meta: { sticky: true },
            },
            {
                header: 'Name',
                accessorFn: row => [row.firstName, row.lastName].filter(Boolean).join(' '),
                id: 'name',
                size: 200,
            },
            {
                header: 'Email',
                accessorFn: row => row.email,
                id: 'email',
                size: 260,
            },
            {
                header: 'LDAP User',
                accessorFn: row => row.employee?.ldapUser,
                id: 'ldapUser',
                size: 260,
            },
            {
                header: 'Org. Unit (OJ)',
                accessorFn: row => row.employee?.orgUnitCode,
                id: 'orgUnitCode',
                size: 130,
            },
            {
                header: 'Teams',
                accessorFn: row => row.teams.map(team => team.name).join(', '),
                id: 'teams',
                size: 220,
                cell: ({ row }) => (
                    <BadgeList
                        items={row.original.teams.map(team => ({
                            key: team.uid,
                            label: team.name,
                        }))}
                    />
                ),
            },
            {
                header: 'Facility',
                accessorFn: row => row.facility?.name,
                id: 'facility',
                size: 160,
            },
            {
                header: 'Status',
                accessorFn: row => (row.isEnabled ? 'Enabled' : 'Disabled'),
                id: 'isEnabled',
                size: 110,
                cell: ({ row }) => (
                    <Badge variant={row.original.isEnabled ? 'secondary' : 'destructive'}>
                        {row.original.isEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                ),
            },
            {
                header: 'Roles',
                accessorFn: row => row.roles.map(role => role.code).join(', '),
                id: 'roles',
                size: 500,
                enableSorting: false,
                cell: ({ row }) => (
                    <BadgeList
                        items={row.original.roles.map(role => ({
                            key: role.uid,
                            label: role.code,
                        }))}
                    />
                ),
            },
        ],
        [],
    )

    return columns
}
