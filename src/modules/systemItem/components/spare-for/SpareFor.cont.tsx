import { Fragment } from 'react'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { Tooltip } from '@/components/Tooltip'
import { cn } from '@/lib/utils'
import { useAssignSparesNavigation } from '@/modules/shared/hooks/useAssignSparesNavigation'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'

import { useSystemDetail } from '../../hooks/useSystemDetail'
import { getFontBySystemLevel } from '../../utils'
import { useSpareForColumns } from './SpareFor.columns'

export const SparePartsFor = () => {
    const tableId = 'sparePartFor'
    const columns = useSpareForColumns(tableId)

    const { systemDetail, catalogueItem } = useSystemDetail()

    const handleAssignSparePart = useAssignSparesNavigation({
        uid: systemDetail?.uid ?? '',
        parentPath:
            systemDetail?.parentPath?.map(p => ({
                uid: p?.uid ?? '',
                name: p?.name ?? '',
                systemLevel: p?.systemLevel ?? null,
            })) ?? null,
        catalogueNumber: catalogueItem?.catalogueNumber ?? null,
    })

    const AssignSparePartButton = () => {
        return (
            <Tooltip content="Redirect to assign Spare Part page">
                <div>
                    <PlusButton onClick={handleAssignSparePart} />
                </div>
            </Tooltip>
        )
    }

    return (
        <Fragment>
            <Heading customText="Designated spare part for">
                <AssignSparePartButton />
            </Heading>
            {systemDetail?.sparePartsFor && systemDetail.sparePartsFor.length > 0 && (
                <PandaTable
                    columns={columns}
                    getRowProps={({ original }) => ({
                        className: cn(
                            original?.physicalItem && 'font-bold',
                            getFontBySystemLevel(original?.systemLevel),
                        ),
                    })}
                    tableId={tableId}
                    settings={{ enableColumnReordering: false }}
                    className={'relative overflow-x-auto mb-0 pb-0'}
                    data={systemDetail?.sparePartsFor || []}
                />
            )}
        </Fragment>
    )
}
