import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { ZoneActionsCell } from './components/zone-actions.comp'
import type { Zone } from './types/zone.types'

export const useZoneColumns = () => {
    const columns = useMemo(
        (): ColumnDef<Zone, any>[] => [
            {
                id: 'name',
                header: 'Name',
                accessorFn: row => row.name,
                size: 400,
                meta: { sticky: true },
                cell: ZoneActionsCell,
            },
            {
                id: 'code',
                header: 'Code',
                accessorFn: row => row.code,
                size: 150,
            },
            {
                id: 'parentZone',
                header: 'Parent Zone',
                accessorFn: row => row.parentZone?.name ?? '—',
                size: 200,
            },
        ],
        [],
    )

    return columns
}
