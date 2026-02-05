import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import { SystemNameCell } from '@/modules/systems/components/table/cells/SystemNameCell'
import { useSubsystems } from '@/modules/systems/hooks/useSubsystems'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import type { SystemDetail } from '@/types/responses/systems'

interface SystemSelectColumnsProps {
    tableId: string
    selectedSystemUid?: string
    onSystemToggle: (system: SystemDetail) => void
}

export const useSystemSelectColumns = ({
    tableId,
    selectedSystemUid,
    onSystemToggle,
}: SystemSelectColumnsProps) => {
    const { setUid } = useSubsystems(tableId)

    const columns: ColumnDef<SystemDetail, any>[] = useMemo(() => {
        return [
            {
                id: 'selection',
                size: 40,
                header: '',
                enableColumnFilter: false,
                meta: {
                    sticky: true,
                },
                cell: ({ row: { original } }) => {
                    const isSelected = selectedSystemUid === original.uid
                    return (
                        <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => onSystemToggle(original)}
                            aria-label={`Select ${original.name}`}
                            onClick={e => {
                                // Prevent propagation to avoid double-triggering when clicking checkbox directly
                                e.stopPropagation()
                            }}
                        />
                    )
                },
            },
            {
                id: 'icon',
                header: '',
                size: 41,
                meta: { sticky: true },
                cell: ({ row: { original } }) => (
                    <div>
                        <IconCell
                            itemUsageUid={original.physicalItem?.itemUsage?.uid as ITEM_USAGE}
                        />
                    </div>
                ),
            },
            {
                header: 'Name',
                accessorFn: row => row.name,
                id: 'name',
                size: 480,
                meta: {
                    sticky: true,
                },
                enableHiding: false,
                cell: props => (
                    <SystemNameCell
                        {...props}
                        setUid={setUid}
                        hideButtons={true}
                        tableId={tableId}
                        enableDragAndDrop={false}
                    />
                ),
            },
            {
                header: 'System Code',
                accessorFn: row => row.systemCode,
                id: 'systemCode',
                size: 150,
            },
            {
                header: 'Type',
                accessorFn: row => row.systemType?.name,
                id: 'systemType',
                size: 200,
            },
            {
                header: 'Zone',
                accessorFn: row => row.zone?.name,
                id: 'zone',
                size: 150,
            },
            {
                header: 'Location',
                accessorFn: row => row.location?.name,
                id: 'location',
                size: 200,
            },
        ]
    }, [tableId, selectedSystemUid, onSystemToggle, setUid])

    return columns
}
