import type { Row, Table } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import React, { forwardRef, useCallback, useImperativeHandle } from 'react'

import { isEmptyArray } from '@/lib/predicates/data'
import { isDefined, isUndefined } from '@/lib/predicates/type-guards'

import { TableFoot } from '../pandaTable/components/TableFoot'
import {
    defaultPropGetter,
    type GetRowPropsReturnType,
    type PandaTableSettings,
} from '../pandaTable/PandaTable'
import { HeaderCellComponent } from './components/HeaderCell.comp'
import { HeaderCellDNDComponent } from './components/HeaderCell.dnd'
import { TableContainer } from './components/Table.cont'
import { TableRowComponent } from './components/TableRow.comp'
import { TableRowDNDComponent } from './components/TableRow.dnd'
import { TableSkeletonRows } from './components/TableSkeletonRows'

interface Props<T> {
    settings?: PandaTableSettings<T>
    tableHeading?: string
    className?: string
    data?: T[]
    loading?: boolean
    getRowProps?: (row: Row<T>) => GetRowPropsReturnType
    skeletonRowCount?: number
    tableId: string
    table: Table<T>
    toolbar?: React.ReactNode
    emptyState?: React.ReactNode
}

/**
 * Imperative handle for PandaTableV2
 * Exposes methods to control the table from parent components
 */
export interface PandaTableV2Handle {
    /** Scroll the table to the top (first row) */
    scrollToTop: () => void
}

/**
 * Generic forwardRef wrapper for PandaTableV2
 * Required because forwardRef doesn't preserve generic types by default
 */
function PandaTableV2Inner<T>(
    {
        data,
        table,
        settings,
        tableHeading,
        loading = false,
        className,
        tableId,
        getRowProps = defaultPropGetter,
        skeletonRowCount = 5,
        toolbar,
        emptyState,
    }: Props<T>,
    ref: React.ForwardedRef<PandaTableV2Handle>,
) {
    const {
        enableFooter = false,
        enableColumnHiding = false,
        enablePagination = false,
        enableColumnReordering = false,
    } = settings || {}

    const { rows } = table.getRowModel()

    //The virtualizers need to know the scrollable container element
    const tableContainerRef = React.useRef<HTMLDivElement>(null)

    // Expose imperative handle for parent components
    useImperativeHandle(
        ref,
        () => ({
            scrollToTop: () => {
                tableContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' })
            },
        }),
        [],
    )

    //dynamic row height virtualization - alternatively you could use a simpler fixed row height strategy without the need for `measureElement`
    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        estimateSize: () => 49, //estimate row height for accurate scrollbar dragging
        getScrollElement: () => tableContainerRef.current,
        //measure dynamic row height, except in firefox because it measures table border height incorrectly
        measureElement:
            typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
                ? element => {
                      // Only measure if the element exists and is attached to the DOM
                      if (element && document.body.contains(element)) {
                          return element.getBoundingClientRect().height
                      }
                      return 49 // Return default height if element doesn't exist
                  }
                : undefined,
        overscan: 20,
    })

    const { measureElement: virtualMeasureElement, getVirtualItems } = rowVirtualizer

    const measureElement = useCallback(virtualMeasureElement, [virtualMeasureElement])

    const virtualRows = getVirtualItems()

    // Distinguish between initial load and refetching
    // Initial load: data is undefined (not yet loaded) - show skeleton
    // Refetching: data exists (array, even if empty) AND currently loading - show dimming + pulse
    const isInitialLoad = isUndefined(data)
    const isRefetching = isDefined(data) && loading

    return (
        <TableContainer
            table={table}
            tableHeading={tableHeading}
            className={className}
            enableColumnHiding={enableColumnHiding}
            tableContainerRef={tableContainerRef}
            enablePagination={enablePagination}
            itemsTotalCount={data?.length}
            isLoading={isInitialLoad}
            isRefetching={isRefetching}
            isEmpty={data && isEmptyArray(data)}
            toolbar={toolbar}
            emptyState={emptyState}
        >
            <thead className="sticky top-0 z-10 bg-background/95 backdrop-blur backdrop-filter">
                {table.getHeaderGroups().map(headerGroup => {
                    return (
                        <tr className="flex w-full" key={headerGroup.id}>
                            {headerGroup.headers.map((header, headerIndex) => {
                                if (enableColumnReordering) {
                                    return (
                                        <HeaderCellDNDComponent
                                            key={header.id}
                                            header={header}
                                            headerIndex={headerIndex}
                                            columns={table.getAllColumns()}
                                            setColumnOrder={table.setColumnOrder}
                                            columnOrder={table.getState().columnOrder}
                                        />
                                    )
                                }

                                return (
                                    <HeaderCellComponent
                                        key={header.id}
                                        header={header}
                                        headerIndex={headerIndex}
                                        columns={table.getAllColumns()}
                                    />
                                )
                            })}
                        </tr>
                    )
                })}
            </thead>
            <tbody
                style={{
                    display: 'grid',
                    height: isInitialLoad
                        ? `${skeletonRowCount * 49}px`
                        : `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
                    position: 'relative', //needed for absolute positioning of rows
                }}
            >
                {isInitialLoad ? (
                    <TableSkeletonRows
                        headers={table.getHeaderGroups()[0]?.headers || []}
                        rowCount={skeletonRowCount}
                    />
                ) : (
                    data &&
                    virtualRows.map(virtualRow => {
                        const row = rows[virtualRow.index] as Row<any>
                        return getRowProps(row).dropsettings ? (
                            <TableRowDNDComponent
                                key={virtualRow.key}
                                row={row}
                                getRowProps={getRowProps}
                                virtualRow={virtualRow}
                                measureElement={measureElement}
                                tableId={tableId}
                            />
                        ) : (
                            <TableRowComponent
                                key={virtualRow.key}
                                row={row}
                                getRowProps={getRowProps}
                                virtualRow={virtualRow}
                                measureElement={measureElement}
                            />
                        )
                    })
                )}
            </tbody>
            {enableFooter && <TableFoot getFooterGroups={table.getFooterGroups} />}
        </TableContainer>
    )
}

/**
 * PandaTableV2 with forwardRef support
 * Use ref to access imperative methods like scrollToTop()
 *
 * @example
 * ```tsx
 * const tableRef = useRef<PandaTableV2Handle>(null)
 *
 * const handlePageChange = () => {
 *   tableRef.current?.scrollToTop()
 * }
 *
 * return (
 *   <>
 *     <PandaTableV2 ref={tableRef} ... />
 *     <PaginationV2 onPageChange={handlePageChange} ... />
 *   </>
 * )
 * ```
 */
export const PandaTableV2 = forwardRef(PandaTableV2Inner) as <T>(
    props: Props<T> & { ref?: React.ForwardedRef<PandaTableV2Handle> },
) => React.ReactElement
