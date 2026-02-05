import { memo } from 'react'

import { TableCell, TableRow } from '@/components/ui/simple-table'
import type { OrderLineSystemConfig } from '@/modules/orderItem/types/form'
import type { CodebookType } from '@/types/responses/codebook'

import { OrderLineSystemTypeCombo } from './order-line-system-type-combo'

interface OrderLineConfigRowProps {
    index: number
    config: OrderLineSystemConfig
    onTypeChange: (
        index: number,
        type: 'new' | 'existing',
        selectedSystem?: CodebookType,
        selectedSystemParent?: CodebookType,
    ) => void
    showSerialNumber?: boolean
}

/**
 * Single row component for order line system configuration
 * Displays: #, Item Name, [Serial Number], Parent System, System Type, System Name
 */
export const OrderLineConfigRow = memo(
    ({ index, config, onTypeChange, showSerialNumber }: OrderLineConfigRowProps) => {
        return (
            <TableRow>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{config.itemName}</TableCell>
                {showSerialNumber && (
                    <TableCell className="font-mono text-sm">
                        {config.serialNumber || '-'}
                    </TableCell>
                )}
                <TableCell>
                    {/* parentSystem is used for BOTH new and existing systems */}
                    {config.parentSystem?.name || '-'}
                </TableCell>
                <TableCell>
                    <OrderLineSystemTypeCombo
                        value={config.systemType}
                        onChange={(type, system, parent) =>
                            onTypeChange(index, type, system, parent)
                        }
                    />
                </TableCell>
                <TableCell className="text-muted-foreground">{config.systemName || '-'}</TableCell>
            </TableRow>
        )
    },
)

OrderLineConfigRow.displayName = 'OrderLineConfigRow'
