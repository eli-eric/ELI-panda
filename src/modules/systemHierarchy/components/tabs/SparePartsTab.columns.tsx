import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { SystemPathTooltip } from '@/components/system/SystemPathTooltip.comp'
import { message } from '@/i18n/src/messages'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'

import type { SparePartEdge } from './SparePartsTab.types'

export const useSparePartsTabColumns = () => {
    const { formatMessage: fm } = useIntl()

    return useMemo<ColumnDef<SparePartEdge>[]>(
        () => [
            {
                id: 'icon',
                header: '',
                size: 32,
                enableHiding: false,
                cell: ({
                    row: {
                        original: {
                            node: { physicalItem },
                        },
                    },
                }) => (
                    <IconCell itemUsageUid={physicalItem?.itemUsage?.uid as ITEM_USAGE} />
                ),
            },
            {
                id: 'name',
                header: fm({ id: message.systemHierarchy.columns.name }),
                accessorFn: row => row.node.name ?? '',
                cell: ({
                    getValue,
                    row: {
                        original: {
                            node: { parentPath },
                        },
                    },
                }) => (
                    <SystemPathTooltip parentPath={parentPath}>
                        <span>{String(getValue() ?? '')}</span>
                    </SystemPathTooltip>
                ),
            },
            {
                id: 'location',
                header: fm({ id: message.systemHierarchy.columns.location }),
                accessorFn: row => {
                    const name = row.node.location?.name
                    if (!name) return ''
                    const code = row.node.location?.code
                    return code ? `${name} - ${code}` : name
                },
            },
            {
                id: 'coverage',
                header: fm({ id: message.systemHierarchy.spareParts.coverage }),
                size: 100,
                meta: { className: 'text-right' },
                accessorFn: row => row.coverage ?? 0,
                sortingFn: 'basic',
                cell: ({ getValue }) => Number(getValue() ?? 0).toFixed(2),
            },
            {
                id: 'partNumber',
                header: fm({ id: message.systemHierarchy.spareParts.partNumber }),
                accessorFn: row =>
                    row.node.physicalItem?.catalogueItem?.catalogueNumber ?? '',
            },
            {
                id: 'eun',
                header: fm({ id: message.systemHierarchy.spareParts.eun }),
                size: 120,
                accessorFn: row => row.node.physicalItem?.eun ?? '',
            },
        ],
        [fm],
    )
}
