import type { FC } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { cn } from '@/lib/utils'
import { isUnderCovered } from '@/modules/shared/system/coverage'

import { SystemsTable } from './components/table/Systems.table'

interface Props {
    enableQueryURL?: boolean
    enableDragAndDrop?: boolean
    tableId?: string
    dropsettings?: any
    className?: string
    hideButtons?: boolean
    SecondRowElement?: () => JSX.Element
    LeftSearchBarElement?: () => JSX.Element
    isGlobalSearch?: boolean
}

export const SystemsComponent: FC<Props> = ({
    enableQueryURL = true,
    enableDragAndDrop,
    tableId = 'systems',
    dropsettings,
    className,
    hideButtons = false,
    LeftSearchBarElement,
    SecondRowElement,
    isGlobalSearch,
}: Props) => {
    return (
        <TableLayoutContainer className={className}>
            <SystemsTable
                hideButtons={hideButtons}
                enableDragAndDrop={enableDragAndDrop}
                tableId={tableId}
                isGlobalSearch={isGlobalSearch}
                SecondRowElement={SecondRowElement}
                LeftSearchBarElement={LeftSearchBarElement}
                pageSizeDefault={50}
                className={'relative overflow-scroll scrollbar-style'}
                getRowProps={({ original }) => ({
                    className: cn(
                        original?.physicalItem && 'font-bold',
                        isUnderCovered(original?.statistics) &&
                            'text-red-500 dark:text-red-500 font-bold',
                    ),
                    dropsettings,
                })}
                settings={{
                    enableSorting: true,
                    enableColumnHiding: false,
                    enableFiltering: true,
                    manualFiltering: true,
                    enableQueryURL: enableQueryURL,
                    enableColumnReordering: false,
                }}
            />
        </TableLayoutContainer>
    )
}
