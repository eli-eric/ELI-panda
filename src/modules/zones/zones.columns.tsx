import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import { NotesCell } from './components/notes-cell.comp'
import { ZoneActionsCell } from './components/zone-actions.comp'
import type { Zone } from './types/zone.types'

export const useZoneColumns = () => {
    const { formatMessage: fm } = useIntl()
    const cols = message.zonesPage.columns

    const columns = useMemo(
        (): ColumnDef<Zone, any>[] => [
            {
                id: 'name',
                header: fm({ id: cols.name }),
                accessorFn: row => row.name,
                size: 400,
                meta: { sticky: true },
                cell: ZoneActionsCell,
            },
            {
                id: 'code',
                header: fm({ id: cols.code }),
                accessorFn: row => row.code,
                size: 150,
            },
            {
                id: 'parentZone',
                header: fm({ id: cols.parentZone }),
                accessorFn: row => row.parentZone?.name ?? '—',
                size: 400,
            },
            {
                id: 'defaultParentSystem',
                header: fm({ id: cols.defaultParentSystem }),
                accessorFn: row => row.defaultParentSystem?.name ?? '—',
                size: 400,
                // The table sorts server-side and GET /zones has no order-by for these
                // two, so it quietly falls back to the zone name — a sort arrow here
                // would claim an ordering the list does not have.
                enableSorting: false,
            },
            {
                id: 'notes',
                header: fm({ id: cols.notes }),
                accessorFn: row => row.notes ?? '—',
                size: 400,
                enableSorting: false,
                cell: NotesCell,
            },
        ],
        [fm, cols],
    )

    return columns
}
